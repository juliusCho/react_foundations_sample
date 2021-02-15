import moment from 'moment'
import * as polished from 'polished'
import React from 'react'
import { ScheduleStackType } from '../../containers/cho.inhyo/CalendarDateContainer'
import Box from '../../foundations/cho.inhyo/Box'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarDateStyle from '../../styles/cho.inhyo/components/CalendarDateStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import CalendarIcons from './CalendarIcons'
import CalendarSchedules, { ScheduleDisplayType } from './CalendarSchedules'

interface Props {
  chosenDate?: Date
  startWeekOffset: number
  edgeOfWeek?: 'start' | 'end'
  day: number
  month: number
  year: number
  holiday?: boolean
  thisMonth?: boolean
  beforeOrAfter?: 'before' | 'after'
  onClick: (date: Date) => void
  _date: React.RefObject<HTMLDivElement> | null
  scheduleStack: Array<Array<ScheduleStackType>>
  icons?: {
    endingProjects?: Date[]
    endingCards?: Date[]
    endingTodos?: Date[]
  }
}

export default function CalendarDate({
  chosenDate,
  startWeekOffset,
  edgeOfWeek,
  day,
  month,
  year,
  holiday,
  thisMonth = true,
  beforeOrAfter,
  onClick,
  _date,
  scheduleStack,
  icons,
}: Props) {
  const [actualYear, setActualYear] = React.useState(year)
  const [actualMonth, setActualMonth] = React.useState(month)
  const [selected, setSelected] = React.useState(false)
  const [isToday, setIsToday] = React.useState(false)
  const [isWeekend, setIsWeekend] = React.useState(false)
  const [thisWeek, setThisWeek] = React.useState<Date[]>([])

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
    const thisDate = new Date(actualYear, actualMonth, day)
    const thisDay = moment(thisDate).format('YYYYMMDD')
    setIsToday(() => moment(new Date()).format('YYYYMMDD') === thisDay)
    setIsWeekend(() => thisDate.getDay() === 6 || thisDate.getDay() === 0)

    if (!chosenDate) {
      setSelected(() => false)
      return
    }

    setSelected(() => moment(chosenDate).format('YYYYMMDD') === thisDay)
  }, [isMounted, chosenDate, actualYear, actualMonth, day])

  React.useEffect(() => {
    if (!isMounted()) return

    const week: Date[] = []

    for (let i = 0; i < 7; i++) {
      const dt = new Date(actualYear, actualMonth, day)
      dt.setDate(dt.getDate() + startWeekOffset + i)
      week.push(dt)
    }
    setThisWeek(() => week)
  }, [isMounted, actualYear, actualMonth, day, startWeekOffset])

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
        borderLeft:
          thisWeek.length === 0
            ? undefined
            : helper.compareDate(
                thisWeek[0],
                new Date(actualYear, actualMonth, day),
              )
            ? undefined
            : `1px solid ${theme.palette.mono.paleWhite}`,
        // height: '188px',
      }}
      refObj={_date}
      id={`${actualYear}-${helper.makeTwoDigits(
        actualMonth,
      )}-${helper.makeTwoDigits(day)}${!thisMonth ? ':disabled' : ''}`}>
      <Box direction="horizontal" style={CalendarDateStyle.title}>
        <TextView
          value={day === 1 ? `${actualMonth + 1}/${day}` : String(day)}
          style={{
            ...theme.font.sub,
            marginRight: '10px',
            border: 'none' as const,
            borderRadius: '50%',
            padding: '9px 5px 5px 5px',
            width: '24px',
            height: '20px',
            textAlign: 'center' as const,
            backgroundColor: isToday
              ? polished.lighten(thisMonth ? 0 : 0.3, theme.palette.main.red)
              : undefined,
            color: !thisMonth
              ? theme.palette.mono.gray
              : isToday
              ? theme.palette.mono.white
              : !!isWeekend || !!holiday
              ? theme.palette.main.red
              : theme.palette.mono.black,
          }}
        />
      </Box>
      <div
        style={{
          ...CalendarDateStyle.contents,
          opacity: !thisMonth ? 0.2 : undefined,
        }}>
        {scheduleStack.length > 0 && (
          <CalendarSchedules
            schedules={scheduleStack.map((stack) => {
              const found = stack.find(
                (schedule) =>
                  schedule.week ===
                  Number(
                    String(actualYear) +
                      helper.makeTwoDigits(actualMonth + 1) +
                      helper.makeTwoDigits(day),
                  ),
              )
              if (!found) return null

              const stackList = stack.filter(
                (schedule) => schedule.no === found.no,
              )

              const result: Record<string, unknown> = {
                week: found.week,
                type: found.mainWeek ? 'main' : 'sub',
                sub: !!found.subNo,
                label:
                  !stackList.some(
                    (schedule) =>
                      schedule.mainWeek && schedule.week < found.week,
                  ) ||
                  (edgeOfWeek === 'start' && found.outOfThisWeek)
                    ? found.label
                    : undefined,
                color: found.color,
              }

              if (result.type === 'main') {
                result.start =
                  !(edgeOfWeek === 'start' && found.outOfThisWeek) &&
                  !stackList.some(
                    (schedule) =>
                      schedule.mainWeek && schedule.week < found.week,
                  )
                result.end =
                  !(edgeOfWeek === 'end' && found.outOfThisWeek) &&
                  !stackList.some(
                    (schedule) =>
                      schedule.mainWeek && schedule.week > found.week,
                  )
                result.subStart =
                  !(edgeOfWeek === 'start' && found.outOfThisWeek) &&
                  !stackList.some(
                    (schedule) =>
                      !schedule.mainWeek && schedule.week < found.week,
                  )
                result.subEnd =
                  !(edgeOfWeek === 'end' && found.outOfThisWeek) &&
                  !stackList.some(
                    (schedule) =>
                      !schedule.mainWeek && schedule.week > found.week,
                  )
              } else {
                result.start =
                  !(edgeOfWeek === 'start' && found.outOfThisWeek) &&
                  !stackList.some((schedule) => schedule.week < found.week)
                result.end =
                  !(edgeOfWeek === 'end' && found.outOfThisWeek) &&
                  !stackList.some((schedule) => schedule.week > found.week)
              }

              if (
                String(actualYear) +
                  helper.makeTwoDigits(actualMonth + 1) +
                  helper.makeTwoDigits(day) ===
                '20210208'
              ) {
                console.log('===================@$$@$@----------------------')
                console.log(
                  String(actualYear) +
                    helper.makeTwoDigits(actualMonth + 1) +
                    helper.makeTwoDigits(day),
                )
                console.log('result', result)
                console.log('result', stackList)
              }

              return result as ScheduleDisplayType
            })}
          />
        )}
      </div>
      <div
        style={{
          ...CalendarDateStyle.contents,
          marginTop: '5px',
          opacity: !thisMonth ? 0.2 : undefined,
        }}>
        {icons && (
          <CalendarIcons
            today={new Date(actualYear, actualMonth, day)}
            endingProjects={icons.endingProjects}
            endingCards={icons.endingCards}
            endingTodos={icons.endingTodos}
          />
        )}
      </div>
    </Box>
  )
}
