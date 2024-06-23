'use client'
import { useMouseHighlight } from '@/hooks'

type Props = {
  children: React.ReactNode
}

export const MainContainer = ({ children }: Props) => {
  const styleObj = useMouseHighlight()
  return (
    <div
      style={styleObj}
      className="pointer-events-none  inset-0 z-30 transition duration-300 lg:absolute"
    >
      {children}
    </div>
  )
}
