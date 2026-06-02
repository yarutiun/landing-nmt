'use client'

import React from 'react'
import { useSectionTracking } from '@/lib/useAmplitude'

const cards = [
  {
    cls: 'c-play',
    span: 2,
    iconGrad: 'linear-gradient(135deg,var(--water),var(--teal-bright))',
    glowColor: 'var(--water)',
    title: 'Грай, не зубри',
    desc: 'Жодних нудних конспектів і параграфів. Кожне завдання — це бій, а не сторінка підручника. Ти граєш — і саме тому все запам\'ятовується.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/>
        <line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/>
        <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
      </svg>
    ),
    iconAnim: 'padWiggle 2.6s ease-in-out infinite',
    glowAnim: 'playGlow 3.2s ease-in-out infinite',
  },
  {
    cls: 'c-pvp',
    span: 2,
    iconGrad: 'linear-gradient(135deg,var(--violet),#6b5ad0)',
    glowColor: 'var(--violet)',
    title: 'PvP з друзями',
    desc: 'Виклич однокласника на дуель у реальному часі. Хто швидше й точніше — той забирає бали слави.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/>
        <line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/>
        <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/>
        <line x1="5" y1="14" x2="9" y2="18"/><line x1="7" y1="17" x2="4" y2="20"/><line x1="3" y1="19" x2="5" y2="21"/>
      </svg>
    ),
  },
  {
    cls: 'c-streak',
    span: 2,
    iconGrad: 'linear-gradient(135deg,var(--ember),var(--gold))',
    glowColor: 'var(--ember)',
    title: 'Стріки',
    desc: 'Займайся щодня — серія днів мотивує сильніше за будь-якого репетитора. Пропустив — Бос радіє.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
    ),
  },
  {
    cls: 'c-char',
    span: 3,
    iconGrad: 'linear-gradient(135deg,var(--rose),#c75a8a)',
    glowColor: 'var(--rose)',
    title: 'Свій персонаж',
    desc: 'Прокачуй свого персонажа: нові скіни, капелюхи й аксесуари за кожного переможеного Боса.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/>
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
      </svg>
    ),
  },
  {
    cls: 'c-stats',
    span: 3,
    iconGrad: 'linear-gradient(135deg,var(--green),var(--leaf-deep))',
    glowColor: 'var(--green)',
    title: 'Аналітика',
    desc: 'Бачиш свій прогноз балу й слабкі теми наперед. Жодних сюрпризів на справжньому НМТ.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
]

export default function FeaturesSection() {
  const ref = useSectionTracking('features', 'features')

  return (
    <section
      id="features"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '70px 0' }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(16px,4vw,28px)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 30,
            fontWeight: 700, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--teal-deep)', background: 'rgba(31,158,146,.1)', border: '1.5px solid rgba(31,158,146,.3)',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, marginRight: -2 }}>
              <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/>
              <rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
            </svg>
            Можливості
          </span>
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(30px,5vw,52px)', lineHeight: 1.05, margin: '18px 0 12px' }}>
            Усе, щоб ти здав на <span style={{ color: '#c79a35' }}>200</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 'clamp(15px,1.8vw,18px)', maxWidth: 620, lineHeight: 1.6, margin: '0 auto' }}>
            Не просто тести. Ціла гра з прокачкою, суперництвом і розумним помічником.
          </p>
        </div>

        <div className="bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          gap: 16,
          marginTop: 36,
        }}>
          {cards.map((card) => (
            <div
              key={card.cls}
              className={`reveal bento-card bento-card-${card.span}`}
              style={{
                gridColumn: `span ${card.span}`,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 24,
                padding: 26,
                background: 'var(--glass)',
                border: '1.5px solid var(--glass-line)',
                boxShadow: 'var(--shadow)',
                transition: 'transform .3s,border-color .3s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--teal)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--glass-line)' }}
            >
              {/* Glow */}
              <div style={{
                position: 'absolute', width: 160, height: 160, borderRadius: '50%',
                filter: 'blur(50px)', opacity: .4, right: -30, top: -30, pointerEvents: 'none',
                background: card.glowColor,
                animation: card.glowAnim,
              }} />
              {/* Icon */}
              <div style={{
                width: 54, height: 54, borderRadius: 16, display: 'grid', placeItems: 'center',
                marginBottom: 16, color: '#fff', background: card.iconGrad,
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,.35),0 12px 24px -12px rgba(10,59,56,.55)',
              }}>
                <div style={{ animation: card.iconAnim }}>{card.icon}</div>
              </div>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, lineHeight: 1.55 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:820px){
          .bento-grid { grid-template-columns: repeat(2,1fr) !important; }
          .bento-card { grid-column: span 1 !important; }
          .bento-card-2 { grid-column: span 2 !important; }
        }
        @media(max-width:520px){
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-card,.bento-card-2,.bento-card-3 { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}
