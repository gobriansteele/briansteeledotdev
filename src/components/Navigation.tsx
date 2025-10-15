import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
]

export function Navigation() {
  return (
    <nav className="mb-8">
      <ul className="flex justify-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-foreground-secondary hover:text-accent-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
