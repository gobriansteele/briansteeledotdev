import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'Brian Steele - Head of AI at Honor Education',
    template: '%s | Brian Steele',
  },
  description: 'Head of AI at Honor Education. Writing about AI, leadership, and software engineering.',
  keywords: ['AI', 'Leadership', 'Software Engineering', 'Full Stack', 'Machine Learning'],
  authors: [{ name: 'Brian Steele' }],
  creator: 'Brian Steele',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://briansteele.dev',
    siteName: 'Brian Steele',
    title: 'Brian Steele - Head of AI at Honor Education',
    description: 'Head of AI at Honor Education. Writing about AI, leadership, and software engineering.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brian Steele',
    description: 'Head of AI at Honor Education',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
