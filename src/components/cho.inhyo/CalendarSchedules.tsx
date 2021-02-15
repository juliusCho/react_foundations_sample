import React from 'react'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarSchedulesStyle from '../../styles/cho.inhyo/components/CalendarSchedulesStyle'

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

export default function CalendarSchedules({ schedules }: Props) {
  return (
    <div style={CalendarSchedulesStyle.container}>
      {schedules.map((schedule, idx) =>
        schedule === null ? (
          <div key={idx} style={CalendarSchedulesStyle.nullStyle} />
        ) : schedule.type === 'main' ? (
          <div
            key={String(idx) + String(schedule.week)}
            style={CalendarSchedulesStyle.box}>
            <div
              style={{
                ...CalendarSchedulesStyle.sub,
                position: 'absolute' as const,
                backgroundColor: schedule.color,
                display: schedule.sub ? 'flex' : 'none',
                borderRadius: schedule.subStart
                  ? schedule.subEnd
                    ? '30px'
                    : '30px 0px 0px 30px'
                  : schedule.subEnd
                  ? '0px 30px 30px 0px'
                  : 'unset',
              }}
            />
            <div
              style={{
                ...CalendarSchedulesStyle.main,
                position: 'absolute' as const,
                backgroundColor: schedule.color,
                borderRadius: schedule.start
                  ? schedule.end
                    ? '30px'
                    : '30px 0px 0px 30px'
                  : schedule.end
                  ? '0px 30px 30px 0px'
                  : 'unset',
              }}>
              {schedule.label && (
                <TextView
                  value={schedule.label}
                  style={CalendarSchedulesStyle.label}
                />
              )}
            </div>
          </div>
        ) : (
          <div
            key={schedule.week}
            style={{
              ...CalendarSchedulesStyle.sub,
              backgroundColor: schedule.color,
              borderRadius: schedule.start
                ? schedule.end
                  ? '30px'
                  : '30px 0px 0px 30px'
                : schedule.end
                ? '0px 30px 30px 0px'
                : 'unset',
            }}
          />
        ),
      )}
    </div>
  )
}
