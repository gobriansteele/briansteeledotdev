import { Avatar } from './Avatar'
import { SocialContacts } from './SocialContacts'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="text-center">
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <Avatar />
      </div>

      {/* Name and Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        Brian Steele
      </h1>
      <h2 className="text-xl md:text-2xl text-foreground-secondary mb-6">
        Head of AI at Honor Education
      </h2>

      {/* Social Links - Horizontal */}
      <div className="flex justify-center mb-6">
        <SocialContacts />
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  )
}
