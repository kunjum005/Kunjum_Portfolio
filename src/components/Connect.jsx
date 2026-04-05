import React from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Connect() {
  const { ref, isInView } = useScrollReveal(0.15)

  return (
    <section id="connect" className="py-32 px-6" style={{ background: '#0d1117' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label justify-center flex">// 05 — Let's Connect</p>

          <h2
            className="font-display font-extrabold leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Got an idea?
            <br />
            <span className="text-text2">Let's build it.</span>
          </h2>

          <p className="text-text2 text-base leading-relaxed mb-10 max-w-md mx-auto">
            I'm open to AI/ML collaborations, internship opportunities, or just a great
            conversation about technology and the future.
          </p>

          {/* Email */}
          <motion.a
            href="mailto:kunjum7025@gmail.com"
            className="inline-block font-mono text-lg mb-8 no-underline"
            style={{ color: '#00d4ff' }}
            whileHover={{ scale: 1.04, letterSpacing: '0.04em' }}
            transition={{ duration: 0.2 }}
          >
            kunjum7025@gmail.com
          </motion.a>

          {/* Primary CTA */}
          <div className="mb-8">
            <motion.a
              href="mailto:kunjum7025@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-bold text-sm rounded-xl no-underline"
              whileHover={{ scale: 1.04, backgroundColor: '#00b8d9', y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Send a Message
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h10v10M2 12L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { label: 'GitHub', href: 'https://github.com/' },
              { label: 'LinkedIn', href: 'https://linkedin.com/' },
              { label: 'Twitter', href: 'https://twitter.com/' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-text2 no-underline"
                style={{ border: '1px solid #30363d' }}
                whileHover={{ borderColor: '#00d4ff', color: '#00d4ff', y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
