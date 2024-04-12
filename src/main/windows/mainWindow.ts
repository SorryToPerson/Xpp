import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import store from '../utils/store'
import icon from '../../../resources/icon.png?asset'

let mainWindow: BrowserWindow

export function createMainWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // autoHideMenuBar: true,
    // titleBarStyle: 'hidden',
    // trafficLightPosition: { x: 10, y: 10 },
    // frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    const userInfo = store.get('userInfo')
    mainWindow.show()
    mainWindow.webContents.openDevTools()
    if (Object.keys(userInfo).length > 0) {
      console.log('ASJDFKSAJKFJSL')

      mainWindow.webContents.send('main', {
        from: 'mainWindow',
        data: userInfo
      })
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/main.html`)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/main.html'))
  }
}

export function getMainWindow(): BrowserWindow {
  return mainWindow
}
