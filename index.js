const { app, BrowserWindow } = require('electron');

if(require('electron-squirrel-startup')) return; // Create windows handler.

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        autoHideMenuBar: true
    });

    win.loadFile('html/index.html');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});