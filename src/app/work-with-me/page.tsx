'use client'

import { Header, WorkTogether, ContentContainer } from '@/components'
import { useMouseHighlight } from '@/hooks'

export default function Page() {
  const styleObj = useMouseHighlight()
  return (
    <div className="relative">
      <div
        style={styleObj}
        className="pointer-events-none  inset-0 z-30 transition duration-300 lg:absolute"
      />
      <main className="flex min-h-screen flex-col items-start  px-8 py-8 md:p-24 gap-12 md:flex-row">
        <Header />
        <ContentContainer>
          <WorkTogether />
        </ContentContainer>
      </main>
    </div>
  )
}
