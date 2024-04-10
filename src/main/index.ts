import { app, BrowserWindow, ipcMain } from 'electron'
import { createMainWindow } from './windows/mainWindow'
import { createLoginWindow } from './windows/loginWindow'
import { electronApp, optimizer } from '@electron-toolkit/utils'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('renderer', (e, data) => {
    console.log('login from main', data)
    createMainWindow()
  })
  createLoginWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
