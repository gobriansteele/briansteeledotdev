import { useState, useEffect } from 'react'

export function useMouseHighlight() {
  const [mousePosition, setMousePosition] = useState<[number, number] | null>(
    null
  )
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const pos = [e.clientX, e.clientY + window.scrollY] satisfies [
        number,
        number
      ]
      setMousePosition(pos)
    }

    window.addEventListener('mousemove', handler)

    return () => {
      window.removeEventListener('mousemove', handler)
    }
  }, [])

  return {
    background: `radial-gradient(600px at ${mousePosition?.[0]}px ${mousePosition?.[1]}px, rgba(216, 211, 219, 0.15), transparent 80%)`,
  }
}
