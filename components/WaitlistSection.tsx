'use client'

import { useState } from 'react'
import { useSectionTracking } from '@/lib/useAmplitude'
import { track, flush } from '@/lib/amplitude'

type Tab = 'email' | 'telegram' | 'phone'

const tabConfig: Record<Tab, { label: string; placeholder: string }> = {
  email: {
    label: 'Email',
    placeholder: 'твій@email.com',
  },
  telegram: {
    label: 'Telegram',
    placeholder: '@username',
  },
  phone: {
    label: 'Телефон',
    placeholder: '+380 XX XXX XX XX',
  },
}

function validateInput(tab: Tab, value: string): boolean {
  const v = value.trim()
  if (!v) return false

  if (tab === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }
  if (tab === 'telegram') {
    return v.startsWith('@') && v.length >= 2
  }
  if (tab === 'phone') {
    return /^\+?[\d\s\-()]{7,}$/.test(v)
  }
  return false
}

export default function WaitlistSection() {
  const ref = useSectionTracking('waitlist', 'waitlist')

  const [activeTab, setActiveTab] = useState<Tab>('email')
  const [inputValue, setInputValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [queueNumber, setQueueNumber] = useState(0)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setInputValue('')
    setError('')
    track('waitlist_tab_changed', { tab })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateInput(activeTab, inputValue)) {
      if (activeTab === 'email') setError('Введи дійсний email')
      else if (activeTab === 'telegram') setError('Telegram має починатися з @')
      else setError('Введи дійсний номер телефону')
      return
    }

    setIsLoading(true)

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 800))

    const position = Math.floor(Math.random() * 100) + 800
    setQueueNumber(position)
    setSubmitted(true)
    setIsLoading(false)

    track('waitlist_submitted', {
      input_type: activeTab,
      position,
    })
    flush()
  }

  return (
    <section
      id="waitlist"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ borderTop: '1px solid #1E1E2E' }}
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Header */}
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded"
          style={{ color: '#7B61FF', backgroundColor: 'rgba(123,97,255,0.1)', border: '1px solid rgba(123,97,255,0.25)' }}
        >
          Вейтліст
        </span>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          Отримай доступ першим
        </h2>
        <p className="text-base sm:text-lg mb-10" style={{ color: '#9090AA' }}>
          Платформа в розробці. Займи місце зараз — і отримай ранній доступ + бонуси.
        </p>

        {submitted ? (
          /* Success State */
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: '#141420', border: '1px solid #252535' }}
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-black mb-2" style={{ letterSpacing: '-0.02em' }}>
              Вітаємо!
            </h3>
            <p className="text-base mb-4" style={{ color: '#9090AA' }}>
              Ти{' '}
              <span
                className="font-black text-2xl tabular-nums"
                style={{ color: '#7B61FF' }}
              >
                #{queueNumber}
              </span>{' '}
              в черзі
            </p>
            <p className="text-sm" style={{ color: '#5A5A72' }}>
              Ми повідомимо тебе, як тільки відкриємо доступ.
            </p>
          </div>
        ) : (
          /* Form */
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #252535', backgroundColor: '#141420' }}
          >
            {/* Tabs */}
            <div
              className="flex"
              style={{ borderBottom: '1px solid #252535' }}
            >
              {(Object.keys(tabConfig) as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className="flex-1 py-3 text-sm font-medium transition-all duration-200"
                  style={{
                    color: activeTab === tab ? '#FFFFFF' : '#5A5A72',
                    backgroundColor: activeTab === tab ? '#1A1A28' : 'transparent',
                    borderBottom: activeTab === tab ? '2px solid #7B61FF' : '2px solid transparent',
                  }}
                >
                  {tabConfig[tab].label}
                </button>
              ))}
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <input
                  type={activeTab === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setError('')
                  }}
                  placeholder={tabConfig[activeTab].placeholder}
                  className="w-full text-sm px-4 py-3 rounded-lg outline-none transition-all duration-200 placeholder-gray-600"
                  style={{
                    backgroundColor: '#0C0C10',
                    border: error ? '1px solid #EF4444' : '1px solid #252535',
                    color: '#FFFFFF',
                  }}
                  autoComplete="off"
                  spellCheck={false}
                />
                {error && (
                  <p className="mt-2 text-xs text-left" style={{ color: '#EF4444' }}>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-sm font-bold rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#7B61FF', color: '#FFFFFF' }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Зберігаємо...
                  </span>
                ) : (
                  'Зайняти місце'
                )}
              </button>

              <p className="mt-4 text-xs" style={{ color: '#5A5A72' }}>
                Ми не надсилаємо спам. Тільки повідомлення про запуск.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
