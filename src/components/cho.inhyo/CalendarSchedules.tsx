import React from 'react'
import { useTranslation } from 'react-i18next'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarSchedulesStyle from '../../styles/cho.inhyo/components/CalendarSchedulesStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import { Icons } from '../../utils/cho.inhyo/types'

export type ScheduleDisplayType = {
  week: number
  type: 'main' | 'sub'
  start?: boolean
  end?: boolean
  sub?: boolean
  subStart?: boolean
  subEnd?: boolean
  label?: string
  color: string
}

interface Props {
  schedules: Array<ScheduleDisplayType | null>
}

export default React.memo(function CalendarSchedules({ schedules }: Props) {
  const { t } = useTranslation()

  const maxCount = 10
  const extraCount =
    schedules.length > maxCount
      ? schedules.filter(
          (schedule, idx) => idx >= maxCount && schedule !== null,
        ).length
      : 0

  return (
    <div style={CalendarSchedulesStyle.container}>
      {schedules
        .filter((schedule, idx) => idx <= maxCount)
        .map((schedule, idx) =>
          idx === maxCount && extraCount > 1 ? (
            <TextView
              key={'more_' + String(idx)}
              value={t('calendar.moreSchedule', { count: extraCount })}
              style={{
                ...CalendarSchedulesStyle.nullStyle,
                ...theme.font.item1,
                color: theme.palette.mono.darkGray,
                marginLeft: '0.625rem',
              }}
            />
          ) : schedule === null ? (
            <div
              key={'null_' + String(idx)}
              style={CalendarSchedulesStyle.nullStyle}
            />
          ) : schedule.type === 'main' ? (
            <div
              key={String(idx) + String(schedule.week)}
              style={CalendarSchedulesStyle.box}>
              <div
                style={{
                  ...CalendarSchedulesStyle.sub,
                  margin: 0,
                  position: 'absolute' as const,
                  backgroundColor: schedule.color,
                  display: schedule.sub ? 'flex' : 'none',
                  borderRadius: schedule.subStart
                    ? schedule.subEnd
                      ? '1.875rem'
                      : '1.875rem 0px 0px 1.875rem'
                    : schedule.subEnd
                    ? '0px 1.875rem 1.875rem 0px'
                    : 'unset',
                }}
              />
              <div
                style={{
                  ...CalendarSchedulesStyle.main,
                  margin: 0,
                  position: 'absolute' as const,
                  backgroundColor: schedule.color,
                  borderRadius: schedule.start
                    ? schedule.end
                      ? '1.875rem'
                      : '1.875rem 0px 0px 1.875rem'
                    : schedule.end
                    ? '0px 1.875rem 1.875rem 0px'
                    : 'unset',
                }}
              />
              {schedule.label &&
                (schedule.label.indexOf('..extra..') > -1 ? (
                  <div
                    style={{
                      display: 'flex' as const,
                      justifyContent: 'flex-start' as const,
                      alignItems: 'center' as const,
                      zIndex: 3,
                    }}>
                    <TextView
                      value={schedule.label.replace('..extra..', '')}
                      style={CalendarSchedulesStyle.label}
                    />
                    <i className={Icons.MORE} />
                  </div>
                ) : (
                  <TextView
                    value={schedule.label}
                    style={CalendarSchedulesStyle.label}
                  />
                ))}
            </div>
          ) : (
            <div
              key={'sub_' + String(schedule.week) + String(idx)}
              style={{
                ...CalendarSchedulesStyle.sub,
                backgroundColor: schedule.color,
                borderRadius: schedule.start
                  ? schedule.end
                    ? '1.875rem'
                    : '1.875rem 0px 0px 1.875rem'
                  : schedule.end
                  ? '0px 1.875rem 1.875rem 0px'
                  : 'unset',
              }}
            />
          ),
        )}
    </div>
  )
})
