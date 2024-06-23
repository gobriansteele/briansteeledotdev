'use client'

import { useEffect } from 'react'
import { useInView, useAnimate, type AnimationSequence } from 'framer-motion'

type Props = {
  startDate: string
  endDate: string
  company: string
  role: string
  tags: readonly string[]
  description?: string
}

export function ExperienceCard({
  startDate,
  endDate,
  company,
  role,
  tags,

  description,
}: Props) {
  const [scope, animate] = useAnimate()

  const isInView = useInView(scope, {
    once: true,
    amount: 0.7,
  })

  useEffect(() => {
    const animation: AnimationSequence = isInView
      ? [
          ['div', { opacity: [1] }, { duration: 0.3, delay: 0.2 }],
          ['.tags', { filter: ['blur(12px)', 'blur(0px)'] }, { duration: 0.3 }],
        ]
      : [
          ['div', { opacity: [0] }, { duration: 0.3, delay: 0.2 }],
          ['.tags', { filter: ['blur(0px)', 'blur(12px)'] }, { duration: 0.3 }],
        ]

    animate(animation)
  }, [isInView, animate])

  return (
    <div
      ref={scope}
      className="flex flex-col md:flex gap-6 max-w-xl  hover:bg-santa-gray/10 duration-500 transition-colors md:p-4 rounded-md cursor-pointer"
    >
      <div className="w-full md:w-1/4">
        <p className="uppercase text-sm font-semibold">{`${startDate}-${endDate}`}</p>
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <h3 className="text-lg/[150%] font-semibold">
          <span className="text-santa-red">{role}</span>
          {` - ${company}`}
        </h3>
        <p className="font-small">{description}</p>
        <div className="flex gap-4 flex-wrap mt-3">
          {tags.map((t, idx) => {
            return (
              <span
                className="px-2 py-1 bg-santa-juniper rounded-full text-santa-plum text-sm tags"
                key={`${t}-${idx}`}
              >
                {t}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
