import { GitHubIcon } from './GitHubIcon'
import { LinkedInIcon } from './LinkedInIcon'
import { EmailIcon } from './EmailIcon'

const socialComponents = [
  {
    name: 'GitHub',
    link: 'https://github.com/gobriansteele',
    Icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/gobriansteele/',
    Icon: LinkedInIcon,
  },
  {
    name: 'Email',
    link: 'mailto:hello@briansteele.dev',
    Icon: EmailIcon,
  },
]

export function SocialContacts() {
  return (
    <ul className="flex gap-4">
      {socialComponents.map(({ name, Icon, link }) => {
        return (
          <li key={name}>
            <a href={link}>
              <Icon />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
