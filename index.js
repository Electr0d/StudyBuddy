const electron = require('electron');
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    height: 580,
    width: 800,
    title: 'StudyBuddy',
    frame: false
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/src/mainWindow/mainWindow.html'),
      protocol: 'file:',
      slashes: true
    })
  );
});