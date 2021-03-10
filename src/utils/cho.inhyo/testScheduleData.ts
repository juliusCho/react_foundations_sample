import moment from 'moment'
import * as polished from 'polished'
import theme from '../../styles/cho.inhyo/global/theme'

export type TestDataType = {
  type: 'sub' | 'main'
  parentNo?: number
  parentName?: string
  subNo?: number[]
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

export const testScheduleData: TestDataType[] = [
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
    name: '파란 채널 새로운 일정11',
    startDate: moment('2021-02-11', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-11', 'YYYY-MM-DD').toDate(),
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
    name: '노란 채널의 다른 새로운 긴 일정 sub',
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
    name: '노란 채널의 다른 새로운 긴 일정 substar 43argy ㅜ무ㅏ자딤수ㅏㅣㄷ',
    startDate: moment('2021-02-08', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-10', 'YYYY-MM-DD').toDate(),
  },
  {
    type: 'main',
    no: 9,
    channel: {
      no: 3,
      color: theme.palette.main.red,
    },
    name: '빨간 채널의 다른 새로 운 일정 틸발구 12 나나sl enlam',
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
    type: 'sub',
    parentNo: 10,
    no: 110,
    channel: {
      no: 4,
      color: theme.palette.main.pink,
    },
    name: '다른 새로운 일정 sub2',
    startDate: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-13', 'YYYY-MM-DD').toDate(),
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
  {
    type: 'sub',
    no: 15,
    parentNo: 13,
    channel: {
      no: 5,
      color: polished.lighten(0.2, theme.palette.main.blue),
    },
    name: '테스트 일정 sub2',
    startDate: moment('2021-01-29', 'YYYY-MM-DD').toDate(),
    endDate: moment('2021-02-03', 'YYYY-MM-DD').toDate(),
  },
]

export type TestIconDataType = {
  no: number
  name: string
  date: Date
  color?: string
  modTime?: Date
}

export const testIconData = {
  channels: [
    {
      no: 1,
      name: '채널1',
      date: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.blue,
      modTime: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 2,
      name: '채널2',
      date: moment('2021-02-12', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.pink,
      modTime: moment('2021-02-12', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 3,
      name: '채널3',
      date: moment('2021-02-26', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.red,
      modTime: moment('2021-02-26', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 4,
      name: '채널4',
      date: moment('2021-02-26', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.yellow,
      modTime: moment('2021-02-26', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 5,
      name: '채널5',
      date: moment('2021-02-06', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.turquoise,
      modTime: moment('2021-02-06', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 6,
      name: '채널6',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.turquoise,
      modTime: moment('2021-02-21', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 7,
      name: '채널7',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.pink,
      modTime: moment('2021-02-21', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 8,
      name: '채널8',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.red,
      modTime: moment('2021-02-21', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 9,
      name: '채널9',
      date: moment('2021-02-24', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.yellow,
      modTime: moment('2021-02-24', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 10,
      name: '채널10',
      date: moment('2021-03-09', 'YYYY-MM-DD').toDate(),
      color: theme.palette.main.yellow,
      modTime: moment('2021-03-09', 'YYYY-MM-DD').toDate(),
    },
  ],
  cards: [
    {
      no: 1,
      name: '카드1',
      date: moment('2021-02-24', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 2,
      name: '카드2',
      date: moment('2021-02-24', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 3,
      name: '카드3',
      date: moment('2021-02-02', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 4,
      name: '카드4',
      date: moment('2021-02-01', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 5,
      name: '카드5',
      date: moment('2021-02-22', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 6,
      name: '카드6',
      date: moment('2021-02-14', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 7,
      name: '카드7',
      date: moment('2021-02-02', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 8,
      name: '카드8',
      date: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 9,
      name: '카드9',
      date: moment('2021-02-28', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 10,
      name: '카드10',
      date: moment('2021-02-27', 'YYYY-MM-DD').toDate(),
    },
  ],
  todos: [
    {
      no: 1,
      name: '할일1',
      date: moment('2021-02-01', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 2,
      name: '할일2',
      date: moment('2021-02-01', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 3,
      name: '할일3',
      date: moment('2021-02-11', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 4,
      name: '할일4',
      date: moment('2021-02-21', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 5,
      name: '할일5',
      date: moment('2021-02-25', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 6,
      name: '할일6',
      date: moment('2021-02-03', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 7,
      name: '할일7',
      date: moment('2021-02-16', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 8,
      name: '할일8',
      date: moment('2021-02-25', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 9,
      name: '할일9',
      date: moment('2021-02-17', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 10,
      name: '할일10',
      date: moment('2021-02-17', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 11,
      name: '할일11',
      date: moment('2021-02-20', 'YYYY-MM-DD').toDate(),
    },
    {
      no: 12,
      name: '할일12',
      date: moment('2021-02-09', 'YYYY-MM-DD').toDate(),
    },
  ],
}
