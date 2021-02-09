import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import DateTimePicker from '../../components/cho.inhyo/DateTimePicker'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarContainerStyle from '../../styles/cho.inhyo/containers/CalendarContainerStyle'
import theme from '../../styles/cho.inhyo/global/theme'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { Days, Months } from '../../utils/cho.inhyo/i18n'
import { loadingState } from '../../utils/cho.inhyo/states'
import { Icons } from '../../utils/cho.inhyo/types'
import CalendarDateContainer from './CalendarDateContainer'

interface Props {
  baseDate: Date
  onChangeMonth: (date: Date) => void
  chosenDate?: Date
  onClick: (date: Date) => void
  startDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export default function CalendarContainer({
  baseDate,
  onChangeMonth,
  chosenDate,
  onClick,
  startDay = 0,
}: Props) {
  const { t } = useTranslation()

  const setLoading = Recoil.useSetRecoilState(loadingState)

  const [year, setYear] = React.useState(
    Number(moment(new Date()).format('YYYY')),
  )
  const [month, setMonth] = React.useState(
    Number(moment(new Date()).format('MM')),
  )
  const [yearMonth, setYearMonth] = React.useState(
    moment(new Date()).format('YYYYMM'),
  )
  const [showYearMonthModal, setShowYearMonthModal] = React.useState(false)
  const [actionProcessing, setActionProcessing] = React.useState(false)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      if (baseDate) {
        setYear(() => Number(moment(baseDate).format('YYYY')))
        setMonth(() => Number(moment(baseDate).format('MM')))
      }
      setLoading(() => false)
    }
  }, [isMounted, baseDate])

  React.useEffect(() => {
    if (isMounted()) {
      if (yearMonth.substr(4, 2) === helper.makeTwoDigits(month)) return

      setYearMonth(() => String(year) + helper.makeTwoDigits(month))
    }
  }, [isMounted, year, month, helper.makeTwoDigits, yearMonth])

  const DayList: React.ReactNode[] = []

  let dayCount = 0
  for (let dayNum: number = startDay; dayNum < 7; dayNum++) {
    DayList.push(
      <Box
        key={Days[dayNum]}
        direction="horizontal"
        style={CalendarContainerStyle.dayHeader}>
        <TextView
          value={t(`calendar.${Days[dayNum]}`)}
          style={{
            ...CalendarContainerStyle.day,
            color:
              dayNum === 0 || dayNum === 6
                ? theme.palette.main.red
                : theme.palette.mono.darkGray,
          }}
        />
      </Box>,
    )

    dayCount++
    if (dayCount === 7) {
      break
    } else if (dayNum === 6 && dayCount < 7) {
      dayNum = -1
    }
  }

  const onChange = (increment: boolean) => {
    setActionProcessing(true)
    if (month === 1) {
      if (increment) {
        setMonth(month + 1)
      } else {
        setYear(year - 1)
        setMonth(12)
      }
    } else if (month === 12) {
      if (increment) {
        setYear(year + 1)
        setMonth(1)
      } else {
        setMonth(month - 1)
      }
    } else {
      setMonth(month + (increment ? 1 : -1))
    }
  }

  const onSelect = (date?: Date | Array<Date | undefined>) => {
    if (date && !Array.isArray(date)) {
      setYear(Number(moment(date).format('YYYY')))
      setMonth(Number(moment(date).format('MM')))
      setShowYearMonthModal(false)
    }
  }

  return (
    <div style={CalendarContainerStyle.container}>
      <div style={CalendarContainerStyle.header}>
        <Box direction="horizontal" style={CalendarContainerStyle.headerTop}>
          <div style={CalendarContainerStyle.pickerModal}>
            <DateTimePicker
              date={new Date(year, month - 1, 1)}
              changeDate={onSelect}
              isOpen={showYearMonthModal}
              datePick={false}
            />
          </div>
          <Box
            direction="horizontal"
            style={CalendarContainerStyle.headerTopSub}>
            <IconButton
              icon={Icons.ANGLE_LEFT}
              onClick={() => onChange(false)}
              style={CalendarContainerStyle.topItem}
            />
            <LabelButton
              value={t('calendar.yearMonth', {
                year,
                month: t(`calendar.${Months[month - 1]}`),
              })}
              style={CalendarContainerStyle.topItem}
              onClick={() => setShowYearMonthModal(true)}
            />
            <IconButton
              icon={Icons.ANGLE_RIGHT}
              onClick={() => onChange(true)}
              style={CalendarContainerStyle.topItem}
            />
          </Box>
        </Box>
        <Box direction="horizontal" style={CalendarContainerStyle.dayContainer}>
          {DayList}
        </Box>
      </div>
      <div style={CalendarContainerStyle.dateContainer}>
        <CalendarDateContainer
          onChangeMonth={onChangeMonth}
          chosenDate={chosenDate}
          yearMonth={yearMonth}
          onClick={onClick}
          actionProcessing={actionProcessing}
          setActionProcessing={setActionProcessing}
        />
      </div>
    </div>
  )
}
