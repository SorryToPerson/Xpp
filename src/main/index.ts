import { app, BrowserWindow, ipcMain } from 'electron'
import { createMainWindow } from './windows/mainWindow'
import { createLoginWindow } from './windows/loginWindow'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import store from './utils/store'

function createWindows(): void {
  const userInfo = store.get('userInfo')
  Object.keys(userInfo).length > 0 ? createMainWindow() : createLoginWindow()
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('renderer', (e, { from, data }) => {
    console.log('login from main', data)
    if (from === 'login') {
      store.set('userInfo', data)
      createMainWindow()
    }
  })
  createWindows()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindows()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
