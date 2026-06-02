import type { Metadata } from 'next'
import './globals.css'
import AmplitudeInit from '@/components/AmplitudeInit'

export const metadata: Metadata = {
  title: 'НМТ-GAME — Завали Боса. Здай НМТ.',
  description: 'Підготовка до НМТ у форматі гри. Битва з Босом, мемна перерва, AI-розбір. Грай, а не зубри.',
  keywords: ['НМТ', 'підготовка до НМТ', 'математика', 'гейміфікація', 'освіта', 'школярі'],
  openGraph: {
    title: 'НМТ-GAME — Завали Боса. Здай НМТ.',
    description: 'Підготовка до НМТ у форматі гри. Битва з Босом, мемна перерва, AI-розбір. Грай, а не зубри.',
    type: 'website',
    locale: 'uk_UA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'НМТ-GAME — Завали Боса. Здай НМТ.',
    description: 'Підготовка до НМТ у форматі гри. Битва з Босом, мемна перерва, AI-розбір.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Comfortaa:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AmplitudeInit />
        {children}
      </body>
    </html>
  )
}
