interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors'

  const variants = {
    primary: 'bg-accent-primary text-white hover:bg-accent-hover',
    secondary: 'bg-background-tertiary text-foreground hover:bg-slate-600',
    ghost: 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
