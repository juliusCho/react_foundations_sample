import React from 'react'
import CalendarContainer from '../../containers/cho.inhyo/CalenderContainer'
import DateScheduleListContainer from '../../containers/cho.inhyo/DateScheduleListContainer'
import Box from '../../foundations/cho.inhyo/Box'

interface Props {
  platform: 'web' | 'mobile'
}

export default function CalendarPage({ platform }: Props) {
  const [dueDate, setDueDate] = React.useState<Date | undefined>()
  const [showDateSchedule, setShowDateSchedule] = React.useState(false)
  const [containerWidth, setContainerWidth] = React.useState('100%')

  const onClickDate = (date: Date) => {
    if (platform === 'web') {
      setContainerWidth('70%')
    }
    setDueDate(date)
    setShowDateSchedule(true)
  }

  return (
    <Box direction="horizontal" style={{ width: containerWidth }}>
      <CalendarContainer dueDate={dueDate} onClick={onClickDate} />
      {showDateSchedule && !!dueDate && (
        <DateScheduleListContainer platform={platform} date={dueDate} />
      )}
    </Box>
  )
}
