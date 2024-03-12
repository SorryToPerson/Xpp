import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { FBXLoader } from 'three-fbx-loader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model({ url, type }) {
  let model = null

  if (type === 'fbx') {
    model = useLoader(FBXLoader, url)
  } else if (type === 'glb') {
    model = useLoader(GLTFLoader, url)
  }

  const group = useRef()

  useEffect(() => {
    if (group.current) {
      group.current.rotation.y = Math.PI
    }
  }, [group])

  return (
    <group ref={group}>
      <primitive object={model.scene} />
    </group>
  )
}

export default Model
