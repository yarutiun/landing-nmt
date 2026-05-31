import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'NMT GAME — Готуйся до НМТ. Грай, а не зубри.',
  description:
    'Інтерактивна платформа для підготовки до НМТ. Стріки, PvP, AI-аналіз слабких зон. Математика — це гра.',
  keywords: ['НМТ', 'підготовка до НМТ', 'математика', 'гейміфікація', 'освіта', 'школярі'],
  openGraph: {
    title: 'NMT GAME — Готуйся до НМТ. Грай, а не зубри.',
    description:
      'Інтерактивна платформа для підготовки до НМТ. Стріки, PvP, AI-аналіз слабких зон.',
    type: 'website',
    locale: 'uk_UA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NMT GAME — Готуйся до НМТ. Грай, а не зубри.',
    description:
      'Інтерактивна платформа для підготовки до НМТ. Стріки, PvP, AI-аналіз слабких зон.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={inter.variable}>
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  )
}
