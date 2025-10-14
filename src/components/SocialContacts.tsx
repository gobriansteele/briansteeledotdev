import { Github, Linkedin, Mail } from 'lucide-react'

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/gobriansteele',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gobriansteele/',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:hello@briansteele.dev',
    icon: Mail,
  },
]

export function SocialContacts() {
  return (
    <nav className="flex items-center gap-6">
      {socials.map((social) => {
        const Icon = social.icon
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-secondary hover:text-accent-primary transition-colors"
            aria-label={social.name}
          >
            <Icon size={24} />
          </a>
        )
      })}
    </nav>
  )
}
