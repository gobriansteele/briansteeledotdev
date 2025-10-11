import './globals.css'
import { Inter } from 'next/font/google'
import { Header, ContentContainer, MainContainer } from '@/components'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} bg-background leading-relaxed`}>
        <div className="relative">
          <MainContainer>
            <main className="flex min-h-screen flex-col items-start px-8 gap-6 md:gap-12 md:flex-row">
              <Header />
              <ContentContainer>{children}</ContentContainer>
            </main>
          </MainContainer>
        </div>
      </body>
    </html>
  )
}
