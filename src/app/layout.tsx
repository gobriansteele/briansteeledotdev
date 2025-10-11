import './globals.css'
import { Inter } from 'next/font/google'

import { Header, ContentContainer, MainContainer } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brian Steele',
  description: 'Full stack web engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 leading-relaxed`}>
        <div className="relative">
          <MainContainer>
            <main className="flex min-h-screen flex-col items-start  px-8 gap-6 md:gap-12 md:flex-row">
              <Header />
              <ContentContainer>{children}</ContentContainer>
            </main>
          </MainContainer>
        </div>
      </body>
    </html>
  )
}
