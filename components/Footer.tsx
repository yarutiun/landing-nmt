export default function Footer() {
  return (
    <footer style={{
      padding: '30px 0 40px',
      textAlign: 'center',
      color: 'var(--ink-soft)',
      fontSize: 13.5,
      borderTop: '1.5px solid var(--glass-line)',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 18, color: 'var(--ink)', marginBottom: 6 }}>
        НМТ-GAME
      </div>
      <div>© 2026 НМТ-GAME — грай, а не зубри. Зроблено в Україні 🇺🇦</div>
    </footer>
  )
}
