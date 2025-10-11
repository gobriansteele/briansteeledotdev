interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    primary: 'bg-blue-900 text-blue-300',
    secondary: 'bg-purple-900 text-purple-300',
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}
