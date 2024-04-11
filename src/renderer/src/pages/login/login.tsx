import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button, TextField, Grid, Box } from '@mui/material'
import logo from '@renderer/assets/icon.png'
import '@renderer/base.css'

function Login(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameErrMsg, setUsernameErrMsg] = useState('')
  const [passwordErrMsg, setPasswordErrMsg] = useState('')
  const { ipcRenderer } = window.electron

  const handleLogin = (e): void => {
    e.preventDefault()

    if (username.trim() === '') {
      setUsernameErrMsg('请输入用户名')
      return
    }

    setUsernameErrMsg('')

    if (password.trim() === '') {
      setPasswordErrMsg('请输入密码')
      return
    }

    setPasswordErrMsg('')

    ipcRenderer.send('renderer', {
      from: 'login',
      data: {
        username,
        password
      }
    })
  }

  const handleUsernameChange = (e): void => {
    setUsername(e.target.value)
    setUsernameErrMsg('')
  }

  const handlePasswordChange = (e): void => {
    setPassword(e.target.value)
    setPasswordErrMsg('')
  }

  return (
    <Box component="form" onSubmit={handleLogin}>
      <Grid paddingTop={4} container spacing={2} textAlign="center" alignItems="center">
        <Grid item xs={12}>
          <img width={80} src={logo}></img>
        </Grid>
        <Grid item xs={12} height={74}>
          <TextField
            value={username}
            onChange={handleUsernameChange}
            size="small"
            id="username"
            label="用户名"
            variant="outlined"
            helperText={usernameErrMsg}
            error={!!usernameErrMsg}
          />
        </Grid>
        <Grid item xs={12} height={74}>
          <TextField
            value={password}
            onChange={handlePasswordChange}
            size="small"
            id="password"
            label="密码"
            variant="outlined"
            helperText={passwordErrMsg}
            error={!!passwordErrMsg}
          />
        </Grid>
        <Grid item xs={12}>
          <Button size="small" type="submit">
            登录
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)
