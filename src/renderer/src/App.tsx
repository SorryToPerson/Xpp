import ModelViewer from './components/ModelViewer'
import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from 'react-three-fiber'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ModelViewer url="./components/azhong_mod_v03.fbx" type="fbx" />
      </Suspense>
    </Canvas>
  )
}

export default App
