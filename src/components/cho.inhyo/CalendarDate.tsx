import React from 'react'
import Box from '../../foundations/cho.inhyo/Box'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarDateStyle from '../../styles/cho.inhyo/components/CalendarDateStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'

interface Props {
  day: number
  month: number
  year: number
  weekend?: boolean
  holiday?: boolean
  thisMonth?: boolean
  beforeOrAfter?: 'before' | 'after'
  onClick: (date: Date) => void
  _date: React.RefObject<HTMLDivElement> | null
}

export default function CalendarDate({
  day,
  month,
  year,
  weekend,
  holiday,
  thisMonth = true,
  beforeOrAfter,
  onClick,
  _date,
}: Props) {
  const [actualYear, setActualYear] = React.useState(year)
  const [actualMonth, setActualMonth] = React.useState(month)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    setActualYear(() =>
      beforeOrAfter
        ? beforeOrAfter === 'before'
          ? !thisMonth
            ? month === 0
              ? year - 1
              : year
            : year
          : !thisMonth
          ? month === 11
            ? year + 1
            : year
          : year
        : year,
    )
    setActualMonth(() =>
      beforeOrAfter
        ? beforeOrAfter === 'before'
          ? !thisMonth
            ? month === 0
              ? 11
              : month - 1
            : month
          : !thisMonth
          ? month === 11
            ? 0
            : month + 1
          : month
        : month,
    )
  }, [isMounted, year, month, day, thisMonth, beforeOrAfter])

  const onClickDay = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) {
      e.preventDefault()
    }

    onClick(new Date(actualYear, actualMonth, day))
  }

  return (
    <Box
      direction="vertical"
      onClick={onClickDay}
      style={CalendarDateStyle.container}
      refObj={_date}
      id={`${actualYear}-${helper.makeTwoDigits(
        actualMonth,
      )}-${helper.makeTwoDigits(day)}${!thisMonth ? ':disabled' : ''}`}>
      <Box direction="horizontal" style={CalendarDateStyle.box}>
        <TextView
          value={String(day)}
          style={{
            color: !thisMonth
              ? theme.palette.mono.gray
              : !!weekend || !!holiday
              ? theme.palette.main.red
              : theme.palette.mono.black,
          }}
        />
      </Box>
    </Box>
  )
}
