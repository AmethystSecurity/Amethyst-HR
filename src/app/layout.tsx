import type { Metadata } from 'next'
import { Sora, DM_Sans, JetBrains_Mono } from 'next/font/google'
import Providers from '@/components/providers'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Amethyst HR - Management System',
  description: 'Elegant, futuristic HR management system with premium dark theme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body bg-bg-primary text-text-primary antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}