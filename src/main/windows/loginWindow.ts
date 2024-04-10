import { app, shell, ipcMain, BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'

let loginWindow: BrowserWindow

export function createLoginWindow(): void {
  loginWindow = new BrowserWindow({
    width: 300,
    height: 400,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  loginWindow.on('ready-to-show', () => {
    loginWindow.show()
    ipcMain.on('renderer', (e, args) => {
      const { from } = args
      if (from === 'login') {
        loginWindow.close()
      }
    })
  })

  loginWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    loginWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/login.html`)
  } else {
    loginWindow.loadFile(join(__dirname, '../renderer/login.html'))
  }
}

export function getLoginWindow(): BrowserWindow {
  return loginWindow
}
