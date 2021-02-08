import React from 'react'
import CalendarContainer from '../../containers/cho.inhyo/CalendarContainer'
import DateScheduleListContainer from '../../containers/cho.inhyo/DateScheduleListContainer'
import Box from '../../foundations/cho.inhyo/Box'

interface Props {
  platform: 'web' | 'mobile'
}

export default function CalendarPage({ platform }: Props) {
  const [dueDate, setDueDate] = React.useState<Date | undefined>()
  const [showDateSchedule, setShowDateSchedule] = React.useState(false)
  const [containerWidth, setContainerWidth] = React.useState('100%')

  const data: any[] = []

  const onClickDate = (date: Date) => {
    setDueDate(date)

    if (data.length === 0) {
      setContainerWidth('100%')
      return
    }

    if (platform === 'web') {
      setContainerWidth('70%')
    }
    setShowDateSchedule(true)
  }

  return (
    <Box direction="horizontal" style={{ width: '100%' }}>
      <Box direction="vertical" style={{ width: containerWidth }}>
        <CalendarContainer dueDate={dueDate} onClick={onClickDate} />
      </Box>
      {showDateSchedule && !!dueDate && (
        <Box direction="vertical" style={{ width: '30%' }}>
          <DateScheduleListContainer platform={platform} date={dueDate} />
        </Box>
      )}
    </Box>
  )
}
