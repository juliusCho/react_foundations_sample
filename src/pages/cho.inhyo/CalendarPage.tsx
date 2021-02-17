import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import CalendarContainer from '../../containers/cho.inhyo/CalendarContainer'
import DateScheduleListContainer from '../../containers/cho.inhyo/DateScheduleListContainer'
import Box from '../../foundations/cho.inhyo/Box'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState } from '../../utils/cho.inhyo/states'
import {
  TestDataType,
  testIconData,
  TestIconDataType,
  testScheduleData,
} from '../../utils/cho.inhyo/testScheduleData'

interface Props {
  platform: 'web' | 'mobile'
}

export default function CalendarPage({ platform }: Props) {
  const setLoading = Recoil.useSetRecoilState(loadingState)

  const [baseDate, setBaseDate] = React.useState<Date>(new Date())
  const [chosenDate, setChosenDate] = React.useState<Date | undefined>()
  const [showDateSchedule, setShowDateSchedule] = React.useState(false)
  const [containerWidth, setContainerWidth] = React.useState('100%')
  const [schedules, setSchedules] = React.useState<TestDataType[]>([])
  const [endingProjects, setEndingProjects] = React.useState<
    TestIconDataType[]
  >([])
  const [endingCards, setEndingCards] = React.useState<TestIconDataType[]>([])
  const [endingTodos, setEndingTodos] = React.useState<TestIconDataType[]>([])

  const isMounted = useIsMounted()

  const onClickDate = (date: Date) => {
    const dateNum = Number(moment(date).format('YYYYMMDD'))

    setSchedules(
      testScheduleData.filter((datum) => {
        const startDate = Number(moment(datum.startDate).format('YYYYMMDD'))
        if (datum.endDate) {
          const endDate = Number(moment(datum.endDate).format('YYYYMMDD'))
          if (endDate === startDate) {
            return startDate === dateNum
          }
          return startDate <= dateNum && dateNum <= endDate
        } else {
          return startDate === dateNum
        }
      }),
    )

    const { projects, cards, todos } = testIconData
    setEndingProjects(
      projects.filter(
        (project) =>
          Number(moment(project.date).format('YYYYMMDD')) === dateNum,
      ),
    )
    setEndingCards(
      cards.filter(
        (card) => Number(moment(card.date).format('YYYYMMDD')) === dateNum,
      ),
    )
    setEndingTodos(
      todos.filter(
        (todo) => Number(moment(todo.date).format('YYYYMMDD')) === dateNum,
      ),
    )
    setTimeout(() => {
      if (
        !!chosenDate &&
        moment(date).format('YYYYMMDD') ===
          moment(chosenDate).format('YYYYMMDD')
      ) {
        setChosenDate(undefined)
      } else {
        setBaseDate(date)
        setChosenDate(date)
      }

      setLoading(false)
    }, 50)
  }

  React.useEffect(() => {
    if (isMounted()) {
      if (
        schedules.length +
          endingProjects.length +
          endingCards.length +
          endingTodos.length ===
          0 ||
        !chosenDate
      ) {
        setContainerWidth(() => '100%')
        setShowDateSchedule(() => false)
        return
      }

      if (platform === 'web') {
        setContainerWidth(() => '70%')
      }
      setShowDateSchedule(() => true)
    }
  }, [
    isMounted,
    schedules.length,
    endingProjects.length,
    endingCards.length,
    endingTodos.length,
    chosenDate,
    platform,
  ])

  const onChangeMonth = (date: Date) => {
    setBaseDate(date)
  }

  return (
    <Box direction="horizontal" style={{ width: '100%' }}>
      <Box direction="vertical" style={{ width: containerWidth }}>
        <CalendarContainer
          baseDate={baseDate}
          onChangeMonth={onChangeMonth}
          chosenDate={chosenDate}
          onClick={onClickDate}
        />
      </Box>
      <Box
        direction="vertical"
        style={{
          transition: 'width 0.5s',
          width: showDateSchedule && !!chosenDate ? '30%' : '0%',
        }}>
        {showDateSchedule && !!chosenDate && (
          <DateScheduleListContainer
            platform={platform}
            date={chosenDate ?? new Date()}
          />
        )}
      </Box>
    </Box>
  )
}
