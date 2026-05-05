'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const line1Words = ['AI', 'is', 'the', 'biggest', 'distribution', 'shift', 'in', 'a', 'generation.']
const line2Words = ["I'm", 'betting', 'my', 'career', 'on', 'the', 'people', 'who', 'get', 'it', 'to', 'market.']
const allWords = [...line1Words, ...line2Words]

function WordPlanes({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  const wordData = useMemo(() =>
    allWords.map((word, i) => {
      const isLine1 = i < line1Words.length
      const col = isLine1 ? i : i - line1Words.length
      const lineLength = isLine1 ? line1Words.length : line2Words.length
      return {
        word,
        initialZ: (Math.random() - 0.5) * 40,
        x: (col - lineLength / 2) * 1.2,
        y: isLine1 ? 0.5 : -0.5,
      }
    }), []
  )

  const meshRefs = useRef<(THREE.Group | null)[]>([])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x += (-mouse.y * 0.03 - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (mouse.x * 0.03 - groupRef.current.rotation.y) * 0.05

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const targetZ = wordData[i].initialZ * (1 - scrollProgress)
      mesh.position.z += (targetZ - mesh.position.z) * 0.1
    })
  })

  return (
    <group ref={groupRef}>
      {wordData.map((d, i) => (
        <group
          key={`${d.word}-${i}`}
          ref={(el) => { meshRefs.current[i] = el }}
          position={[d.x, d.y, d.initialZ]}
        >
          <Text fontSize={0.4} color="#F4EFE6" anchorX="center" anchorY="middle">
            {d.word}
          </Text>
        </group>
      ))}
    </group>
  )
}

export function BetScene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <WordPlanes scrollProgress={scrollProgress} />
    </Canvas>
  )
}
