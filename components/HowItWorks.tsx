'use client'

import React from 'react'
import { useSectionTracking } from '@/lib/useAmplitude'

const steps = [
  {
    num: '01',
    emoji: '📋',
    title: 'Реєструйся',
    desc: 'Залиш контакт у вейтліст — отримаєш ранній доступ і ексклюзивний скін для котика.',
  },
  {
    num: '02',
    emoji: '⚔️',
    title: 'Вчись граючи',
    desc: 'Щоденні битви з Босом, стріки, PvP з однокласниками. Не зубри — грай і запам\'ятовуй.',
  },
  {
    num: '03',
    emoji: '🏆',
    title: 'Здай НМТ',
    desc: 'Пробний тест + AI-аналіз слабких місць. Прийдеш на екзамен підготованим, без паніки.',
  },
]

export default function HowItWorks() {
  const ref = useSectionTracking('how-it-works', 'demo')

  return (
    <section
      id="how"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '70px 0' }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(16px,4vw,28px)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 30,
            fontWeight: 700, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--teal-deep)', background: 'rgba(31,158,146,.1)', border: '1.5px solid rgba(31,158,146,.3)',
          }}>
            Як це працює
          </span>
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(30px,5vw,52px)', lineHeight: 1.05, margin: '18px 0 12px' }}>
            Три кроки до <span style={{ color: 'var(--teal-deep)' }}>200 балів</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="reveal how-grid">
          {steps.map((step, i) => (
            <div key={i} style={{
              position: 'relative',
              borderRadius: 24,
              padding: '28px 26px',
              background: 'var(--glass)',
              border: '1.5px solid var(--glass-line)',
              boxShadow: 'var(--shadow)',
              transition: 'transform .3s,border-color .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--teal)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--glass-line)' }}
            >
              <div style={{
                fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 48,
                color: 'rgba(15,92,84,.12)', marginBottom: 12, lineHeight: 1,
              }}>{step.num}</div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{step.emoji}</div>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, lineHeight: 1.55 }}>{step.desc}</p>
              {i < steps.length - 1 && (
                <div style={{
                  display: 'none',
                  position: 'absolute', top: '50%', right: -24, transform: 'translateY(-50%)',
                  fontSize: 20, color: 'var(--teal)', zIndex: 2,
                }} className="step-arrow">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:700px){.how-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}
