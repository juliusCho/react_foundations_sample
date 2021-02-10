interface Props {
  day: number
  month: number
  year: number
  thisMonth?: boolean
  beforeOrAfter?: 'before' | 'after'
}

export default function CalendarSchedules({
  day,
  month,
  year,
  thisMonth = true,
  beforeOrAfter,
}: Props) {
  return <></>
}
