import moment from 'moment'
import React from 'react'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarIconsStyle from '../../styles/cho.inhyo/components/CalendarIconsStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  day: number
  month: number
  year: number
  thisMonth?: boolean
  beforeOrAfter?: 'before' | 'after'
  endingProjects?: Date[]
  endingCards?: Date[]
  endingTodos?: Date[]
}

export default function CalendarIcons({
  day,
  month,
  year,
  thisMonth = true,
  beforeOrAfter,
  endingProjects,
  endingCards,
  endingTodos,
}: Props) {
  const [today, setToday] = React.useState(new Date())
  const [endingProjectCnt, setEndingProjectCnt] = React.useState(0)
  const [endingCardCnt, setEndingCardCnt] = React.useState(0)
  const [endingTodoCnt, setEndingTodoCnt] = React.useState(0)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    setToday(
      () =>
        new Date(
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
          day,
        ),
    )
  }, [isMounted, year, month, day, thisMonth, beforeOrAfter])

  React.useEffect(() => {
    if (!isMounted()) return

    const todayStr = moment(today).format('YYYYMMDD')

    if (!!endingProjects && endingProjects.length > 0) {
      setEndingProjectCnt(
        () =>
          endingProjects.filter(
            (endingProject) =>
              moment(endingProject).format('YYYYMMDD') === todayStr,
          ).length,
      )
    }
    if (!!endingCards && endingCards.length > 0) {
      setEndingCardCnt(
        () =>
          endingCards.filter(
            (endingCard) => moment(endingCard).format('YYYYMMDD') === todayStr,
          ).length,
      )
    }
    if (!!endingTodos && endingTodos.length > 0) {
      setEndingTodoCnt(
        () =>
          endingTodos.filter(
            (endingTodo) => moment(endingTodo).format('YYYYMMDD') === todayStr,
          ).length,
      )
    }
  }, [isMounted, endingProjects, endingCards, endingTodos, today])

  return (
    <>
      {endingProjectCnt > 0 && (
        <Box direction="horizontal" style={CalendarIconsStyle.container}>
          <IconButton
            icon={Icons.EMOTICON}
            style={{
              ...CalendarIconsStyle.icon,
              backgroundColor: theme.palette.main.red,
            }}
          />
          <TextView value={String(endingProjectCnt)} />
        </Box>
      )}
      {(endingCardCnt > 0 || endingTodoCnt > 0) && (
        <div style={CalendarIconsStyle.box}>
          {endingCardCnt > 0 && (
            <Box direction="horizontal" style={CalendarIconsStyle.container}>
              <IconButton
                icon={Icons.CARD}
                style={{
                  ...CalendarIconsStyle.icon,
                  backgroundColor: theme.palette.main.blue,
                }}
              />
              <TextView value={String(endingCardCnt)} />
            </Box>
          )}
          {endingTodoCnt > 0 && (
            <Box
              direction="horizontal"
              style={{ ...CalendarIconsStyle.container, marginRight: '20px' }}>
              <IconButton
                icon={Icons.MISSION}
                style={{
                  ...CalendarIconsStyle.icon,
                  backgroundColor: theme.palette.main.turquoise,
                }}
              />
              <TextView value={String(endingTodoCnt)} />
            </Box>
          )}
        </div>
      )}
    </>
  )
}
