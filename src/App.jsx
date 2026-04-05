import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Connect from './components/Connect'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <div className="noise-bg relative">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Skills />
        <Projects />
        <Achievements />
        <Connect />
      </main>
      <Footer />
    </div>
  )
}
