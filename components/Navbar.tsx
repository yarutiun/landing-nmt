'use client'

import { track } from '@/lib/amplitude'

export default function Navbar() {
  const handleCTAClick = () => {
    track('cta_clicked', { location: 'navbar' })
    const el = document.getElementById('join')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 8000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px clamp(16px,4vw,46px)',
        gap: 14,
        background: 'linear-gradient(180deg,rgba(246,252,255,.82),rgba(246,252,255,0))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 22, letterSpacing: '.4px' }}>
        <span
          style={{
            width: 40, height: 40, borderRadius: 13,
            display: 'grid', placeItems: 'center', fontSize: 22,
            background: 'linear-gradient(135deg,var(--teal),var(--leaf-deep))',
            boxShadow: '0 10px 22px -8px rgba(51,214,194,.8),inset 0 2px 0 rgba(255,255,255,.3)',
            animation: 'bob 3s ease-in-out infinite',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ width: 23, height: 23 }}>
            <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/>
            <path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17z"/>
          </svg>
        </span>
        <span>
          НМТ<b style={{ background: 'linear-gradient(90deg,var(--teal-bright),var(--gold))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>-GAME</b>
        </span>
      </div>

      {/* Links */}
      <div className="nav-links-desktop" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {[
          { label: 'Дуель', id: 'game' },
          { label: 'Можливості', id: 'features' },
          { label: 'Реєстрація', id: 'join' },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              padding: '9px 15px',
              borderRadius: 30,
              fontWeight: 600,
              fontSize: 14,
              color: 'var(--ink-soft)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: '.2s',
              fontFamily: 'var(--fu)',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--ink)'; (e.target as HTMLElement).style.background = 'rgba(120,210,200,.12)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--ink-soft)'; (e.target as HTMLElement).style.background = 'none' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleCTAClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 22px',
          borderRadius: 40,
          fontWeight: 700,
          fontSize: 15,
          color: '#06241f',
          background: 'linear-gradient(135deg,var(--teal-bright),var(--green))',
          boxShadow: '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--fu)',
          transition: 'transform .2s,box-shadow .2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 38px -10px rgba(84,224,160,.85)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.05em', height: '1.05em' }}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
        </svg>
        Зареєструватися
      </button>

      <style>{`
        @media(max-width:780px){.nav-links-desktop{display:none!important}}
      `}</style>
    </nav>
  )
}
