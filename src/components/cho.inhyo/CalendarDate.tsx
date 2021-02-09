import moment from 'moment'
import * as polished from 'polished'
import React from 'react'
import Box from '../../foundations/cho.inhyo/Box'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarDateStyle from '../../styles/cho.inhyo/components/CalendarDateStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'

interface Props {
  chosenDate?: Date
  day: number
  month: number
  year: number
  weekend?: boolean
  holiday?: boolean
  thisMonth?: boolean
  beforeOrAfter?: 'before' | 'after'
  onClick: (date: Date) => void
  _date: React.RefObject<HTMLDivElement> | null
  children?: React.ReactNode | React.ReactNode[]
}

export default function CalendarDate({
  chosenDate,
  day,
  month,
  year,
  weekend,
  holiday,
  thisMonth = true,
  beforeOrAfter,
  onClick,
  _date,
  children,
}: Props) {
  const [actualYear, setActualYear] = React.useState(year)
  const [actualMonth, setActualMonth] = React.useState(month)
  const [selected, setSelected] = React.useState(false)
  const [isToday, setIsToday] = React.useState(false)

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

  React.useEffect(() => {
    if (!isMounted()) return
    const thisDay = moment(new Date(actualYear, actualMonth, day)).format(
      'YYYYMMDD',
    )
    setIsToday(() => moment(new Date()).format('YYYYMMDD') === thisDay)

    if (!chosenDate) {
      setSelected(() => false)
      return
    }

    setSelected(() => moment(chosenDate).format('YYYYMMDD') === thisDay)
  }, [isMounted, chosenDate, actualYear, actualMonth, day])

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
      style={{
        ...CalendarDateStyle.container,
        backgroundColor: selected
          ? polished.lighten(
              thisMonth ? 0.3 : 0.35,
              theme.palette.main.turquoise,
            )
          : undefined,
      }}
      refObj={_date}
      id={`${actualYear}-${helper.makeTwoDigits(
        actualMonth,
      )}-${helper.makeTwoDigits(day)}${!thisMonth ? ':disabled' : ''}`}>
      <Box direction="horizontal" style={CalendarDateStyle.title}>
        <TextView
          value={String(day)}
          style={{
            marginRight: '10px',
            border: 'none' as const,
            borderRadius: '50%',
            padding: '7px 5px 5px 5px',
            width: '24px',
            height: '22px',
            textAlign: 'center' as const,
            backgroundColor: isToday ? theme.palette.main.red : undefined,
            color: !thisMonth
              ? theme.palette.mono.gray
              : isToday
              ? theme.palette.mono.white
              : !!weekend || !!holiday
              ? theme.palette.main.red
              : theme.palette.mono.black,
          }}
        />
      </Box>
      <Box direction="vertical" style={CalendarDateStyle.contents}>
        {children}
      </Box>
    </Box>
  )
}
