import React from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const skillsData = [
  {
    num: '01',
    title: 'AI & Deep Learning',
    tags: ['TensorFlow', 'Keras', 'OpenCV', 'MediaPipe', 'CNNs', 'Neural Networks'],
    color: '#00d4ff',
    description: 'Building intelligent vision and prediction systems using state-of-the-art deep learning architectures.',
  },
  {
    num: '02',
    title: 'Machine Learning',
    tags: ['Supervised Learning', 'Unsupervised', 'NLP', 'Model Evaluation', 'XGBoost', 'Scikit-learn'],
    color: '#7c3aed',
    description: 'End-to-end ML pipelines from feature engineering and model selection to deployment and evaluation.',
  },
  {
    num: '03',
    title: 'Programming',
    tags: ['Python', 'Java', 'C', 'SQL', 'Streamlit', 'Plotly'],
    color: '#10b981',
    description: 'Proficient across multiple languages with a focus on data-intensive, backend and analytical applications.',
  },
]

function SkillCard({ item, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, borderColor: item.color }}
      className="group relative rounded-2xl p-8 cursor-default transition-colors duration-300"
      style={{ background: '#161b22', border: '1px solid #21262d' }}
    >
      {/* Large number */}
      <motion.div
        className="font-display font-extrabold leading-none mb-5 transition-all duration-300 select-none"
        style={{ fontSize: '4rem', color: '#21262d' }}
        whileHover={{ color: item.color }}
      >
        <motion.span
          className="block"
          initial={{ backgroundSize: '0% 100%' }}
          whileHover={{
            backgroundSize: '100% 100%',
          }}
          style={{
            backgroundImage: `linear-gradient(135deg, ${item.color}, #7c3aed)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {item.num}
        </motion.span>
      </motion.div>

      <h3 className="font-display font-bold text-lg text-text1 mb-2">{item.title}</h3>
      <p className="text-text2 text-sm leading-relaxed mb-5">{item.description}</p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <motion.span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #21262d', color: '#8b949e' }}
            whileHover={{ borderColor: item.color, color: item.color, background: `rgba(${item.color === '#00d4ff' ? '0,212,255' : item.color === '#7c3aed' ? '124,58,237' : '16,185,129'},0.1)` }}
            transition={{ duration: 0.15 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Corner glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${item.color}22 0%, transparent 70%)` }}
      />
    </motion.div>
  )
}

export default function Skills() {
  const { ref, isInView } = useScrollReveal(0.1)

  return (
    <section id="skills" className="py-32 px-6" style={{ background: '#0d1117' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">// 02 — Technical Expertise</p>
          <h2
            className="font-display font-extrabold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            What I <span className="text-text2">Work With</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillsData.map((item, i) => (
            <SkillCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
