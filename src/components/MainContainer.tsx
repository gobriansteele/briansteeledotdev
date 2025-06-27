'use client'
import { useMouseHighlight } from '@/hooks'

type Props = {
  children: React.ReactNode
}

export const MainContainer = ({ children }: Props) => {
  const styleObj = useMouseHighlight()
  return (
    <div className="inset-0 z-30 transition duration-300" style={styleObj}>
      {children}
    </div>
  )
}
