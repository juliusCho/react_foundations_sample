import React from 'react'
import { useTranslation } from 'react-i18next'
import DueScheduleList from '../../components/cho.inhyo/DueScheduleItem'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import testScheduleData, {
  TestDataType,
} from '../../utils/cho.inhyo/testScheduleData'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  platform: 'web' | 'mobile'
  date: Date
}

export default function DateScheduleListContainer({ platform, date }: Props) {
  const { t } = useTranslation()

  const [showMissionList, setShowMissionList] = React.useState(false)
  const [showAttendList, setShowAttendList] = React.useState(false)

  const onClickMissionShow = () => {
    setShowMissionList(!showMissionList)
  }

  const onClickMission = (data: TestDataType) => {
    //
  }

  const onClickAttendShow = () => {
    setShowAttendList(!showAttendList)
  }

  const onClickAttend = (data: TestDataType) => {
    //
  }

  return (
    <Box direction="vertical">
      <Box direction="horizontal" onClick={onClickMissionShow}>
        <TextView value={t('calendar.mission')} />
        <IconButton
          icon={showMissionList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN}
        />
      </Box>
      {showMissionList && (
        <DueScheduleList
          date={date}
          dataList={testScheduleData}
          type="mission"
          onClick={onClickMission}
        />
      )}
      <Box direction="horizontal" onClick={onClickAttendShow}>
        <TextView value={t('calendar.attend')} />
        <IconButton icon={showAttendList ? Icons.ANGLE_UP : Icons.ANGLE_DOWN} />
      </Box>
      {showAttendList && (
        <DueScheduleList
          date={date}
          dataList={testScheduleData}
          type="attend"
          onClick={onClickAttend}
        />
      )}
    </Box>
  )
}
