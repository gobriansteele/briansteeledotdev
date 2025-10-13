interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-background-tertiary text-foreground-secondary',
    primary: 'bg-accent-primary/20 text-accent-primary',
    secondary: 'bg-accent-secondary/20 text-accent-secondary',
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}
