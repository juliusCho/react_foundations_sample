import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ScheduleItemStyle from '../../styles/cho.inhyo/components/ScheduleItemStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import { TestIconDataType } from '../../utils/cho.inhyo/testScheduleData'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  data: TestIconDataType
  onClick: (data: TestIconDataType) => void
}

export default function ChannelItem({ data, onClick }: Props) {
  const { t } = useTranslation()

  const trimName = (top: boolean, name?: string) => {
    if (!name) return ''

    const maxLen = top ? 8 : 20

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
    <ScheduleItemStyle.container>
      <div
        style={{
          ...ScheduleItemStyle.color,
          backgroundColor: data.color || theme.palette.mono.gray,
          width: '3rem',
          height: '3rem',
        }}
      />
      <div style={ScheduleItemStyle.infoContainer}>
        <div style={ScheduleItemStyle.mainLabelArea}>
          <div style={{ ...ScheduleItemStyle.top, width: '100%' }}>
            <div style={{ ...ScheduleItemStyle.top, maxWidth: '60%' }}>
              <div style={ScheduleItemStyle.label}>
                {trimName(true, data.name)}
              </div>
              <div
                style={{ ...ScheduleItemStyle.schedule, marginLeft: '0.3rem' }}>
                {`(${data.newCnt || 0})`}
              </div>
            </div>
            <div style={ScheduleItemStyle.schedule}>
              {t('calendar.before', { time: calculateTimeDiff(data.modTime) })}
            </div>
          </div>
        </div>
        <div
          style={{
            ...ScheduleItemStyle.mainLabel,
            whiteSpace: 'pre' as const,
            maxHeight: '2rem',
          }}>
          {trimName(false, data.curMsg || '')}
        </div>
      </div>
    </ScheduleItemStyle.container>
  )
}
