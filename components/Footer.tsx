export default function Footer() {
  return (
    <footer
      className="py-8 px-4 sm:px-6 lg:px-8"
      style={{ borderTop: '1px solid #1E1E2E' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <span
          className="text-lg font-black tracking-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          NMT <span style={{ color: '#7B61FF' }}>GAME</span>
        </span>

        {/* Copyright */}
        <p className="text-sm" style={{ color: '#5A5A72' }}>
          © 2025 NMT GAME. Зроблено в Україні 🇺🇦
        </p>
      </div>
    </footer>
  )
}
