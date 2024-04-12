import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { IUserInfo } from '@renderer/typings/global'
import '@renderer/base.css'

function Main(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: '',
    password: ''
  })
  const { ipcRenderer } = window.electron

  const handleMessageFromMain = (e, { from, data }): void => {
    console.log(from, data)
    if (from === 'mainWindow') {
      setUserInfo(data)
    }
  }

  useEffect(() => {
    ipcRenderer.on('main', handleMessageFromMain)
  }, [])
  return <div>{userInfo.username}</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
