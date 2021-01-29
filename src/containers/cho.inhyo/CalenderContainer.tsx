import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import CalendarContainerStyle from '../../styles/cho.inhyo/containers/CalendarContainerStyle'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { Months } from '../../utils/cho.inhyo/i18n'
import { loadingState } from '../../utils/cho.inhyo/states'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  dueDate?: Date
  onClick: (date: Date) => void
}

export default function CalendarContainer({ dueDate, onClick }: Props) {
  const { t } = useTranslation()

  const setLoading = Recoil.useSetRecoilState(loadingState)

  const [year, setYear] = React.useState(
    Number(moment(new Date()).format('YYYY')),
  )
  const [month, setMonth] = React.useState(
    Number(moment(new Date()).format('MM')),
  )
  const [showYearModal, setShowYearModal] = React.useState(false)
  const [showMonthModal, setShowMonthModal] = React.useState(false)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      if (dueDate) {
        setYear(() => Number(moment(dueDate).format('YYYY')))
        setMonth(() => Number(moment(dueDate).format('MM')))
      }
      setLoading(() => false)
    }
  }, [isMounted, dueDate])

  const MonthList: React.ReactNode[] = []
  for (let monthNum = 1; monthNum <= 12; monthNum++) {
    MonthList.push(
      <Box
        key={monthNum}
        direction="vertical"
        style={CalendarContainerStyle.monthContainer}>
        <Box
          direction="horizontal"
          onClick={() => setShowMonthModal(true)}
          style={CalendarContainerStyle.monthHeader}>
          <TextView
            value={t(`calendar.${Months[monthNum - 1]}`)}
            style={CalendarContainerStyle.month}
          />
        </Box>
        <Box direction="horizontal">
          <></>
        </Box>
      </Box>,
    )
  }

  return (
    <Box direction="vertical" style={CalendarContainerStyle.container}>
      <Box direction="horizontal" style={CalendarContainerStyle.yearHeader}>
        <IconButton
          icon={Icons.ANGLE_LEFT}
          onClick={() => setYear(year - 1)}
          style={CalendarContainerStyle.year}
        />
        <LabelButton
          value={String(year)}
          onClick={() => setShowYearModal(true)}
          style={CalendarContainerStyle.year}
        />
        <IconButton
          icon={Icons.ANGLE_RIGHT}
          onClick={() => setYear(year + 1)}
          style={CalendarContainerStyle.year}
        />
      </Box>
      {MonthList}
    </Box>
  )
}
