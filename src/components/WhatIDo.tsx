import { Card } from './ui/Card'

const areas = [
  {
    title: 'AI Leadership',
    description:
      'Leading research and development of AI solutions that transform educational technology.',
    icon: '🤖',
  },
  {
    title: 'Full-Stack Development',
    description:
      'Architecting and building scalable systems from native apps to backend services.',
    icon: '💻',
  },
  {
    title: 'Research & Innovation',
    description:
      'Exploring cutting-edge technologies and translating research into production systems.',
    icon: '🔬',
  },
  {
    title: 'Ride My Bike',
    description:
      "Gotta ride my bike. It's good for my health (and all my relationships).",
    icon: '🚴',
  },
]

export function WhatIDo() {
  return (
    <section id="what-i-do">
      <h2 className="section-heading">💼 What I Do</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {areas.map((area) => (
          <Card key={area.title} hover>
            <div className="text-4xl mb-4">{area.icon}</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {area.title}
            </h3>
            <p className="text-foreground-secondary">{area.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
