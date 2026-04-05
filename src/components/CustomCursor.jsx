import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const dotSpring = { damping: 50, stiffness: 500 }
  const dotSpringX = useSpring(dotX, dotSpring)
  const dotSpringY = useSpring(dotY, dotSpring)

  const isHovering = useRef(false)
  const scaleMotion = useMotionValue(1)
  const scaleSpring = useSpring(scaleMotion, { damping: 20, stiffness: 300 })

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      dotX.set(e.clientX - 3)
      dotY.set(e.clientY - 3)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        scaleMotion.set(1.8)
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        scaleMotion.set(1)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          scale: scaleSpring,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1px solid rgba(0, 212, 255, 0.6)',
          }}
        />
      </motion.div>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotSpringX, y: dotSpringY }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#00d4ff',
          }}
        />
      </motion.div>
    </>
  )
}
