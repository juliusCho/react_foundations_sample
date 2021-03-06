import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DueScheduleList from '../../components/cho.inhyo/DueScheduleList'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import DateScheduleListContainerStyle from '../../styles/cho.inhyo/containers/DateScheduleListContainerStyle'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { Months } from '../../utils/cho.inhyo/i18n'
import Swipe from '../../utils/cho.inhyo/swiper'
import {
  TestDataType,
  TestIconDataType,
} from '../../utils/cho.inhyo/testScheduleData'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  date: Date
  schedules: TestDataType[]
  channels: TestIconDataType[]
  cards: TestIconDataType[]
  todos: TestIconDataType[]
  onClickTitle: (date: Date) => void
}

export default function DateScheduleListContainer({
  date,
  schedules,
  channels,
  cards,
  todos,
  onClickTitle,
}: Props) {
  const { t } = useTranslation()

  const _container: React.RefObject<HTMLDivElement> = React.createRef()

  const [showScheduleList, setShowScheduleList] = React.useState(true)
  const [showChannelList, setShowChannelList] = React.useState(true)
  const [showCardList, setShowCardList] = React.useState(true)
  const [showTodoList, setShowTodoList] = React.useState(true)

  const isMounted = useIsMounted()

  const touch = (el: HTMLDivElement) => {
    const swiper = new Swipe(el)
    swiper.onDown(() => {
      onClickTitle(date)
    })
    swiper.run()
  }

  React.useLayoutEffect(() => {
    if (!isMounted()) return
    if (!helper.checkIsMobile()) return
    if (!_container?.current) return

    touch(_container.current)
  }, [isMounted, _container?.current, helper.checkIsMobile])

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

  const year = moment(date).format('YYYY')
  const month = Number(moment(date).format('MM')) - 1
  const day = Number(moment(date).format('DD'))

  const topLabelStyle = helper.checkIsMobile()
    ? {
        width: '100%',
        left: 0,
        top: 'unset',
        bottom: 'calc(70% - 3rem)',
      }
    : {
        width: 'calc(30% - 0.063rem)',
        left: 'calc(70% + 0.063rem)',
        top: 0,
        bottom: 'unset',
      }

  return (
    <DateScheduleListContainerStyle.container>
      <div
        ref={_container}
        onClick={() => onClickTitle(date)}
        style={{
          ...DateScheduleListContainerStyle.date,
          ...topLabelStyle,
        }}>
        {t('calendar.yearMonth', {
          year,
          month: t(`calendar.${Months[month]}`),
        }) +
          ` ${
            day < 4
              ? t(`calendar.day${day}`, { day })
              : t('calendar.day', { day })
          }`}
      </div>
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
          dataList={channels}
          type="channel"
          onClick={onClickChannel}
        />
      )}
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
          dataList={schedules}
          type="schedule"
          onClick={onClickSchedule}
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
          dataList={todos}
          type="todo"
          onClick={onClickTodo}
        />
      )}
    </DateScheduleListContainerStyle.container>
  )
}
