'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import GameSection from '@/components/GameSection'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorks from '@/components/HowItWorks'
import AISection from '@/components/AISection'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'

function Atmosphere() {
  useEffect(() => {
    // Stars
    const starsEl = document.getElementById('stars-layer')
    if (starsEl && starsEl.childElementCount === 0) {
      for (let i = 0; i < 14; i++) {
        const s = document.createElement('div')
        s.className = 'star'
        const sz = 3 + Math.random() * 4
        s.style.width = sz + 'px'
        s.style.height = sz + 'px'
        s.style.left = Math.random() * 100 + 'vw'
        s.style.top = Math.random() * 70 + 'vh'
        s.style.animationDelay = (-Math.random() * 9) + 's'
        starsEl.appendChild(s)
      }
    }
    // Particles
    const particlesEl = document.getElementById('particles-layer')
    if (particlesEl && particlesEl.childElementCount === 0) {
      for (let i = 0; i < 24; i++) {
        const s = document.createElement('div')
        s.className = 'spore'
        s.style.left = Math.random() * 100 + 'vw'
        const d = 9 + Math.random() * 14
        s.style.animationDuration = d + 's'
        s.style.animationDelay = (-Math.random() * d) + 's'
        const sz = 4 + Math.random() * 5
        s.style.width = sz + 'px'
        s.style.height = sz + 'px'
        s.style.opacity = String(0.35 + Math.random() * 0.4)
        particlesEl.appendChild(s)
      }
    }

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.14 })
    document.querySelectorAll('.reveal').forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = (i % 3 * 0.08) + 's'
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="bg-atmosphere" />
      <div className="grain" />
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="stars-layer" id="stars-layer" />
      <div className="particles-layer" id="particles-layer" />
    </>
  )
}

export default function Home() {
  return (
    <>
      <Atmosphere />
      <Navbar />
      <main>
        <HeroSection />
        <GameSection />
        <FeaturesSection />
        <HowItWorks />
        <AISection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}
