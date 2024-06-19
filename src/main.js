const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const schedule = require('node-schedule');

// Inicializace proměnných
let mainWindow;
let tray;
let lastActiveTime = Date.now();
let idleInterval;

// Inicializace databáze
let db = new sqlite3.Database('activity-tracker.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the activity-tracker database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_name TEXT,
    window_title TEXT,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS idle_time (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    duration INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Čas aktivity
async function trackActivity() {
  const activeWin = await import('active-win');

  setInterval(async () => {
    const window = await activeWin.default();
    db.run(`INSERT INTO activity (app_name, window_title) VALUES (?, ?)`, [window.owner.name, window.title], function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  }, 1000);
}

// Čas neaktivity
function trackIdleTime() {
  schedule.scheduleJob('* * * * * *', () => {
    const currentTime = Date.now();
    const idleTime = Math.floor((currentTime - lastActiveTime) / 1000);
    
    if (idleTime > 0) {
      db.run(`INSERT INTO idle_time (duration) VALUES (?)`, [idleTime], function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Idle time recorded: ${idleTime} seconds`);
        lastActiveTime = currentTime;
      });
    }
  });
}

// Načítání dat z databáze a jejich odesílání do renderer procesu
function sendDataToRenderer() {
  db.all(`SELECT * FROM activity ORDER BY start_time DESC LIMIT 10`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    mainWindow.webContents.send('activity-data', rows);
  });

  db.all(`SELECT * FROM idle_time ORDER BY timestamp DESC LIMIT 10`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    mainWindow.webContents.send('idle-data', rows);
  });
}

ipcMain.on('request-data', (event) => {
  sendDataToRenderer();
});

app.on('ready', () => {
  createWindow();

  const iconPath = path.join(__dirname, 'build/icon-st.png');
  const icon = nativeImage.createFromPath(iconPath);

  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setToolTip('Activity Tracker');
  tray.setContextMenu(contextMenu);

  // Spuštění sledování aktivity a neaktivity
  trackActivity();
  trackIdleTime();

  // Odeslání dat do renderer procesu každých 5 sekund
  setInterval(sendDataToRenderer, 5000);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
