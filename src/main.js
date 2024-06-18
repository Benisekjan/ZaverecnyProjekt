const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const activeWin = require('active-win');
const osu = require('node-os-utils');



let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function trackActivity() {
  setInterval(async () => {
    const window = await activeWin();
    console.log(`Active window: ${window.owner.name} - ${window.title}`);
  }, 1000); // Sleduje každou sekundu
}

function trackIdleTime() {
  const idle = osu.idle;

  setInterval(async () => {
    const idleTime = await idle.getTime();
    console.log(`Idle time: ${idleTime} seconds`);
  }, 1000); // Kontroluje každou sekundu
}

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
