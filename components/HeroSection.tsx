'use client'

import { useSectionTracking } from '@/lib/useAmplitude'
import { track } from '@/lib/amplitude'

export default function HeroSection() {
  const ref = useSectionTracking('hero', 'hero')

  const scrollToWaitlist = (location: string) => {
    track('cta_clicked', { location })
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToDemo = () => {
    const el = document.getElementById('demo')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLElement>}
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center mb-8">
          <span
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              backgroundColor: '#141420',
              border: '1px solid #252535',
              color: '#9090AA',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#22C55E' }}
            />
            Вейтліст відкрито · 847 вже зареєстровані
          </span>
        </div>

        {/* H1 */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          Готуйся до НМТ.
          <br />
          <span style={{ color: '#7B61FF' }}>Грай,</span> а не зубри.
        </h1>

        {/* Subtext */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#9090AA' }}
        >
          Інтерактивні пояснення, стріки, PvP з друзями та AI-аналіз твоїх слабких зон.
          Математика — це гра.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToWaitlist('hero_primary_cta')}
            className="w-full sm:w-auto text-base font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#7B61FF', color: '#fff' }}
          >
            Зайняти місце
          </button>
          <button
            onClick={scrollToDemo}
            className="w-full sm:w-auto text-base font-medium px-8 py-4 rounded-xl transition-all duration-200 hover:text-white"
            style={{ color: '#5A5A72' }}
          >
            Подивитися демо ↓
          </button>
        </div>

        {/* Stats Row */}
        <div
          className="mt-20 grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ border: '1px solid #252535', backgroundColor: '#252535' }}
        >
          {[
            { value: '4 500+', label: 'тем' },
            { value: '12', label: 'рівнів складності' },
            { value: 'AI', label: 'розбір помилок' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-6 px-4"
              style={{ backgroundColor: '#141420' }}
            >
              <span
                className="text-2xl sm:text-3xl font-black mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm" style={{ color: '#5A5A72' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
