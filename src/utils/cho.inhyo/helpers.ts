import moment from 'moment'

// 날짜 입력 유효성체크
export const dateValidator = (input: string): Date => {
  const tmp = input.split('.')

  if (Number(tmp[0]) < 2000) tmp[0] = '2000'

  if (Number(tmp[1]) === 0) tmp[1] = '01'
  else if (Number(tmp[1]) > 12) tmp[1] = '12'

  if (Number(tmp[2]) === 0) tmp[2] = '01'
  else if (
    Number(tmp[2]) > 26 &&
    !moment(tmp.join('.'), 'YYYY.MM.DD', true).isValid()
  ) {
    let dt = 31
    let text = `${tmp[0]}.${tmp[1]}.${String(dt)}`
    while (!moment(text, 'YYYY.MM.DD', true).isValid()) {
      dt--
      text = `${tmp[0]}.${tmp[1]}.${String(dt)}`
    }
    tmp[2] = String(dt)
  }
  return new Date(Number(tmp[0]), Number(tmp[1]) - 1, Number(tmp[2]), 0, 0, 0)
}

// Convert integrated formatted string to Date
export const convertToDate = (input: string) => {
  const strings: string[] = input.split(/[- :]/)
  const arr: number[] = strings.map((str) => Number(str))
  return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
}

// Date class object with integrated format
export const getToday = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

// Add zero for 1 digit number to string
export const makeTwoDigits = (num: number) => {
  return num < 0 ? '00' : num < 10 ? `0${num}` : String(num)
}

// extract year, month, date, disability from calendar date id
export const extractValFromId = (id: string) => {
  const extractedYear = id.substr(0, 4)
  const extractedMonth = id.substr(id.indexOf('-') + 1, 2)
  const extractedDate = id.substr(id.lastIndexOf('-') + 1, 2)
  const disabled = id.indexOf(':disabled') > -1

  return {
    extractedYear,
    extractedMonth,
    extractedDate,
    disabled,
  }
}

// change year based on month
export const setYear = (year: number, month: number) => {
  return String(month < 0 ? year - 1 : month > 11 ? year + 1 : year)
}

// change month based on month seq
export const setMonth = (month: number) => {
  return makeTwoDigits(month < 0 ? 12 + month : month > 11 ? month - 12 : month)
}

// get day seq based on config seq
export const getBaseSeq = (day: number, base: number) => {
  switch (base) {
    case 0:
      return day
    default:
      const diff = day - base
      return diff < 0 ? 7 + diff : diff
  }
}

// compare two dates
export const compareDate = (day1: Date, day2: Date) => {
  return moment(day1).format('YYYYMMDD') === moment(day2).format('YYYYMMDD')
}

// get date difference count
export const getDiffDayCnt = (day1: Date, day2: Date) => {
  const differenceInTime = Math.abs(day1.getTime() - day2.getTime())
  return differenceInTime / (1000 * 3600 * 24)
}
