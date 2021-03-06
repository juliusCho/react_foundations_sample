import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import CalendarContainer from '../../containers/cho.inhyo/CalendarContainer'
import DateScheduleListContainer from '../../containers/cho.inhyo/DateScheduleListContainer'
import CalendarPageStyle from '../../styles/cho.inhyo/pages/CalendarPageStyle'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState } from '../../utils/cho.inhyo/states'
import {
  TestDataType,
  testIconData,
  TestIconDataType,
  testScheduleData,
} from '../../utils/cho.inhyo/testScheduleData'

export default function CalendarPage() {
  const setLoading = Recoil.useSetRecoilState(loadingState)

  const [baseDate, setBaseDate] = React.useState<Date>(new Date())
  const [chosenDate, setChosenDate] = React.useState<Date | undefined>()
  const [showDateSchedule, setShowDateSchedule] = React.useState(false)
  const [
    containerWidth,
    setContainerWidth,
  ] = React.useState<React.CSSProperties>({ width: '100%', height: '100%' })
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
        setContainerWidth(() => ({ width: '100%', height: '100%' }))
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
        setContainerWidth(() => ({ width: '100%', height: '100%' }))
        setShowDateSchedule(() => false)
        setShowCreateSchedule(() => false)
        return
      }

      setContainerWidth(() =>
        helper.checkIsMobile()
          ? { width: '100%', height: '30%' }
          : { width: '70%', height: '100%' },
      )
      setShowDateSchedule(() => true)
    }
  }, [
    isMounted,
    schedules.length,
    endingChannels.length,
    endingCards.length,
    endingTodos.length,
    chosenDate,
    helper.checkIsMobile,
    doubleClicked,
  ])

  const setVhProp = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  React.useEffect(() => {
    if (!isMounted()) return

    window.addEventListener('load', setVhProp)

    return () => window.removeEventListener('load', setVhProp)
  }, [])

  React.useLayoutEffect(() => {
    if (!isMounted()) return

    window.addEventListener('resize', setVhProp)

    return () => window.removeEventListener('resize', setVhProp)
  }, [isMounted, setVhProp])

  const onChangeMonth = (date: Date) => {
    setBaseDate(date)
  }

  const rightContainerStyle: React.CSSProperties = {}

  if (helper.checkIsMobile()) {
    rightContainerStyle.transition = 'height 0.5s'
    rightContainerStyle.height =
      showDateSchedule && !!chosenDate ? 'calc(70% - 0.063rem)' : '0%'
    rightContainerStyle.width = '100%'
  } else {
    rightContainerStyle.transition = 'width 0.5s'
    rightContainerStyle.height = '100%'
    rightContainerStyle.width =
      showDateSchedule && !!chosenDate ? 'calc(50% - 0.063rem)' : '0%'
  }
  rightContainerStyle.MozTransition = rightContainerStyle.transition
  rightContainerStyle.WebkitTransition = rightContainerStyle.transition

  return (
    <CalendarPageStyle.container
      style={{
        display: helper.checkIsMobile() ? 'block' : 'flex',
      }}>
      <div style={containerWidth}>
        <CalendarContainer
          baseDate={baseDate}
          onChangeMonth={onChangeMonth}
          chosenDate={chosenDate}
          onClick={onClickDate}
        />
      </div>
      <CalendarPageStyle.rightContainer style={rightContainerStyle}>
        {showDateSchedule && !!chosenDate && (
          <DateScheduleListContainer
            onClickTitle={onClickDate}
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
      </CalendarPageStyle.rightContainer>
    </CalendarPageStyle.container>
  )
}
