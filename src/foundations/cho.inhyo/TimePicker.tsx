import moment from 'moment'
import { default as TmPicker } from 'rc-time-picker'
import React from 'react'
import TimePickerStyle from '../../styles/cho.inhyo/foundation/TimePickerStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import TextView from './TextView'

type Props = {
  id?: 'start' | 'end'
  value?: string
  date?: Date
  onChange: (time?: string, id?: 'start' | 'end') => void
  style?: React.CSSProperties
  clearIcon?: string
}

export default function TimePicker({
  id,
  value,
  date,
  onChange,
  style,
  clearIcon,
}: Props) {
  const onOpen = () => {
    onChange(value ? value : '00:00', id)
  }

  const onTimeChange = (e: moment.Moment) => {
    if (e === null) {
      onChange(undefined, id)
      return
    }
    if (!e.isValid()) return

    onChange(e === null ? undefined : e.format('HH:mm'), id)
  }

  const clickedClear = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!date) return

    onChange(value ? undefined : '00:00', id)
  }

  const iconClear = (
    <i
      className={clearIcon}
      style={{
        color: '#3067A8',
        width: '20px',
        height: '20px',
        fontSize: '14px',
        position: 'absolute' as const,
        bottom: value ? '2px' : '8px',
        left: value
          ? id === 'end'
            ? '6.5px'
            : '5.5px'
          : (id ? (id === 'start' ? '25px' : '152px') : undefined) || '11px',
      }}
      onClick={clickedClear}
    />
  )

  return (
    <TimePickerStyle.container style={style}>
      <TextView
        value={date ? moment(date).format('YYYY/MM/DD') : ''}
        style={{ width: '90px', ...theme.font.text2 }}
      />
      <TimePickerStyle.picker>
        <TmPicker
          value={
            value
              ? moment(moment(new Date()).format('YYYY-MM-DD') + ` ${value}:00`)
              : undefined
          }
          showSecond={false}
          onOpen={onOpen}
          onChange={onTimeChange}
          className="time-picker"
          format={'HH:mm'}
          use12Hours={false}
          inputReadOnly
          clearIcon={iconClear}
          disabled={!date}
        />
        {!value && iconClear}
      </TimePickerStyle.picker>
    </TimePickerStyle.container>
  )
}
