'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { images } from '@/lib/images'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 toMouse = uv - uMouse;
    float dist = length(toMouse);
    float ripple = sin(dist * 25.0 - uTime * 3.0) * 0.007;
    ripple *= smoothstep(0.5, 0.0, dist);
    if (dist > 0.001) {
      uv += normalize(toMouse) * ripple;
    }
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`

function ShaderPlane() {
  const { viewport, mouse } = useThree()
  const texture = useTexture(images.hero)
  const mouseSmoothed = useRef(new THREE.Vector2(0.5, 0.5))

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
  }), [texture])

  const scale = useMemo(() => {
    const imageAspect = 1920 / 1080
    const viewAspect = viewport.width / viewport.height
    return viewAspect > imageAspect
      ? [viewport.width, viewport.width / imageAspect, 1] as [number, number, number]
      : [viewport.height * imageAspect, viewport.height, 1] as [number, number, number]
  }, [viewport])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime()
    mouseSmoothed.current.lerp(
      new THREE.Vector2((mouse.x + 1) / 2, (mouse.y + 1) / 2),
      0.05
    )
    uniforms.uMouse.value.copy(mouseSmoothed.current)
  })

  return (
    <mesh scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms as Record<string, THREE.IUniform>}
      />
    </mesh>
  )
}

export function HeroShader() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: false }}
      camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }}
    >
      <ShaderPlane />
    </Canvas>
  )
}
