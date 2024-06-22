'use client'

import { Header, About, Experience, ContentContainer } from '@/components'
import { useMouseHighlight } from '@/hooks'

export default function Home() {
  const styleObj = useMouseHighlight()

  return (
    <div className="relative">
      <div
        style={styleObj}
        className="pointer-events-none  inset-0 z-30 transition duration-300 lg:absolute"
      />
      <main className="flex min-h-screen flex-col items-start  px-8 gap-6 md:gap-12 md:flex-row">
        <Header />
        <ContentContainer>
          <>
            <About />
            <Experience />
          </>
        </ContentContainer>
      </main>
    </div>
  )
}
