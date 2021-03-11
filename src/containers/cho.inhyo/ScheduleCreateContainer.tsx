import React from 'react'
import { useTranslation } from 'react-i18next'
import ScheduleCreateContainerStyle from '../../styles/cho.inhyo/containers/ScheduleCreateContainerStyle'

interface Props {
  platform: 'web' | 'mobile'
  date: Date
}

export default function ScheduleCreateContainer({ platform, date }: Props) {
  const { t } = useTranslation()

  return (
    <div style={ScheduleCreateContainerStyle.container}>
      {t('calendar.create')}
    </div>
  )
}
