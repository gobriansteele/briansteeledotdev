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
    <div className="flex max-w-lg h-80  hover:bg-santa-gray/10 duration-500 transition-colors p-4 rounded-md cursor-pointer">
      <div className="w-1/3 capitalize">{`${startDate}-${endDate}`}</div>
      <div></div>
    </div>
  )
}
