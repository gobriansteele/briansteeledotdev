interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-background-tertiary text-foreground-secondary border border-border',
    primary: 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20',
    secondary: 'bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20',
  }

  return (
    <span
      className={`
        inline-block
        px-3
        py-1
        text-xs
        font-medium
        rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
