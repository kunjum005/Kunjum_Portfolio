import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{ borderTop: '1px solid #21262d', background: '#030712' }}
    >
      <motion.p
        className="font-mono text-xs text-text3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        © {new Date().getFullYear()} Kunjum Mittal — Built with React, Three.js & Framer Motion
      </motion.p>
    </footer>
  )
}
