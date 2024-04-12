import { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import { useGlobalStore } from '@renderer/store/global'

const { Dragger } = Upload
import styles from './index.module.less'

export default function Main(): JSX.Element {
  const setUserInfo = useGlobalStore((state) => state.setUserInfo)
  const [imageSrc, setImageSrc] = useState<string>()

  const { ipcRenderer } = window.electron

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        const reader = new FileReader()
        reader.readAsDataURL(info.file.originFileObj as Blob)
        reader.onload = (): void => {
          setImageSrc(reader.result as string)
        }
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

  const imgStyle: React.CSSProperties = {
    width: '50%'
  }
  useEffect(() => {
    ipcRenderer.on('main', handleMessageFromMain)
  }, [])
  return (
    <div className={styles.home}>
      <Dragger {...props}>
        <img style={imgStyle} src={imageSrc} />
      </Dragger>
    </div>
  )
}
