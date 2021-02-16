import moment from 'moment'
import * as polished from 'polished'
import theme from '../../styles/cho.inhyo/global/theme'

export type TestDataType = {
  type: 'sub' | 'main'
  parentNo?: number
  subNo?: number
  no: number
  channel: {
    no: number
    color: string
  }
  name: string
  startDate: Date
  endDate?: Date
  subStartDate?: Date
  subEndDate?: Date
}

const testScheduleData: TestDataType[] = [
  {
    type: 'sub',
    parentNo: 2,
    no: 1,
    channel: {
      no: 1,
      color: theme.palette.main.turquoise,
    },
    name: '새로운 일정 sub',
    startDate: moment('2021-02-07', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 2,
    channel: {
      no: 1,
      color: theme.palette.main.turquoise,
    },
    name: '새로운 일정',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 3,
    channel: {
      no: 1,
      color: theme.palette.main.turquoise,
    },
    name: '파란 채널 새로운 일정1',
    startDate: moment('2021-02-11', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-12', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'sub',
    parentNo: 3,
    no: 4,
    channel: {
      no: 1,
      color: theme.palette.main.turquoise,
    },
    name: '파란 채널 새로운 일정1 sub',
    startDate: moment('2021-02-11', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-12', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 5,
    channel: {
      no: 1,
      color: theme.palette.main.turquoise,
    },
    name: '파란 채널 새로운 일정2',
    startDate: moment('2021-02-05', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-15', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'sub',
    no: 6,
    parentNo: 5,
    channel: {
      no: 1,
      color: theme.palette.main.turquoise,
    },
    name: '파란 채널 새로운 일정2 sub',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-14', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'sub',
    no: 7,
    parentNo: 8,
    channel: {
      no: 2,
      color: theme.palette.main.yellow,
    },
    name: '노란 채널의 다른 새로운 긴 일정',
    startDate: moment('2021-02-11', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-14', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 8,
    channel: {
      no: 2,
      color: theme.palette.main.yellow,
    },
    name: '노란 채널의 다른 새로운 긴 일정 substar 43argy',
    startDate: moment('2021-02-08', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-12', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 9,
    channel: {
      no: 3,
      color: theme.palette.main.red,
    },
    name: '빨간 채널의 다른 새로운 일정 틸발구 12',
    startDate: moment('2021-02-08', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 10,
    channel: {
      no: 4,
      color: theme.palette.main.pink,
    },
    name: '다른 새로운 일정',
    startDate: moment('2021-02-10', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'sub',
    parentNo: 10,
    no: 11,
    channel: {
      no: 4,
      color: theme.palette.main.pink,
    },
    name: '다른 새로운 일정 sub',
    startDate: moment('2021-02-10', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-12', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 12,
    channel: {
      no: 5,
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '다른 새로운 일정',
    startDate: moment('2021-02-10', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-10', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 13,
    channel: {
      no: 5,
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정',
    startDate: moment('2021-01-27', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-01-29', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'sub',
    no: 14,
    parentNo: 13,
    channel: {
      no: 5,
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정 sub',
    startDate: moment('2021-01-26', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-02', 'YYYY-MM-DD').toDate(),
  },
]

export default testScheduleData
