import React from 'react'
import { useTranslation } from 'react-i18next'
import DueScheduleListStyle from '../../styles/cho.inhyo/components/DueScheduleListStyle'
import {
  TestDataType,
  TestIconDataType,
} from '../../utils/cho.inhyo/testScheduleData'
import CardItem from './CardItem'
import ChannelItem from './ChannelItem'
import ScheduleItem from './ScheduleItem'
import TodoItem from './TodoItem'

interface Props<T> {
  dataList: Array<T>
  type: 'schedule' | 'channel' | 'card' | 'todo'
  display: boolean
  onClick: (data: T) => void
}

export default function DueScheduleList<
  T extends TestDataType | TestIconDataType
>({ dataList, type, display, onClick }: Props<T>) {
  const { t } = useTranslation()

  return (
    <div
      style={{
        display: display ? 'block' : 'none',
        transition: 'display 0.5s',
      }}>
      {type === 'schedule' ? (
        dataList.length === 0 ? (
          <div style={DueScheduleListStyle.nodata}>{t('calendar.nodata')}</div>
        ) : (
          (dataList as TestDataType[]).map((datum) => (
            <ScheduleItem
              key={datum.no}
              data={datum}
              onClick={onClick as (data: TestDataType) => void}
            />
          ))
        )
      ) : type === 'channel' ? (
        dataList.length === 0 ? (
          <div style={DueScheduleListStyle.nodata}>{t('calendar.nodata')}</div>
        ) : (
          (dataList as TestIconDataType[]).map((datum) => (
            <ChannelItem
              key={datum.no}
              data={datum}
              onClick={onClick as (data: TestIconDataType) => void}
            />
          ))
        )
      ) : type === 'card' ? (
        dataList.length === 0 ? (
          <div style={DueScheduleListStyle.nodata}>{t('calendar.nodata')}</div>
        ) : (
          (dataList as TestIconDataType[]).map((datum) => (
            <CardItem
              key={datum.no}
              type=""
              data={datum}
              onClick={onClick as (data: TestIconDataType) => void}
            />
          ))
        )
      ) : type === 'todo' ? (
        dataList.length === 0 ? (
          <div style={DueScheduleListStyle.nodata}>{t('calendar.nodata')}</div>
        ) : (
          (dataList as TestIconDataType[]).map((datum) => (
            <TodoItem
              key={datum.no}
              data={datum}
              onClick={onClick as (data: TestIconDataType) => void}
            />
          ))
        )
      ) : (
        <div style={DueScheduleListStyle.nodata}>{t('calendar.nodata')}</div>
      )}
    </div>
  )
}
