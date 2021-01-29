import moment from 'moment'

export type TestDataType = {
  type: 'mission' | 'attend'
  no: number
  channelName: string
  name: string
  dueDate: Date
}

const testScheduleData: TestDataType[] = [
  {
    type: 'mission',
    no: 1,
    channelName: '테스트 채널',
    name: 'aegagaewg',
    dueDate: moment('2021-01-08 14:43:00').toDate(),
  },
  {
    type: 'attend',
    no: 1,
    channelName: '테스트 채널',
    name: 'bbbbbbbb',
    dueDate: moment('2021-06-23 18:43:00').toDate(),
  },
  {
    type: 'attend',
    no: 2,
    channelName: '테스트 채널',
    name: '3444gbbbbbbbb',
    dueDate: moment('2021-04-18 06:34:00').toDate(),
  },
  {
    type: 'mission',
    no: 2,
    channelName: '테스트 채널',
    name: 'q3q34hh43ㅗ3',
    dueDate: moment('2021-01-08 20:54:00').toDate(),
  },
]

export default testScheduleData
