import moment from 'moment'
import React from 'react'
import CalendarContainer from '../../containers/cho.inhyo/CalendarContainer'
import DateScheduleListContainer from '../../containers/cho.inhyo/DateScheduleListContainer'
import Box from '../../foundations/cho.inhyo/Box'

interface Props {
  platform: 'web' | 'mobile'
}

export default function CalendarPage({ platform }: Props) {
  const [baseDate, setBaseDate] = React.useState<Date>(new Date())
  const [chosenDate, setChosenDate] = React.useState<Date | undefined>()
  const [showDateSchedule, setShowDateSchedule] = React.useState(false)
  const [containerWidth, setContainerWidth] = React.useState('100%')

  const data: any[] = []

  const onClickDate = (date: Date) => {
    if (
      !!chosenDate &&
      moment(date).format('YYYYMMDD') === moment(chosenDate).format('YYYYMMDD')
    ) {
      setChosenDate(undefined)
    } else {
      setBaseDate(date)
      setChosenDate(date)
    }

    if (data.length === 0) {
      setContainerWidth('100%')
      setShowDateSchedule(false)
      return
    }

    if (platform === 'web') {
      setContainerWidth('70%')
    }
    setShowDateSchedule(true)
  }

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
          startDay={3}
        />
      </Box>
      {showDateSchedule && !!chosenDate && (
        <Box direction="vertical" style={{ width: '30%' }}>
          <DateScheduleListContainer platform={platform} date={chosenDate} />
        </Box>
      )}
    </Box>
  )
}
