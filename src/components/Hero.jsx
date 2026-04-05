import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ThreeScene from './ThreeScene'
import { heroTextVariants } from '../utils/motionVariants'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms — text floats behind 3D model as you scroll
  const yText    = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale    = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const blur     = useTransform(scrollYProgress, [0, 0.5], [0, 8])

  const springY  = useSpring(yText,   { stiffness: 100, damping: 30 })

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* 3D Scene — fixed z so text floats IN FRONT */}
      <div className="absolute inset-0 z-10">
        <ThreeScene />
      </div>

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(3,7,18,0.7) 80%)',
        }}
      />

      {/* Gradient ground fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }}
      />

      {/* Text content — parallax layer */}
      <motion.div
        className="relative z-30 px-8 md:px-16 max-w-2xl"
        style={{
          y: springY,
          opacity,
          scale,
          filter: blur ? `blur(${blur}px)` : undefined,
        }}
      >
        {/* Badge */}
        <motion.div
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
          style={{
            background: 'rgba(0,212,255,0.08)',
            borderColor: 'rgba(0,212,255,0.3)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-accent animate-pulse"
            style={{ animationDuration: '1.8s' }}
          />
          <span className="font-mono text-xs text-accent tracking-wider">
            Available for Opportunities
          </span>
        </motion.div>

        {/* Name — split lines with stagger */}
        <motion.h1
          className="font-display font-extrabold leading-none tracking-tight mb-3"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          <motion.span
            className="block text-text1"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Kunjum
          </motion.span>
          <motion.span
            className="block gradient-text"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Mittal
          </motion.span>
        </motion.h1>

        {/* Title */}
        <motion.p
          className="font-mono text-accent text-sm mb-5 tracking-wider"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {'>'} AI & Machine Learning Specialist
        </motion.p>

        {/* Hook */}
        <motion.p
          className="text-text2 text-lg leading-relaxed mb-8 max-w-md"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          Enthusiastic B.Tech CS student specializing in solving real-world problems
          through <span className="text-text1 font-medium">AI</span> and{' '}
          <span className="text-text1 font-medium">Deep Learning</span>.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          className="flex gap-4 flex-wrap"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-bold text-sm rounded-lg no-underline"
            whileHover={{ scale: 1.04, backgroundColor: '#00b8d9', y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            View Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
          <motion.a
            href="#connect"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium text-sm rounded-lg border border-border2 text-text1 no-underline"
            whileHover={{ scale: 1.04, borderColor: '#00d4ff', color: '#00d4ff', y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Let's Connect
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex gap-6 mt-10 pt-8 border-t border-border"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          {[
            { num: '83%', label: 'Academic Score' },
            { num: '3+', label: 'Live Projects' },
            { num: '2025', label: 'SIH Qualifier' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display font-bold text-2xl text-accent">{stat.num}</div>
              <div className="font-mono text-xs text-text3 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="font-mono text-text3 text-xs tracking-widest uppercase">scroll</span>
        <div
          className="w-px h-14"
          style={{ background: 'linear-gradient(to bottom, #00d4ff, transparent)', animation: 'scrollLine 2s ease infinite' }}
        />
      </motion.div>
    </section>
  )
}
