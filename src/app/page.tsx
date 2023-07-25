'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components'
import { ContentContainer } from '@/components/ContentContainer'

export default function Home() {
  const [mousePosition, setMousePosition] = useState<[number, number] | null>(
    null
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const pos = [e.clientX, e.clientY + window.scrollY] as [number, number]
      setMousePosition(pos)
    }

    window.addEventListener('mousemove', handler)

    return () => {
      window.removeEventListener('mousemove', handler)
    }
  }, [])

  const styleObj = {
    background: `radial-gradient(600px at ${mousePosition?.[0]}px ${mousePosition?.[1]}px, rgba(216, 211, 219, 0.15), transparent 80%)`,
  }

  return (
    <div className="relative">
      <div
        style={styleObj}
        className="pointer-events-none  inset-0 z-30 transition duration-300 lg:absolute"
      />
      <main className="flex min-h-screen flex-col items-start  px-8 py-8 md:p-24 gap-12 md:flex-row">
        <Header />
        <ContentContainer />
      </main>
    </div>
  )
}
