import { Card } from './ui/Card'

const areas = [
  {
    title: 'AI Leadership',
    description: 'Leading research and development of AI solutions that transform educational technology.',
    icon: '🤖',
  },
  {
    title: 'Engineering Management',
    description: 'Building and mentoring high-performing engineering teams across the full stack.',
    icon: '👥',
  },
  {
    title: 'Full-Stack Development',
    description: 'Architecting and building scalable systems from native apps to backend services.',
    icon: '💻',
  },
  {
    title: 'Research & Innovation',
    description: 'Exploring cutting-edge technologies and translating research into production systems.',
    icon: '🔬',
  },
]

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-12">
      <div className="h-16 flex flex-col justify-center">
        <h2 className="uppercase font-bold tracking-widest text-lg">What I Do</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {areas.map((area) => (
          <Card key={area.title} hover>
            <div className="text-4xl mb-4">{area.icon}</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{area.title}</h3>
            <p className="text-foreground-secondary">{area.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
