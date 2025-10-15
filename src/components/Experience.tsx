import { experience } from '@/data'
import { ExperienceCard } from './ExperienceCard'

export function Experience() {
  return (
    <section id="experience">
      <h2 className="section-heading">💼 Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
        {experience.map((ex, idx) => {
          return <ExperienceCard {...ex} key={`${ex.company}-${idx}`} />
        })}
      </div>
    </section>
  )
}
