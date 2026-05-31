'use client'

import { track } from '@/lib/amplitude'

export default function Navbar() {
  const handleCTAClick = () => {
    track('cta_clicked', { location: 'navbar' })
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(12,12,16,0.88)',
        borderBottom: '1px solid #1E1E2E',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className="text-xl font-black tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              NMT{' '}
              <span style={{ color: '#7B61FF' }}>GAME</span>
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={handleCTAClick}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: '#7B61FF',
              color: '#fff',
            }}
          >
            Отримати доступ
          </button>
        </div>
      </div>
    </header>
  )
}
