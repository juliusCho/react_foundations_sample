import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ScheduleItemStyle from '../../styles/cho.inhyo/components/ScheduleItemStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import { TestIconDataType } from '../../utils/cho.inhyo/testScheduleData'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  type: 'channel' | 'card' | 'todo'
  data: TestIconDataType
  onClick: (data: TestIconDataType) => void
}

export default function ChannelItem({ type, data, onClick }: Props) {
  const { t } = useTranslation()

  const trimName = (top: boolean, name?: string) => {
    if (!name) return ''

    const maxLen = top ? 13 : 20

    return name.length > maxLen ? (
      <>
        {name.substr(0, maxLen)}
        <i className={Icons.MORE} />
      </>
    ) : (
      name
    )
  }

  const calculateTimeDiff = (modTime?: Date) => {
    if (!modTime) return t('calendar.minute', { minute: 0 })

    const ago = Math.floor(
      moment.duration(moment(new Date()).diff(moment(modTime))).asMinutes(),
    )
    const hour = Math.floor(ago / 60)
    const minute = ago % 60

    if (hour > 0 && minute > 0) {
      return `${t('calendar.hour', { hour })} ${t('calendar.minute', {
        minute,
      })}`
    } else if (hour > 0) {
      return t('calendar.hour', { hour })
    } else {
      return t('calendar.minute', { minute })
    }
  }

  return (
    <div style={ScheduleItemStyle.container}>
      <div
        style={{
          ...ScheduleItemStyle.color,
          backgroundColor: data.color || theme.palette.mono.gray,
        }}
      />
      <div style={ScheduleItemStyle.infoContainer}>
        <div
          style={{
            ...ScheduleItemStyle.top,
            justifyContent: 'flex-end' as const,
          }}>
          <div style={ScheduleItemStyle.schedule}>
            {type === 'channel'
              ? t('calendar.before', { time: calculateTimeDiff(data.modTime) })
              : t('calendar.dueto', {
                  date: moment(data.date)
                    .format('YY.MM.DD HH:mm')
                    .replace(' 00:00', ''),
                })}
          </div>
        </div>
        <div style={ScheduleItemStyle.label}>{trimName(false, data.name)}</div>
      </div>
    </div>
  )
}
