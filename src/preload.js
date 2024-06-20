const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendUpdateActivityLog: (message) => ipcRenderer.send('update-activity-log', message),
    onUpdateActivityLog: (callback) => ipcRenderer.on('update-activity-log', (event, message) => callback(message))
});
