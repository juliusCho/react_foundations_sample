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
