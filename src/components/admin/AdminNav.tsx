'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/posts', label: 'Posts', exact: false },
  { href: '/admin/posts/new', label: 'New Post', exact: false },
  { href: '/admin/tags', label: 'Tags', exact: false },
  { href: '/admin/media', label: 'Media', exact: false },
]

export function AdminNav() {
  const pathname = usePathname()

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const active = isActive(item.href, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              active
                ? 'bg-slate-700 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
