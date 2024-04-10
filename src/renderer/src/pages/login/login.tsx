import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button } from '@mui/material'
import '@renderer/base.css'

function Login(): JSX.Element {
  const { ipcRenderer } = window.electron
  const handleLogin = (): void => {
    console.log('login', window)
    ipcRenderer.send('renderer', {
      from: 'login',
      data: {
        username: 'x',
        password: '123'
      }
    })
  }

  return (
    <div>
      <Button onClick={handleLogin}>登录</Button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)
