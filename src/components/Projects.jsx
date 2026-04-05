import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  {
    icon: '🌾',
    name: 'KrishiSathi',
    tagline: 'Smart Agriculture Platform',
    desc: 'End-to-end platform using XGBoost for crop yield prediction and CNNs for disease detection, empowering farmers with AI-driven agricultural insights.',
    stack: ['XGBoost', 'CNN', 'Python', 'TensorFlow', 'Flask'],
    color: '#10b981',
    accent: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    link: '#',
  },
  {
    icon: '✋',
    name: 'Gesture Volume Control',
    tagline: 'Computer Vision Pipeline',
    desc: 'Real-time hand landmark detection using MediaPipe enabling touchless system volume control via intuitive gesture recognition — no hardware required.',
    stack: ['MediaPipe', 'OpenCV', 'Python', 'NumPy'],
    color: '#00d4ff',
    accent: 'rgba(0,212,255,0.08)',
    border: 'rgba(0,212,255,0.2)',
    link: '#',
  },
  {
    icon: '🌫',
    name: 'Urban Air Quality',
    tagline: 'Interactive Analytics Dashboard',
    desc: 'Real-time urban air quality monitoring dashboard with predictive ML analytics, built with Streamlit and Plotly for rich, responsive data visualization.',
    stack: ['Streamlit', 'Plotly', 'Python', 'Scikit-learn', 'Pandas'],
    color: '#7c3aed',
    accent: 'rgba(124,58,237,0.1)',
    border: 'rgba(124,58,237,0.25)',
    link: '#',
  },
]

function TiltCard({ children, className, style }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])
  const springRotX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const mx = (e.clientX - rect.left) / rect.width - 0.5
    const my = (e.clientY - rect.top) / rect.height - 0.5
    x.set(mx)
    y.set(my)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <TiltCard
        className="group relative rounded-2xl p-7 h-full cursor-pointer transition-shadow duration-300"
        style={{ background: '#161b22', border: '1px solid #21262d' }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
          style={{ background: project.accent, border: `1px solid ${project.border}` }}
        >
          {project.icon}
        </div>

        {/* Name + tagline */}
        <h3 className="font-display font-bold text-xl text-text1 mb-1 leading-tight">
          {project.name}
        </h3>
        <p className="font-mono text-xs mb-4" style={{ color: project.color }}>
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-text2 text-sm leading-relaxed mb-5">{project.desc}</p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded"
              style={{ background: project.accent, border: `1px solid ${project.border}`, color: project.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer link */}
        <motion.a
          href={project.link}
          className="inline-flex items-center gap-1.5 text-sm font-medium no-underline"
          style={{ color: project.color }}
          whileHover={{ gap: 8 }}
          transition={{ duration: 0.2 }}
        >
          View Project
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ border: `1px solid ${project.border}`, boxShadow: `0 0 40px ${project.color}18` }}
        />
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, isInView } = useScrollReveal(0.1)

  return (
    <section
      id="projects"
      className="py-32 px-6"
      style={{ background: 'linear-gradient(180deg, #0d1117 0%, #030712 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// 03 — Featured Projects</p>
          <h2
            className="font-display font-extrabold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Things I've <span className="text-text2">Built</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
