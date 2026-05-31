'use client'

import { useSectionTracking } from '@/lib/useAmplitude'

const topics = [
  { name: 'Квадратні рівняння', pct: 34, color: '#EF4444' },
  { name: 'Тригонометрія', pct: 67, color: '#F97316' },
  { name: 'Логарифми', pct: 45, color: '#EAB308' },
  { name: 'Похідна функції', pct: 78, color: '#22C55E' },
  { name: 'Геометрія (трикутники)', pct: 55, color: '#F97316' },
  { name: 'Системи рівнянь', pct: 89, color: '#22C55E' },
]

function getBarColor(pct: number): string {
  if (pct < 40) return '#EF4444'
  if (pct < 60) return '#F97316'
  if (pct < 75) return '#EAB308'
  return '#22C55E'
}

export default function AISection() {
  const ref = useSectionTracking('ai-section', 'ai')

  return (
    <section
      id="ai"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ borderTop: '1px solid #1E1E2E' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded"
              style={{ color: '#00D4AA', backgroundColor: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)' }}
            >
              AI
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-4xl font-black mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              AI-репетитор, який бачить тебе наскрізь
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: '#9090AA' }}>
              Здай пробний тест. Отримай детальний розбір: де помилився, чому, і як виправити.
              Не загальні поради — конкретні теми для тебе.
            </p>

            <ul className="space-y-3">
              {[
                'Аналіз кожної відповіді',
                'Рекомендовані теми для повторення',
                'Прогноз балу на реальному НМТ',
                'Персональний план підготовки',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.25)' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm" style={{ color: '#9090AA' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Mock AI Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #252535', backgroundColor: '#141420' }}
          >
            {/* Card Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid #252535' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🤖</span>
                <span className="text-sm font-semibold">AI Аналіз результатів</span>
              </div>
              <span
                className="text-xs px-2 py-1 rounded font-medium"
                style={{ backgroundColor: 'rgba(74,222,128,0.1)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.2)' }}
              >
                Готово
              </span>
            </div>

            {/* Score */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid #1E1E2E' }}
            >
              <div>
                <div className="text-xs mb-1" style={{ color: '#5A5A72' }}>
                  Прогнозований бал
                </div>
                <div className="text-3xl font-black" style={{ letterSpacing: '-0.03em' }}>
                  156
                  <span className="text-sm font-normal ml-1" style={{ color: '#5A5A72' }}>
                    / 200
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs mb-1" style={{ color: '#5A5A72' }}>
                  Порівняно з минулим
                </div>
                <div className="text-base font-bold" style={{ color: '#4ADE80' }}>
                  +12 балів ↑
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="px-5 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: '#5A5A72' }}>
                Теми для опрацювання
              </div>
              <div className="space-y-3">
                {topics.map((topic, i) => {
                  const barColor = getBarColor(topic.pct)
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs" style={{ color: '#9090AA' }}>
                          {topic.name}
                        </span>
                        <span
                          className="text-xs font-bold tabular-nums"
                          style={{ color: barColor }}
                        >
                          {topic.pct}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: '#1E1E2E' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${topic.pct}%`,
                            backgroundColor: barColor,
                            transition: 'width 1s ease',
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer note */}
            <div
              className="px-5 py-3"
              style={{ borderTop: '1px solid #1E1E2E', backgroundColor: '#0A0A14' }}
            >
              <p className="text-xs" style={{ color: '#5A5A72' }}>
                На основі 48 відповідей · Оновлено сьогодні
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
