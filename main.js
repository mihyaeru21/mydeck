const { app, shell, BrowserWindow } = require('electron');

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // URLを外部ブラウザで開く
  window.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  window.removeMenu();
  window.loadURL('https://tweetdeck.twitter.com/');
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  };
});

app.whenReady().then(createWindow)
