import React from 'react'
import { useTranslation } from 'react-i18next'
import DueScheduleListStyle from '../../styles/cho.inhyo/components/DueScheduleListStyle'
import {
  TestDataType,
  TestIconDataType,
} from '../../utils/cho.inhyo/testScheduleData'
import ChannelItem from './ChannelItem'
import ScheduleItem from './ScheduleItem'

interface Props<T> {
  date: Date
  dataList: Array<T>
  type: 'schedule' | 'channel' | 'card' | 'todo'
  onClick: (data: T) => void
}

export default function DueScheduleList<
  T extends TestDataType | TestIconDataType
>({ date, dataList, type, onClick }: Props<T>) {
  const { t } = useTranslation()

  return (
    <>
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
      ) : type === 'channel' || type === 'card' || type === 'todo' ? (
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
      ) : (
        <div style={DueScheduleListStyle.nodata}>{t('calendar.nodata')}</div>
      )}
    </>
  )
}
