import React from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const achievements = [
  {
    icon: '🏆',
    year: '2025',
    name: 'Smart India Hackathon',
    sub: 'First Round Qualifier',
    desc: "Successfully cleared the first round of India's largest national-level hackathon, competing with thousands of teams to propose AI-powered solutions for critical national challenges.",
    color: '#f59e0b',
    accent: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
  },
  {
    icon: '🎖',
    year: '2026',
    name: 'SkillIndia Gen-AI & ML',
    sub: 'National Certification',
    desc: 'Earned a nationally recognized certification in Generative AI and Machine Learning under the Government of India\'s SkillIndia initiative, validating industry-standard competencies.',
    color: '#7c3aed',
    accent: 'rgba(124,58,237,0.1)',
    border: 'rgba(124,58,237,0.3)',
  },
]

function AchievementCard({ item, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, borderColor: item.border }}
      className="flex gap-5 p-7 rounded-2xl cursor-default transition-colors duration-300"
      style={{ background: '#161b22', border: '1px solid #21262d' }}
    >
      {/* Icon badge */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: item.accent, border: `1px solid ${item.border}` }}
      >
        {item.icon}
      </div>

      <div>
        <div className="font-mono text-xs mb-1" style={{ color: item.color }}>
          {item.year}
        </div>
        <h3 className="font-display font-bold text-lg text-text1 mb-0.5 leading-tight">
          {item.name}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: item.color }}>
          {item.sub}
        </p>
        <p className="text-text2 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  const { ref, isInView } = useScrollReveal(0.1)

  return (
    <section id="achievements" className="py-32 px-6" style={{ background: '#030712' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// 04 — Recognition</p>
          <h2
            className="font-display font-extrabold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Awards &{' '}
            <span className="text-text2">Milestones</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <AchievementCard key={i} item={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
