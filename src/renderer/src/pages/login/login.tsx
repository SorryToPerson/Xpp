import React from 'react'
import ReactDOM from 'react-dom/client'
import '@renderer/base.css'

function Login(): JSX.Element {
  return <div>login</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)
