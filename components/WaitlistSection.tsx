'use client'

import React, { useState } from 'react'
import { useSectionTracking } from '@/lib/useAmplitude'
import { track, flush, identifyUser, setUserProperties } from '@/lib/amplitude'

export default function WaitlistSection() {
  const ref = useSectionTracking('waitlist', 'waitlist')
  const [value, setValue] = useState('')
  const [toast, setToast] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toastMsg = (m: string) => {
    setToast(m)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = value.trim()
    if (!v) { toastMsg('Введи пошту або телеграм'); return }
    const position = Math.floor(Math.random() * 100) + 800
    identifyUser(v)
    setUserProperties({ waitlist_contact: v, waitlist_position: position })
    track('waitlist_submitted', { contact: v, position })
    flush()
    setValue('')
    setSubmitted(true)
    toastMsg('Готово! Ти в списку перших. Скін для котика чекає')
  }

  return (
    <section
      id="join"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '70px 0 90px' }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(16px,4vw,28px)', position: 'relative', zIndex: 1 }}>
        <div
          className="reveal"
          style={{
            position: 'relative', overflow: 'hidden', borderRadius: 34,
            padding: 'clamp(34px,5vw,64px)', textAlign: 'center',
            background: 'radial-gradient(700px 360px at 50% -20%,rgba(255,236,180,.7),transparent 60%),radial-gradient(600px 320px at 50% 130%,rgba(79,191,131,.22),transparent 60%),linear-gradient(160deg,#eafbf2,#d9f4ea)',
            border: '2px solid var(--glass-line)', boxShadow: 'var(--shadow)',
          }}
        >
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 900, fontSize: 'clamp(30px,5vw,50px)', lineHeight: 1.05, marginBottom: 14, color: 'var(--teal-deep)' }}>
            Займи місце<br />у перших рядах проекту
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Платформа в розробці. Залиш контакт — і отримай ранній доступ та ексклюзивний скін для котика.
          </p>

          {submitted ? (
            <div style={{ display: 'inline-block', padding: '20px 32px', borderRadius: 20, background: 'var(--glass)', border: '1.5px solid var(--glass-line)' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 20, color: 'var(--teal-deep)', marginBottom: 6 }}>Вітаємо!</div>
              <div style={{ color: 'var(--ink-soft)', fontSize: 14 }}>Ти в списку перших. Очікуй пінг!</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="твоя пошта або @telegram"
                style={{
                  flex: 1, minWidth: 200, padding: '15px 20px', borderRadius: 40,
                  fontFamily: 'var(--fu)', fontSize: 15, color: 'var(--ink)',
                  background: 'rgba(255,255,255,.75)', border: '1.5px solid var(--glass-line)',
                  boxShadow: 'inset 0 2px 6px rgba(10,59,56,.06)', outline: 'none',
                  transition: '.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--teal)'; e.target.style.background = '#fff' }}
                onBlur={e => { e.target.style.borderColor = 'var(--glass-line)'; e.target.style.background = 'rgba(255,255,255,.75)' }}
              />
              <button
                type="submit"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px', borderRadius: 40, fontWeight: 700, fontSize: 15,
                  color: '#06241f', background: 'linear-gradient(135deg,var(--teal-bright),var(--green))',
                  boxShadow: '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)',
                  border: 'none', cursor: 'pointer', fontFamily: 'var(--fu)',
                  transition: 'transform .2s,box-shadow .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 38px -10px rgba(84,224,160,.85)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 14px 30px -10px rgba(84,224,160,.7),inset 0 2px 0 rgba(255,255,255,.4)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.05em', height: '1.05em' }}>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
                Зайняти місце
              </button>
            </form>
          )}

          <div style={{ marginTop: 14, fontSize: 12.5, color: 'var(--ink-soft)' }}>Без спаму. Тільки пінг, коли відкриємо доступ.</div>
        </div>
      </div>

      {/* Toast */}
      <div style={{
        position: 'fixed', left: '50%', bottom: 26,
        transform: showToast ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(24px)',
        zIndex: 9001, opacity: showToast ? 1 : 0, pointerEvents: 'none',
        padding: '14px 26px', borderRadius: 40, fontWeight: 700, color: '#06241f',
        background: 'linear-gradient(135deg,var(--green),var(--teal-bright))',
        boxShadow: '0 16px 30px -12px rgba(84,224,160,.7)',
        transition: '.4s', whiteSpace: 'nowrap',
      }}>
        {toast}
      </div>
    </section>
  )
}
