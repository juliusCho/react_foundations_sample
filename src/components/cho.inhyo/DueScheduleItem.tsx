import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import { TestDataType } from '../../utils/cho.inhyo/testScheduleData'
import { Icons } from '../../utils/cho.inhyo/types'

interface Props {
  date: Date
  dataList: TestDataType[]
  type: 'mission' | 'attend'
  onClick: (data: TestDataType) => void
}

export default function DueScheduleList({
  date,
  dataList,
  type,
  onClick,
}: Props) {
  const { t } = useTranslation()

  return (
    <Box direction="vertical">
      {dataList
        .filter(
          (data: TestDataType) =>
            data.type === type &&
            moment(data.dueDate).format('YYYY-MM-DD') ===
              moment(date).format('YYYY-MM-DD'),
        )
        .map((data: TestDataType) => (
          <Box
            key={data.type + `_${String(data.no)}`}
            direction="horizontal"
            onClick={() => onClick(data)}>
            <IconButton
              icon={type === 'mission' ? Icons.MISSION : Icons.ATTEND}
            />
            <Box direction="vertical">
              <TextView value={data.channelName} />
              <TextView value={data.name} />
            </Box>
            <Box direction="vertical">
              <TextView
                value={t('calendar.dueto', {
                  date: moment(data.dueDate).format('a HH:mm'),
                })}
              />
            </Box>
          </Box>
        ))}
    </Box>
  )
}
