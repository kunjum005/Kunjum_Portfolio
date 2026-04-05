import React, { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const links = [
  { label: 'Journey', href: '#journey' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Connect', href: '#connect' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'rgba(3, 7, 18, 0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        className="font-display font-extrabold text-xl tracking-tight select-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        KM<span className="text-accent">.</span>
      </motion.a>

      {/* Links */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`relative text-xs font-mono uppercase tracking-widest transition-colors duration-200 no-underline
                ${activeSection === link.href.slice(1) ? 'text-accent' : 'text-text2 hover:text-text1'}`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="#connect"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-accent text-bg font-bold text-sm rounded-lg no-underline"
        whileHover={{ scale: 1.05, backgroundColor: '#00b8d9' }}
        whileTap={{ scale: 0.97 }}
      >
        Hire Me
      </motion.a>
    </motion.nav>
  )
}
