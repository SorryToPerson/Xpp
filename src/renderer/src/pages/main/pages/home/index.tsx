import { useEffect, useRef, useState } from 'react'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import { useGlobalStore } from '@renderer/store/global'

const { Dragger } = Upload
import styles from './index.module.less'

export default function Main(): JSX.Element {
  const setUserInfo = useGlobalStore((state) => state.setUserInfo)
  const [imageSrc, setImageSrc] = useState<string>()
  const [mouseDown, setMouseDown] = useState(false)
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({
    width: '50%'
  })
  const imageRef = useRef<HTMLImageElement>(null)

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

  useEffect(() => {
    ipcRenderer.on('main', handleMessageFromMain)
  }, [])
  return (
    <div className={styles.home}>
      <div className="frame">
        {imageSrc ? (
          <div className="frame-image">
            <img
              ref={imageRef}
              onMouseDown={() => setMouseDown(true)}
              onMouseUp={() => setMouseDown(false)}
              onMouseMove={(e) => {
                if (!mouseDown) return
                const { pageX, pageY } = e
                const rect = imageRef.current?.getBoundingClientRect()
                if (rect) {
                  console.log(rect)
                  console.log(pageX, pageY)
                  setImageStyle({
                    ...imageStyle,
                    top: `${pageY - rect.top}px`,
                    left: `${pageX - rect.left}px`
                  })
                }
              }}
              style={imageStyle}
              src={imageSrc}
            />
          </div>
        ) : (
          <Dragger {...props}>拖拽或点击上传</Dragger>
        )}
      </div>
      <div className="tools">tool</div>
    </div>
  )
}
