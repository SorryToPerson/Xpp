import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, FormControl, TextField, Grid } from '@mui/material'
import logo from '@renderer/assets/icon.png'
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
    <FormControl>
      <Grid paddingTop={4} container spacing={2} textAlign="center" alignItems="center">
        <Grid item xs={12}>
          <img width={80} src={logo}></img>
        </Grid>
        <Grid item xs={12}>
          <TextField size="small" id="name" label="name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField size="small" id="password" label="password" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleLogin}>登录</Button>
        </Grid>
      </Grid>
    </FormControl>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)
