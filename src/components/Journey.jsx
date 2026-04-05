import React from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { fadeUp, staggerContainer } from '../utils/motionVariants'

const journeyData = [
  {
    year: '2023 — 2027',
    title: 'B.Tech in Computer Science (AIML)',
    org: 'IMS Engineering College, Ghaziabad',
    badge: '83% Aggregate',
    badgeColor: 'rgba(16,185,129,0.15)',
    badgeBorder: 'rgba(16,185,129,0.3)',
    badgeText: '#10b981',
    desc: 'Specializing in Artificial Intelligence and Machine Learning with a focus on deep learning applications, computer vision, and intelligent systems design.',
    icon: '🎓',
  },
  {
    year: '2025',
    title: 'AI-ML Virtual Internship',
    org: 'EduSkills Foundation',
    badge: 'Internship',
    badgeColor: 'rgba(0,212,255,0.1)',
    badgeBorder: 'rgba(0,212,255,0.3)',
    badgeText: '#00d4ff',
    desc: 'Hands-on experience in industry-aligned AI/ML workflows, model development, and real-world problem-solving under expert mentorship.',
    icon: '🚀',
  },
]

function JourneyCard({ item, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl p-8 overflow-hidden cursor-default"
      style={{ background: '#161b22', border: '1px solid #21262d' }}
    >
      {/* Top gradient line */}
      <div className="top-gradient-line" />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #21262d' }}
      >
        {item.icon}
      </div>

      <div className="font-mono text-xs mb-2" style={{ color: '#00d4ff' }}>
        {item.year}
      </div>

      <h3 className="font-display font-bold text-xl text-text1 mb-1 leading-tight">
        {item.title}
      </h3>
      <p className="text-text2 text-sm mb-4">{item.org}</p>

      <span
        className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-4"
        style={{
          background: item.badgeColor,
          border: `1px solid ${item.badgeBorder}`,
          color: item.badgeText,
        }}
      >
        {item.badge}
      </span>

      <p className="text-text2 text-sm leading-relaxed">{item.desc}</p>

      {/* Ambient glow */}
      <div
        className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
      />
    </motion.div>
  )
}

export default function Journey() {
  const { ref, isInView } = useScrollReveal(0.1)

  return (
    <section id="journey" className="py-32 px-6" style={{ background: 'linear-gradient(180deg, #030712 0%, #0d1117 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// 01 — My Journey</p>
          <h2
            className="font-display font-extrabold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            The{' '}
            <span className="text-text2">Path So Far</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {journeyData.map((item, i) => (
            <JourneyCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
