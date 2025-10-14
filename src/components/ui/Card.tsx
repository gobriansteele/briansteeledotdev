interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-background-secondary
        rounded-lg
        p-6
        border
        border-border
        ${hover ? 'transition-all duration-200 hover:border-accent-primary hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
