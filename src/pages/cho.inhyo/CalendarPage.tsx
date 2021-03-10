import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import CalendarContainer from '../../containers/cho.inhyo/CalendarContainer'
import DateScheduleListContainer from '../../containers/cho.inhyo/DateScheduleListContainer'
import theme from '../../styles/cho.inhyo/global/theme'
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
  const [endingChannels, setEndingChannels] = React.useState<
    TestIconDataType[]
  >([])
  const [endingCards, setEndingCards] = React.useState<TestIconDataType[]>([])
  const [endingTodos, setEndingTodos] = React.useState<TestIconDataType[]>([])
  const [doubleClicked, setDoubleClicked] = React.useState(false)
  const [showCreateSchedule, setShowCreateSchedule] = React.useState(false)

  const isMounted = useIsMounted()

  const onClickDate = (date: Date, doubleClicked?: boolean) => {
    const dateNum = Number(moment(date).format('YYYYMMDD'))

    setSchedules(
      testScheduleData
        .filter((datum) => {
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
        })
        .map((item) => {
          if (item.type === 'sub') {
            const found = testScheduleData.find(
              (testD) => testD.no === item.parentNo,
            )
            if (found) {
              return { ...item, parentName: found.name }
            }
          }
          return item
        }),
    )

    const { channels, cards, todos } = testIconData
    setEndingChannels(
      channels.filter(
        (channel) =>
          Number(moment(channel.date).format('YYYYMMDD')) === dateNum,
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
      setDoubleClicked(!!doubleClicked)

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
      if (doubleClicked) {
        setShowDateSchedule(() => false)

        if (platform === 'web') {
          setContainerWidth(() => '70%')
        }
        setShowCreateSchedule(() => true)

        return
      }

      if (
        schedules.length +
          endingChannels.length +
          endingCards.length +
          endingTodos.length ===
          0 ||
        !chosenDate
      ) {
        setContainerWidth(() => '100%')
        setShowDateSchedule(() => false)
        setShowCreateSchedule(() => false)
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
    endingChannels.length,
    endingCards.length,
    endingTodos.length,
    chosenDate,
    platform,
    doubleClicked,
  ])

  const onChangeMonth = (date: Date) => {
    setBaseDate(date)
  }

  const rightContainerStyle = {
    transition: 'width 0.5s',
    height: '100%',
    width: showDateSchedule && !!chosenDate ? '30%' : '0%',
    borderLeft: `1px solid ${theme.palette.mono.paleWhite}`,
    backgroundColor: theme.palette.mono.white,
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex' as const,
        justifyContent: 'center' as const,
      }}>
      <div style={{ width: containerWidth }}>
        <CalendarContainer
          baseDate={baseDate}
          onChangeMonth={onChangeMonth}
          chosenDate={chosenDate}
          onClick={onClickDate}
        />
      </div>
      <div style={rightContainerStyle}>
        {showDateSchedule && !!chosenDate && (
          <DateScheduleListContainer
            platform={platform}
            date={chosenDate || new Date()}
            schedules={schedules}
            channels={endingChannels}
            cards={endingCards}
            todos={endingTodos}
          />
        )}
        {/* {showCreateSchedule && !!chosenDate && (
          <DateScheduleListContainer
            platform={platform}
            date={chosenDate || new Date()}
          />
        )} */}
      </div>
    </div>
  )
}
