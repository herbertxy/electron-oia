const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('dev')
    win.loadURL('http://localhost:5173'); // Vite 默认端口
  } else {
    console.log('prod')
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
  // win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    // macos 运行时 程序驻留 保留一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
ipcMain.handle('ping',()=>'pong')
})

app.on('window-all-closed', () => {
   // macos 运行时 程序驻留
  if (process.platform !== 'darwin') app.quit()
})
