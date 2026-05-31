const steps = [
  {
    number: '01',
    title: 'Реєструйся',
    description:
      'Залиш свій контакт у вейтліст. Отримаєш сповіщення як тільки відкриємо доступ.',
  },
  {
    number: '02',
    title: 'Вчись граючи',
    description:
      'Інтерактивні теми, щоденні завдання, стріки та PvP з однокласниками. Не зубрій — грай.',
  },
  {
    number: '03',
    title: 'Здай НМТ',
    description:
      'Пробний тест + AI-аналіз слабких місць. Прийдеш на екзамен підготованим, без паніки.',
  },
]

export default function HowItWorks() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ borderTop: '1px solid #1E1E2E' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded"
            style={{ color: '#7B61FF', backgroundColor: 'rgba(123,97,255,0.1)', border: '1px solid rgba(123,97,255,0.25)' }}
          >
            Процес
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black"
            style={{ letterSpacing: '-0.02em' }}
          >
            Як це працює
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-full w-full h-px -translate-y-0 z-0"
                  style={{
                    background: 'linear-gradient(to right, #252535, transparent)',
                    width: '100%',
                    left: 'calc(100% - 24px)',
                  }}
                />
              )}

              <div
                className="relative rounded-xl p-6 h-full"
                style={{
                  backgroundColor: '#141420',
                  border: '1px solid #252535',
                }}
              >
                {/* Number */}
                <span
                  className="block text-4xl font-black mb-4"
                  style={{ color: '#252535', letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9090AA' }}>
                  {step.description}
                </p>

                {/* Arrow for mobile */}
                {i < steps.length - 1 && (
                  <div
                    className="md:hidden mt-4 text-center text-lg"
                    style={{ color: '#252535' }}
                  >
                    ↓
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
