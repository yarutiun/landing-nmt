'use client'

import { useSectionTracking } from '@/lib/useAmplitude'

const features = [
  {
    icon: '🔥',
    title: 'Стріки',
    description: 'Займайся щодня. Стрік мотивує більше, ніж будь-який репетитор.',
  },
  {
    icon: '🏆',
    title: 'Досягнення',
    description: 'Розблокуй нагороди за прогрес. Нові задачі — нові трофеї.',
  },
  {
    icon: '⚔️',
    title: 'PvP з друзями',
    description: 'Кинь виклик однокласнику. Хто знає краще — той і переміг.',
  },
  {
    icon: '🎮',
    title: 'Персонаж',
    description: 'Кастомізуй свого героя. Прокачуй його разом з знаннями.',
  },
  {
    icon: '🤖',
    title: 'AI-розбір',
    description: 'Здай пробний НМТ. AI покаже слабкі зони та закріпить їх.',
  },
  {
    icon: '📊',
    title: 'Аналітика прогресу',
    description: 'Бачиш, що вивчив, що ні. Без сюрпризів на екзамені.',
  },
]

export default function FeaturesSection() {
  const ref = useSectionTracking('features', 'features')

  return (
    <section
      id="features"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ borderTop: '1px solid #1E1E2E' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded"
            style={{ color: '#FF7849', backgroundColor: 'rgba(255,120,73,0.08)', border: '1px solid rgba(255,120,73,0.2)' }}
          >
            Можливості
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black"
            style={{ letterSpacing: '-0.02em' }}
          >
            Все, щоб ти здав НМТ
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-xl p-6 transition-all duration-200 hover:translate-y-[-2px]"
              style={{
                backgroundColor: '#141420',
                border: '1px solid #252535',
              }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3
                className="text-base font-bold mb-2"
                style={{ letterSpacing: '-0.01em' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9090AA' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
