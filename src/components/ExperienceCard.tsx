type Props = {
  startDate: string
  endDate: string
  company: string
  role: string
  tags: readonly string[]
}

export function ExperienceCard({
  startDate,
  endDate,
  company,
  role,
  tags,
}: Props) {
  return (
    <div className="flex gap-6 max-w-lg h-80  hover:bg-santa-gray/10 duration-500 transition-colors p-4 rounded-md cursor-pointer">
      <div className="w-1/4">
        <p className="uppercase text-sm font-semibold text-end">{`${startDate}-${endDate}`}</p>
      </div>
      <div className="w-3/4">
        <h3 className="text-lg font-semibold">
          <span className="text-santa-red">{role}</span>
          {` - ${company}`}
        </h3>
        <p className="font-small">
          A whole bunch of stuff about what I do in this role. Focus on outcomes
          and all the ways I make the company better
        </p>
      </div>
    </div>
  )
}
