'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSectionTracking } from '@/lib/useAmplitude'
import { track } from '@/lib/amplitude'
import MascotCat from './MascotCat'
import MascotDog from './MascotDog'

const dialog = [
  { who: 'cat', name: '', text: 'Босе, скільки буде 8 × 9? 🤔' },
  { who: 'dog', name: 'Бос', text: 'Чекай, мозок у режимі скібіді-туалет 🚽' },
  { who: 'cat', name: '', text: 'Ноу кеп, це ж 72!' },
  { who: 'dog', name: 'Бос', text: '72?! По системі Огайо — чистий сигма-флекс 🗿' },
  { who: 'cat', name: '', text: 'А тепер: 100 різзу ділимо на 4 фанум-такс?' },
  { who: 'dog', name: 'Бос', text: '25 на кожен. Математика — це різз 🔥' },
  { who: 'cat', name: '', text: 'Лови +200 балів і трішки скібіді 💀' },
  { who: 'dog', name: 'Бос', text: 'Тепер я офіційно сигма-математик 😼' },
]

export default function HeroSection() {
  const ref = useSectionTracking('hero', 'hero')
  const [catMsg, setCatMsg] = useState<{ name: string; text: string } | null>(null)
  const [dogMsg, setDogMsg] = useState<{ name: string; text: string } | null>(null)
  const idxRef = useRef(0)

  useEffect(() => {
    function step() {
      const line = dialog[idxRef.current]
      if (line.who === 'cat') {
        setDogMsg(null)
        setCatMsg({ name: line.name, text: line.text })
      } else {
        setCatMsg(null)
        setDogMsg({ name: line.name, text: line.text })
      }
      idxRef.current = (idxRef.current + 1) % dialog.length
    }
    step()
    const id = setInterval(step, 4800)
    return () => clearInterval(id)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      id="hero"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ position: 'relative', padding: '140px 0 70px', textAlign: 'center' }}
    >
      {/* SVG filter defs */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={2} seed={7} result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale={6} xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="wobble2">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves={2} seed={3} result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale={6} xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </svg>

      {/* Peeking cat */}
      <div className="hero-peek" style={{
        position: 'absolute', top: 78, left: '4vw', pointerEvents: 'none',
        width: 'clamp(74px,11vw,128px)', filter: 'drop-shadow(0 16px 22px rgba(15,92,84,.28))',
        animation: 'peekL 5s ease-in-out infinite',
      }}>
        <MascotCat />
      </div>
      {/* Cat talk bubble */}
      <div className="hero-peek-talk" style={{
        position: 'absolute', zIndex: 6, top: 205, left: 'calc(4vw + 26px)',
        maxWidth: 178, padding: '11px 15px', borderRadius: 18,
        fontSize: 12.5, fontWeight: 700, lineHeight: 1.34, color: '#163a36',
        background: '#fff', boxShadow: '0 16px 34px -16px rgba(10,59,56,.55)',
        opacity: catMsg ? 1 : 0,
        transform: catMsg ? 'scale(1) translateY(0)' : 'scale(.55) translateY(-6px)',
        transformOrigin: 'top center',
        transition: 'opacity .3s ease,transform .4s cubic-bezier(.2,.8,.3,1.5)',
        pointerEvents: 'none',
      }}>
        {catMsg?.name && <span style={{ display: 'block', fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 11, letterSpacing: '.4px', marginBottom: 3, color: 'var(--teal-deep)' }}>{catMsg.name}</span>}
        {catMsg?.text}
        <span style={{ content: '', position: 'absolute', top: -7, left: 24, width: 14, height: 14, background: '#fff', transform: 'rotate(45deg)', boxShadow: '-3px -3px 8px -4px rgba(10,59,56,.18)', display: 'block' }} />
      </div>

      {/* Peeking dog */}
      <div className="hero-peek" style={{
        position: 'absolute', top: 78, right: '4vw', pointerEvents: 'none',
        width: 'clamp(74px,11vw,128px)', filter: 'drop-shadow(0 16px 22px rgba(15,92,84,.28))',
        animation: 'peekR 5.6s ease-in-out infinite',
      }}>
        <MascotDog />
      </div>
      {/* Dog talk bubble */}
      <div className="hero-peek-talk" style={{
        position: 'absolute', zIndex: 6, top: 205, right: 'calc(4vw + 26px)',
        maxWidth: 178, padding: '11px 15px', borderRadius: 18,
        fontSize: 12.5, fontWeight: 700, lineHeight: 1.34, color: '#163a36',
        background: '#fff', boxShadow: '0 16px 34px -16px rgba(10,59,56,.55)',
        opacity: dogMsg ? 1 : 0,
        transform: dogMsg ? 'scale(1) translateY(0)' : 'scale(.55) translateY(-6px)',
        transformOrigin: 'top center',
        transition: 'opacity .3s ease,transform .4s cubic-bezier(.2,.8,.3,1.5)',
        pointerEvents: 'none',
      }}>
        {dogMsg?.name && <span style={{ display: 'block', fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 11, letterSpacing: '.4px', marginBottom: 3, color: 'var(--ember)' }}>{dogMsg.name}</span>}
        {dogMsg?.text}
        <span style={{ content: '', position: 'absolute', top: -7, right: 24, width: 14, height: 14, background: '#fff', transform: 'rotate(45deg)', boxShadow: '-3px -3px 8px -4px rgba(10,59,56,.18)', display: 'block' }} />
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(16px,4vw,28px)', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{ marginBottom: 26 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, padding: '8px 18px', borderRadius: 40,
            fontWeight: 700, fontSize: 13.5, color: '#a9772e',
            background: 'rgba(243,194,90,.16)', border: '1.5px solid rgba(243,194,90,.45)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--green)',
              boxShadow: '0 0 0 0 rgba(84,224,160,.7)', animation: 'ping 1.8s ease-out infinite',
              flexShrink: 0,
            }} />
            <span>Вейтліст відкрито · 847 вже в грі</span>
          </span>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'var(--fd)', fontWeight: 900,
          fontSize: 'clamp(44px,8.5vw,92px)',
          lineHeight: .98, letterSpacing: -1, marginBottom: 22,
        }}>
          <span style={{ display: 'block', color: 'var(--teal-deep)', textShadow: '0 2px 0 #fff,0 14px 36px rgba(15,92,84,.18)' }}>
            Завали Боса.
          </span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(100deg,var(--teal-bright) 0%,var(--gold) 50%,var(--violet) 100%)',
            backgroundSize: '220% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'shimmer 5s linear infinite',
          }}>
            Здай НМТ.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(14px,1.8vw,17px)', color: 'var(--ink-soft)',
          maxWidth: 560, margin: '0 auto 34px', lineHeight: 1.6,
        }}>
          Ми перші, хто зробив НМТ хоч трохи цікавим. Тут ти не просто розв&#39;язуєш тести — ти граєш, змагаєшся, проходиш битви й бачиш, як з кожним днем стаєш сильнішим.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => { track('cta_clicked', { location: 'hero_primary' }); scrollTo('join') }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
              borderRadius: 40, fontWeight: 700, fontSize: 15, color: '#06241f',
              background: 'linear-gradient(135deg,var(--teal-bright),var(--green))',
              boxShadow: '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--fu)',
              transition: 'transform .2s,box-shadow .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 38px -10px rgba(84,224,160,.85)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.05em', height: '1.05em' }}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
            </svg>
            Зареєструватися
          </button>
          <button
            onClick={() => scrollTo('game')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
              borderRadius: 40, fontWeight: 700, fontSize: 15, color: 'var(--ink)',
              background: 'var(--glass)', border: '1.5px solid var(--glass-line)',
              cursor: 'pointer', fontFamily: 'var(--fu)',
              transition: 'transform .2s,border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--teal)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--glass-line)' }}
          >
            Спершу подивитись дуель
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.05em', height: '1.05em' }}>
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 54 }}>
          {[
            { val: '200', label: 'максимум балів' },
            { val: '4 500+', label: 'завдань-боїв' },
            { val: 'AI', label: 'розбір слабких зон' },
          ].map(({ val, label }) => (
            <div key={label} style={{
              padding: '16px 26px', borderRadius: 20,
              background: 'var(--glass)', border: '1.5px solid var(--glass-line)',
              minWidth: 130,
            }}>
              <b style={{
                fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 30, display: 'block',
                background: 'linear-gradient(90deg,var(--teal-bright),var(--gold))',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>{val}</b>
              <span style={{ fontSize: 12.5, color: 'var(--ink-soft)', fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
