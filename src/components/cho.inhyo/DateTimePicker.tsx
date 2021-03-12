import moment from 'moment'
import 'rc-time-picker/assets/index.css'
import React from 'react'
import { Detail, ViewCallbackProperties } from 'react-calendar'
import DatePicker from 'react-date-picker'
import { useTranslation } from 'react-i18next'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import TimePicker from '../../foundations/cho.inhyo/TimePicker'
import DateTimePickerStyle from '../../styles/cho.inhyo/components/DateTimePickerStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { Icons } from '../../utils/cho.inhyo/types'
import TimePickerRange from './TimePickerRange'

interface Props {
  date?: Date | Array<Date | undefined>
  changeDate:
    | ((date?: Date | Array<Date | undefined>) => void)
    | React.Dispatch<
        React.SetStateAction<Date | Array<Date | undefined> | undefined>
      >
  isOpen: boolean
  selectRange?: boolean
  timeRange?: boolean
  timeDisplay?: boolean
  maxDate?: Date
  minDate?: Date
  calculatedTop?: string
  calculatedLeft?: string
  datePick?: boolean
}

export default function DateTimePicker({
  date,
  changeDate,
  isOpen,
  selectRange = false,
  timeDisplay = false,
  timeRange = false,
  maxDate,
  minDate,
  calculatedTop,
  calculatedLeft,
  datePick = true,
}: Props) {
  const { t } = useTranslation()

  const [viewMode, setViewMode] = React.useState<Detail>(
    datePick ? 'month' : 'year',
  )
  const [containerHeight, setContainerHeight] = React.useState<string>(
    timeDisplay ? '29.375rem' : selectRange ? '26.25rem' : '21.875rem',
  )
  const [value, setValue] = React.useState<
    Date | Array<Date | undefined> | undefined
  >()
  const [timeSelect, setTimeSelect] = React.useState<boolean | Array<boolean>>(
    selectRange ? [false, false] : false,
  )
  const [timeValue, setTimeValue] = React.useState<
    string | Array<string | undefined> | undefined
  >()

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setViewMode(() => (datePick ? 'month' : 'year'))

      const initialize = () => {
        setValue(() => undefined)
        setTimeSelect(() => false)
        setTimeValue(() => undefined)
      }

      if (date) {
        if (Array.isArray(date)) {
          const momentDt = [
            (date as Date[])[0] ? moment((date as Date[])[0]) : undefined,
            (date as Date[])[1] ? moment((date as Date[])[1]) : undefined,
          ]

          if (!!momentDt[0] && !!momentDt[1]) {
            initialize()
          } else if (!momentDt[0] || !momentDt[1]) {
            setValue(() =>
              momentDt[0] ? momentDt[0].toDate() : momentDt[1]?.toDate(),
            )
            setTimeSelect(() =>
              momentDt[0]
                ? momentDt[0].format('HH:mm') !== '00:00'
                : momentDt[1]?.format('HH:mm') !== '00:00',
            )
            setTimeValue(() =>
              momentDt[0]
                ? momentDt[0].format('HH:mm') === '00:00'
                  ? undefined
                  : momentDt[0].format('HH:mm')
                : momentDt[1]?.format('HH:mm') === '00:00'
                ? undefined
                : momentDt[1]?.format('HH:mm'),
            )
          } else {
            setValue(() => [
              momentDt[0] ? momentDt[0].toDate() : undefined,
              momentDt[1] ? momentDt[1].toDate() : undefined,
            ])
            setTimeSelect(() => [
              !momentDt[0] || momentDt[0].format('HH:mm') !== '00:00',
              !momentDt[1] || momentDt[1].format('HH:mm') !== '00:00',
            ])
            setTimeValue(() => [
              !momentDt[0] || momentDt[0].format('HH:mm') === '00:00'
                ? undefined
                : momentDt[0].format('HH:mm'),
              !momentDt[1] || momentDt[1].format('HH:mm') === '00:00'
                ? undefined
                : momentDt[1].format('HH:mm'),
            ])
          }
        } else {
          const momentDt = moment(date)

          setValue(() => momentDt.toDate())
          setTimeSelect(() => momentDt.format('HH:mm') !== '00:00')
          setTimeValue(() =>
            momentDt.format('HH:mm') === '00:00'
              ? undefined
              : momentDt.format('HH:mm'),
          )
        }
      } else {
        initialize()
      }
    }
  }, [isMounted, isOpen, date, datePick, selectRange])

  React.useEffect(() => {
    if (isMounted()) {
      switch (viewMode) {
        case 'month':
          setContainerHeight(() =>
            timeDisplay ? '29.375rem' : selectRange ? '26.25rem' : '21.875rem',
          )
          break
        case 'century':
          setContainerHeight(() =>
            timeDisplay ? '35.625rem' : selectRange ? '32.5rem' : '28.125rem',
          )
          break
        default:
          setContainerHeight(() =>
            timeDisplay ? '31.25rem' : selectRange ? '28.125rem' : '23.75rem',
          )
          break
      }
    }
  }, [isMounted, viewMode, timeDisplay])

  const onViewChange = (props: ViewCallbackProperties) => {
    // eslint-disable-next-line react/prop-types
    if (!datePick && props.view === 'month') return

    // eslint-disable-next-line react/prop-types
    setViewMode(props.view)
  }

  const onClickDay = (pickedDate: Date) => {
    if (!selectRange && !timeRange) return

    if (Array.isArray(value) || value === undefined) {
      setValue(pickedDate)
      setTimeSelect(false)
      setTimeValue(undefined)
    } else if (selectRange) {
      if (
        Number(moment(pickedDate).format('YYYYMMDD')) <
        Number(moment(value).format('YYYYMMDD'))
      ) {
        setValue([pickedDate, value])
        setTimeSelect([false, timeSelect as boolean])
        setTimeValue([undefined, timeValue as string])
      } else {
        setValue([value, pickedDate])
        setTimeSelect([timeSelect as boolean, false])
        setTimeValue([timeValue as string, undefined])
      }
    } else if (timeRange) {
      setValue(pickedDate)
      setTimeSelect([false, false])
      setTimeValue([undefined, undefined])
    }
  }

  const onDateChange = (pickedDate: Date | Date[]) => {
    if (selectRange || timeRange) return

    setValue(pickedDate)
  }

  const onTimeChange = (pickedTime?: string) => {
    setTimeValue(pickedTime)
    setTimeSelect(!!pickedTime)

    const dtStr = helper.dateValidator(
      moment(value as Date).format('YYYY.MM.DD'),
    )
    const newDate = helper.convertToDate(
      moment(dtStr).format('YYYY-MM-DD') +
        (pickedTime ? ` ${pickedTime}:00` : ' 00:00:00'),
    )

    setValue(newDate)
  }

  const onTimeRangeChange = (pickedTime: Array<string | undefined>) => {
    setTimeValue(pickedTime)
    setTimeSelect([!!pickedTime[0], !!pickedTime[1]])
    if (timeRange && !Array.isArray(value)) {
      setValue([
        helper.convertToDate(
          moment(value).format('YYYY-MM-DD') +
            (pickedTime[0] ? ` ${pickedTime[0]}:00` : ' 00:00:00'),
        ),
        helper.convertToDate(
          moment(value).format('YYYY-MM-DD') +
            (pickedTime[1] ? ` ${pickedTime[1]}:00` : ' 00:00:00'),
        ),
      ])
    }
  }

  const onChange = (pickedDate?: Date | Array<Date | undefined>) => {
    let newDate: Date | Array<Date | undefined> | undefined

    if (selectRange || timeRange) {
      if (timeDisplay) {
        if (Array.isArray(timeValue)) {
          newDate = Array.isArray(pickedDate)
            ? [
                pickedDate[0]
                  ? helper.convertToDate(
                      moment(pickedDate[0]).format('YYYY-MM-DD') +
                        (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
                    )
                  : undefined,
                pickedDate[1]
                  ? helper.convertToDate(
                      moment(pickedDate[1]).format('YYYY-MM-DD') +
                        (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
                    )
                  : undefined,
              ]
            : pickedDate
            ? timeRange
              ? [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
                  ),
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
                  ),
                ]
              : [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ),
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ),
                ]
            : undefined
        } else {
          newDate = Array.isArray(pickedDate)
            ? [
                pickedDate[0]
                  ? helper.convertToDate(
                      moment(pickedDate[0]).format('YYYY-MM-DD') +
                        (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                    )
                  : undefined,
                pickedDate[1]
                  ? helper.convertToDate(
                      moment(pickedDate[1]).format('YYYY-MM-DD') +
                        (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                    )
                  : undefined,
              ]
            : pickedDate
            ? timeRange
              ? [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  ),
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  ),
                ]
              : [
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ),
                  helper.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') + ' 00:00:00',
                  ),
                ]
            : undefined
        }
      } else {
        newDate = [
          helper.convertToDate(
            moment(
              Array.isArray(pickedDate)
                ? pickedDate[0] || pickedDate[1]
                : pickedDate,
            ).format('YYYY-MM-DD') + ' 00:00:00',
          ),
          helper.convertToDate(
            moment(
              Array.isArray(pickedDate)
                ? pickedDate[1] || pickedDate[0]
                : pickedDate,
            ).format('YYYY-MM-DD') + ' 00:00:00',
          ),
        ]
      }
    } else {
      newDate = pickedDate
        ? helper.convertToDate(
            moment(pickedDate as Date).format('YYYY-MM-DD') +
              (timeValue ? ` ${timeValue as string}:00` : ' 00:00:00'),
          )
        : undefined
    }
    setValue(newDate)

    return newDate
  }

  const onCalendarClose = () => {
    if (!selectRange && !timeDisplay) {
      if (!value && !date) {
        changeDate(undefined)
      } else if (
        moment(value as Date).format('YYYY-MM-DD') !==
        moment(date as Date).format('YYYY-MM-DD')
      ) {
        changeDate(onChange(value))
      }
    }
  }

  const onClickExterior = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    changeDate(date)
  }

  const onClickMonth = (date: Date) => {
    setValue(date)
    changeDate(date)
  }

  return (
    <>
      <DateTimePickerStyle.exterior
        onClick={onClickExterior}
        style={{
          display: isOpen ? 'block' : 'none',
          height: `calc(1000% + ${calculatedTop || '0.063rem'})`,
        }}
      />
      <DateTimePickerStyle.container
        style={{
          display: isOpen ? 'block' : 'none',
          height: containerHeight,
          top: calculatedTop,
          left: calculatedLeft,
        }}>
        <DatePicker
          onClickDay={onClickDay}
          onChange={onDateChange}
          value={
            !!value && Array.isArray(value) && !value[1]
              ? undefined
              : (value as Date | Date[] | undefined)
          }
          required={true}
          yearPlaceholder="YYYY"
          monthPlaceholder="MM"
          dayPlaceholder="DD"
          format="yyyy.MM.dd"
          maxDate={maxDate}
          minDate={minDate}
          isOpen={isOpen}
          onCalendarClose={onCalendarClose}
          selectRange={selectRange}
          onClickMonth={datePick ? undefined : onClickMonth}
          onViewChange={onViewChange}
          view={viewMode}
          defaultView={datePick ? undefined : 'year'}
          calendarType="US"
        />
        {timeDisplay &&
          isOpen &&
          ((selectRange && Array.isArray(value)) || timeRange ? (
            <TimePickerRange
              value={timeValue as string[] | undefined}
              date={value}
              onChange={onTimeRangeChange}
              clearIcons={[
                (timeSelect as boolean[])[0]
                  ? Icons.RADIO_CHECKED
                  : Icons.RADIO_BLANK,
                (timeSelect as boolean[])[1]
                  ? Icons.RADIO_CHECKED
                  : Icons.RADIO_BLANK,
              ]}
              timeRange={timeRange}
            />
          ) : (
            <TimePicker
              value={timeValue as string | undefined}
              date={value as Date | undefined}
              onChange={onTimeChange}
              clearIcon={
                (timeSelect as boolean)
                  ? Icons.RADIO_CHECKED
                  : Icons.RADIO_BLANK
              }
            />
          ))}
        {(timeDisplay || selectRange) && (
          <LabelButton
            value={t('etc.ok')}
            onClick={() => changeDate(onChange(value))}
            style={{
              position: 'absolute' as const,
              bottom: '1.25rem',
              color: theme.palette.mono.white,
              backgroundColor: theme.palette.main.blue,
              padding: '0.313rem',
              minWidth: '3.125rem',
              left: '40%',
            }}
          />
        )}
      </DateTimePickerStyle.container>
    </>
  )
}
