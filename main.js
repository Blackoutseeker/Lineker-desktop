const { app, BrowserWindow } = require('electron')
const { resolve, join } = require('path')
const isDev = require('electron-is-dev')
if(isDev) {
  require('electron-reloader')(module)
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    resizable: false,
    frame: false,
    show: false,
    title: 'Lineker',
    icon: `${resolve(__dirname, 'assets', 'Lineker.png')}`,
    backgroundColor: '#005884',
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
      enableRemoteModule: true,
      webSecurity: false,
    }
  })
  win.removeMenu()
  win.loadURL(isDev ? 'http://localhost:3000' : `${join(__dirname, "./dist/index.html")}`)
  win.once('ready-to-show', () => {
    win.show()
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})