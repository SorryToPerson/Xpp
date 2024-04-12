import React from 'react'
import ReactDOM from 'react-dom/client'
import { Flex, Form, Input, Button } from 'antd'
import logo from '@renderer/assets/icon.png'
import styles from './index.module.less'
import '@renderer/base.css'

function Login(): JSX.Element {
  const [form] = Form.useForm()
  const { ipcRenderer } = window.electron

  const handleLogin = (v): void => {
    ipcRenderer.send('renderer', {
      from: 'login',
      data: v
    })
  }

  return (
    <Form className={styles.login} form={form} onFinish={handleLogin}>
      <Flex gap={20} align="center" justify="center" vertical>
        <img src={logo} width={80} alt="" />
        <Form.Item name="username">
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item name="password">
          <Input placeholder="password" />
        </Form.Item>
        <Button htmlType="submit">login</Button>
      </Flex>
    </Form>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)
