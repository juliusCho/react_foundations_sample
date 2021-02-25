import React from 'react'
import { useTranslation } from 'react-i18next'
import DueScheduleList from '../../components/cho.inhyo/DueScheduleList'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import DateScheduleListContainerStyle from '../../styles/cho.inhyo/containers/DateScheduleListContainerStyle'
import {
  TestDataType,
  TestIconDataType,
} from '../../utils/cho.inhyo/testScheduleData'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  platform: 'web' | 'mobile'
  date: Date
  schedules: TestDataType[]
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
}

export default function DateScheduleListContainer({
  platform,
  date,
  schedules,
  channels,
  cards,
  todos,
}: Props) {
  const { t } = useTranslation()

  const [showScheduleList, setShowScheduleList] = React.useState(true)
  const [showChannelList, setShowChannelList] = React.useState(true)
  const [showCardList, setShowCardList] = React.useState(true)
  const [showTodoList, setShowTodoList] = React.useState(true)

  const onClickScheduleShow = () => setShowScheduleList(!showScheduleList)
  const onClickChannelShow = () => setShowChannelList(!showChannelList)
  const onClickCardShow = () => setShowCardList(!showCardList)
  const onClickTodoShow = () => setShowTodoList(!showTodoList)

  const onClickSchedule = (data: TestDataType) => {
    //
  }

  const onClickChannel = (data: TestIconDataType) => {
    //
  }

  const onClickCard = (data: TestIconDataType) => {
    //
  }

  const onClickTodo = (data: TestIconDataType) => {
    //
  }

  return (
    <div style={DateScheduleListContainerStyle.container}>
      <Box
        direction="horizontal"
        onClick={onClickScheduleShow}
        style={DateScheduleListContainerStyle.sectionTitle}>
        <TextView value={t('calendar.schedule')} />
        <IconButton
          style={DateScheduleListContainerStyle.toggle}
          icon={showScheduleList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showScheduleList && (
        <DueScheduleList<TestDataType>
          date={date}
          dataList={schedules}
          type="schedule"
          onClick={onClickSchedule}
        />
      )}
      <Box
        direction="horizontal"
        onClick={onClickChannelShow}
        style={DateScheduleListContainerStyle.sectionTitle}>
        <TextView value={t('calendar.channel')} />
        <IconButton
          style={DateScheduleListContainerStyle.toggle}
          icon={showChannelList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showChannelList && (
        <DueScheduleList<TestIconDataType>
          date={date}
          dataList={channels}
          type="channel"
          onClick={onClickChannel}
        />
      )}
      <Box
        direction="horizontal"
        onClick={onClickCardShow}
        style={DateScheduleListContainerStyle.sectionTitle}>
        <TextView value={t('calendar.card')} />
        <IconButton
          style={DateScheduleListContainerStyle.toggle}
          icon={showCardList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showCardList && (
        <DueScheduleList<TestIconDataType>
          date={date}
          dataList={cards}
          type="card"
          onClick={onClickCard}
        />
      )}
      <Box
        direction="horizontal"
        onClick={onClickTodoShow}
        style={DateScheduleListContainerStyle.sectionTitle}>
        <TextView value={t('calendar.todo')} />
        <IconButton
          style={DateScheduleListContainerStyle.toggle}
          icon={showTodoList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showTodoList && (
        <DueScheduleList<TestIconDataType>
          date={date}
          dataList={todos}
          type="todo"
          onClick={onClickTodo}
        />
      )}
    </div>
  )
}
