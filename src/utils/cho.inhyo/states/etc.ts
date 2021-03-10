import Recoil from 'recoil'

export const loadingState = Recoil.atom({
  key: 'loadingState',
  default: true,
})

export type CalendarFilterType = {
  channelNo?: number
}

export const calendarFilterState = Recoil.atom({
  key: 'calendarFilterState',
  default: null,
})
