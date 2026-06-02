'use client'

import React from 'react'
import { useSectionTracking } from '@/lib/useAmplitude'

const topics = [
  { name: 'Квадратні рівняння', pct: 34 },
  { name: 'Тригонометрія', pct: 67 },
  { name: 'Логарифми', pct: 45 },
  { name: 'Похідна функції', pct: 78 },
  { name: 'Геометрія (трикутники)', pct: 55 },
  { name: 'Системи рівнянь', pct: 89 },
]

function barColor(pct: number) {
  if (pct < 40) return 'var(--red)'
  if (pct < 60) return 'var(--ember)'
  if (pct < 75) return 'var(--gold)'
  return 'var(--green)'
}

export default function AISection() {
  const ref = useSectionTracking('ai-section', 'ai')

  return (
    <section
      id="ai"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '70px 0' }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(16px,4vw,28px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="ai-grid reveal">
          {/* Left */}
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 30,
              fontWeight: 700, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--teal-deep)', background: 'rgba(31,158,146,.1)', border: '1.5px solid rgba(31,158,146,.3)',
              marginBottom: 18,
            }}>
              AI
            </span>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', lineHeight: 1.1, marginBottom: 16, color: 'var(--ink)' }}>
              AI-репетитор, який бачить тебе наскрізь
            </h2>
            <p style={{ fontSize: 'clamp(14px,1.6vw,17px)', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 24 }}>
              Здай пробний тест. Отримай детальний розбір: де помилився, чому, і як виправити. Не загальні поради — конкретні теми для тебе.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Аналіз кожної відповіді', 'Рекомендовані теми для повторення', 'Прогноз балу на реальному НМТ', 'Персональний план підготовки'].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{
                    flexShrink: 0, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 2, background: 'rgba(31,158,146,.12)', border: '1.5px solid rgba(31,158,146,.3)',
                  }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Mock AI card */}
          <div style={{
            borderRadius: 24, overflow: 'hidden',
            background: 'var(--glass)', border: '1.5px solid var(--glass-line)',
            boxShadow: 'var(--shadow)',
          }}>
            {/* Header */}
            <div style={{
              padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1.5px solid var(--glass-line)', background: 'rgba(255,255,255,.5)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/>
                  <path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 700 }}>AI Аналіз результатів</span>
              </div>
              <span style={{
                fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 700,
                background: 'rgba(79,191,131,.16)', color: 'var(--leaf-deep)', border: '1.5px solid rgba(79,191,131,.4)',
              }}>Готово</span>
            </div>
            {/* Score */}
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid rgba(255,255,255,.4)' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 4 }}>Прогнозований бал</div>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 30, color: 'var(--ink)' }}>
                  156<span style={{ fontSize: 14, fontWeight: 400, marginLeft: 4, color: 'var(--ink-soft)' }}>/ 200</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 4 }}>Порівняно з минулим</div>
                <div style={{ fontWeight: 700, color: 'var(--green)' }}>+12 балів ↑</div>
              </div>
            </div>
            {/* Topics */}
            <div style={{ padding: '14px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 14 }}>
                Теми для опрацювання
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {topics.map(t => (
                  <div key={t.name}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{t.name}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: barColor(t.pct) }}>{t.pct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 6, overflow: 'hidden', background: 'rgba(15,59,57,.1)' }}>
                      <div style={{ height: '100%', borderRadius: 6, width: `${t.pct}%`, background: barColor(t.pct), transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Footer */}
            <div style={{ padding: '10px 20px', borderTop: '1.5px solid rgba(255,255,255,.4)', background: 'rgba(255,255,255,.3)' }}>
              <p style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>На основі 48 відповідей · Оновлено сьогодні</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.ai-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}
