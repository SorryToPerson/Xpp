import { useEffect } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import { useGlobalStore } from '@renderer/store/global'

const { Dragger } = Upload
import styles from './index.module.less'

export default function Main(): JSX.Element {
  const setUserInfo = useGlobalStore((state) => state.setUserInfo)

  const { ipcRenderer } = window.electron

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }
  const handleMessageFromMain = (_, { from, data }): void => {
    if (from === 'mainWindow') {
      setUserInfo(data)
    }
  }
  useEffect(() => {
    ipcRenderer.on('main', handleMessageFromMain)
  }, [])
  return (
    <div className={styles.home}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or
          other banned files.
        </p>
      </Dragger>
    </div>
  )
}
