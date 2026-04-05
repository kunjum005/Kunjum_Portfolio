import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll as useFramerScroll, useTransform } from 'framer-motion'

// Floating particle cloud
function ParticleField() {
  const ref = useRef()
  const count = 300

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 25
      arr[i * 3 + 1] = (Math.random() - 0.5) * 25
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04
      ref.current.rotation.x += delta * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00d4ff" size={0.04} transparent opacity={0.35} />
    </points>
  )
}

// Orbiting ring
function OrbitalRing({ radius, tilt, color, speed }) {
  const ref = useRef()
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pts
  }, [radius])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })

  return (
    <line ref={ref} rotation={[tilt, 0, 0]}>
      <bufferGeometry setFromPoints={points} />
      <lineBasicMaterial color={color} transparent opacity={0.4} />
    </line>
  )
}

// Orbiting satellite dot
function Satellite({ radius, yOffset, speed, color, startAngle }) {
  const ref = useRef()
  const angle = useRef(startAngle)

  useFrame((_, delta) => {
    angle.current += delta * speed
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * radius
      ref.current.position.z = Math.sin(angle.current) * radius
      ref.current.position.y = yOffset + Math.sin(angle.current * 2) * 0.3
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  )
}

// Neural connection lines between satellites
function NeuralLines({ satRefs }) {
  return null // dynamic lines handled separately for perf
}

// Core icosahedron brain
function BrainCore() {
  const coreRef = useRef()
  const wireRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.1
      const s = 1 + Math.sin(t * 2) * 0.025
      coreRef.current.scale.set(s, s, s)
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15
      wireRef.current.rotation.z += delta * 0.08
    }
  })

  return (
    <group>
      {/* Solid core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 3]} />
        <meshPhongMaterial
          color="#00d4ff"
          emissive="#003344"
          transparent
          opacity={0.82}
          shininess={250}
          wireframe={false}
        />
      </mesh>
      {/* Wire shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.12} />
      </mesh>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

// Main scene group with mouse parallax and scroll
function SceneGroup() {
  const groupRef = useRef()
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const targetRot = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    targetRot.current.x += (mouse.current.y * 0.3 - targetRot.current.x) * 0.05
    targetRot.current.y += (mouse.current.x * 0.5 + state.clock.elapsedTime * 0.1 - targetRot.current.y) * 0.05

    if (groupRef.current) {
      groupRef.current.rotation.x = targetRot.current.x
      groupRef.current.rotation.y = targetRot.current.y
    }

    // Scroll parallax on camera
    const targetCamY = -scrollY.current * 0.003
    camera.position.y += (targetCamY - camera.position.y) * 0.08
  })

  const satConfig = [
    { radius: 2.2, yOffset: 0.2, speed: 0.6, color: '#00d4ff', startAngle: 0 },
    { radius: 2.5, yOffset: -0.4, speed: 0.4, color: '#7c3aed', startAngle: 1.2 },
    { radius: 2.0, yOffset: 0.6, speed: 0.8, color: '#10b981', startAngle: 2.4 },
    { radius: 2.8, yOffset: -0.2, speed: 0.35, color: '#f59e0b', startAngle: 3.6 },
    { radius: 2.3, yOffset: 0.5, speed: 0.55, color: '#ef4444', startAngle: 4.8 },
    { radius: 2.6, yOffset: -0.6, speed: 0.45, color: '#3b82f6', startAngle: 1.8 },
  ]

  return (
    <group ref={groupRef}>
      <BrainCore />
      <OrbitalRing radius={2.2} tilt={Math.PI / 4} color="#00d4ff" speed={0.3} />
      <OrbitalRing radius={2.0} tilt={-Math.PI / 3} color="#7c3aed" speed={-0.2} />
      <OrbitalRing radius={1.8} tilt={Math.PI / 2} color="#10b981" speed={0.25} />
      {satConfig.map((s, i) => (
        <Satellite key={i} {...s} />
      ))}
    </group>
  )
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#00d4ff" />
      <pointLight position={[-5, -3, 3]} intensity={2} color="#7c3aed" />
      <pointLight position={[0, -5, 5]} intensity={1.5} color="#10b981" />

      <SceneGroup />
      <ParticleField />
    </Canvas>
  )
}
