import moment from 'moment'
import React from 'react'
import CalendarDate from '../../components/cho.inhyo/CalendarDate'
import Box from '../../foundations/cho.inhyo/Box'
import CalendarDateContainerStyle from '../../styles/cho.inhyo/containers/CalendarDateContainerStyle'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'

interface Props {
  startDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  onChangeMonth: (date: Date) => void
  chosenDate?: Date
  yearMonth: string
  onClick: (date: Date) => void
  actionProcessing: boolean
  setActionProcessing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CalendarDateContainer({
  startDay = 0,
  onChangeMonth,
  chosenDate,
  yearMonth,
  onClick,
  actionProcessing,
  setActionProcessing,
}: Props) {
  const isMounted = useIsMounted()

  const _dateBody = React.createRef<HTMLDivElement>()

  const [_dateList, set_dateList] = React.useState<
    Array<React.RefObject<HTMLDivElement> | null>
  >([])
  const [dateRow, setDateRow] = React.useState<React.ReactNode[]>([])
  const [offsetY, setOffsetY] = React.useState(0)
  const [lastScrollTop, setLastScrollTop] = React.useState(0)
  const [init, setInit] = React.useState(true)

  const focusMonth = (focusingYear: number, focusingMonth: number) => {
    if (!_dateList || _dateList.length === 0) return
    const _focusTargets = _dateList.filter((_date) => {
      if (_date?.current) {
        const id = _date.current.attributes[0].value.replace(':disabled', '')
        const dt = `${focusingYear}-${helper.makeTwoDigits(focusingMonth)}`

        if (id === `${dt}-12` || id === `${id}-01`) {
          return true
        }
      }
    })

    if (_focusTargets.length > 0) {
      _focusTargets.forEach((_date) => {
        if (_date?.current) {
          const id = _date.current.attributes[0].value.replace(':disabled', '')
          const dt = `${focusingYear}-${helper.makeTwoDigits(focusingMonth)}-12`

          if (id === dt) {
            _date.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            })
          } else {
            _date.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            })
          }
        }
      })
    }
  }

  const onClickDate = (date: Date) => {
    setActionProcessing(true)

    focusMonth(date.getFullYear(), date.getMonth())

    onClick(date)
  }

  React.useEffect(() => {
    if (isMounted()) {
      if (!init) return
      if (_dateBody.current && dateRow.length > 0) {
        if (offsetY === 0) {
          setOffsetY(() =>
            ((element?: HTMLDivElement | null) => {
              let offsetTop = 0
              if (!element) return offsetTop

              do {
                if (!isNaN(element.offsetHeight)) {
                  offsetTop += element.offsetHeight
                }
              } while ((element = element.offsetParent as HTMLDivElement))

              return offsetTop
            })(_dateBody?.current),
          )
        } else {
          focusMonth(
            Number(yearMonth.substr(0, 4)),
            Number(yearMonth.substr(4, 2)) - 1,
          )
          setInit(() => false)
        }
      }
    }
  }, [isMounted, init, _dateBody.current, dateRow.length, yearMonth, offsetY])

  React.useEffect(() => {
    if (!isMounted()) return

    const month = Number(yearMonth.substr(4, 2)) - 1
    const DateRow: React.ReactNode[] = []
    const _tmpDateList: Array<React.RefObject<HTMLDivElement> | null> = []

    for (let monthNum = month - 2; monthNum <= month + 2; monthNum++) {
      const year = Number(
        helper.setYear(Number(yearMonth.substr(0, 4)), monthNum),
      )

      let seqOfFirstDayOfThisMonth = 0
      let lastDayOfThisMonth = 0
      let lastDayOfLastMonth = 0

      if (monthNum < 0) {
        seqOfFirstDayOfThisMonth = helper.getBaseSeq(
          moment(new Date(year, 12 + monthNum, 1)).day(),
          startDay,
        )
        lastDayOfThisMonth = new Date(year, 12 + monthNum + 1, 0).getDate()
        lastDayOfLastMonth = new Date(year, 12 + monthNum, 0).getDate()
      } else if (monthNum > 11) {
        seqOfFirstDayOfThisMonth = helper.getBaseSeq(
          moment(new Date(year, monthNum - 12, 1)).day(),
          startDay,
        )
        lastDayOfThisMonth = new Date(year, monthNum - 12 + 1, 0).getDate()
        lastDayOfLastMonth = new Date(year, monthNum - 12, 0).getDate()
      } else {
        seqOfFirstDayOfThisMonth = helper.getBaseSeq(
          moment(new Date(year, monthNum, 1)).day(),
          startDay,
        )
        lastDayOfThisMonth = new Date(year, monthNum + 1, 0).getDate()
        lastDayOfLastMonth = new Date(year, monthNum, 0).getDate()
      }

      const displayWeekCnt = Math.ceil(
        (seqOfFirstDayOfThisMonth + lastDayOfThisMonth) / 7,
      )

      let firstDayOfThisMonth = 1

      for (
        let displayWeekNum = 1;
        displayWeekNum <= displayWeekCnt;
        displayWeekNum++
      ) {
        const DateList: React.ReactNode[] = []

        const constructDateRow = (
          displayDate?: number[],
          beforeOrAfter?: 'before' | 'after',
        ) => {
          for (
            let num = displayDate ? 0 : 1;
            num < (displayDate ? 7 : 8);
            num++
          ) {
            const _date = React.createRef<HTMLDivElement>()

            DateList.push(
              <CalendarDate
                key={`${year}_${helper.makeTwoDigits(
                  monthNum,
                )}_${displayWeekNum}_${displayDate ? displayDate[num] : num}`}
                chosenDate={chosenDate}
                startWeekOffset={displayDate ? 0 - num : 1 - num}
                day={displayDate ? displayDate[num] : num}
                year={year}
                month={Number(helper.setMonth(monthNum))}
                beforeOrAfter={beforeOrAfter}
                thisMonth={
                  beforeOrAfter
                    ? beforeOrAfter === 'before'
                      ? (displayDate ? displayDate[num] : num) < 7
                      : (displayDate ? displayDate[num] : num) > 6
                    : month === monthNum
                }
                onClick={onClickDate}
                _date={_date}>
                {year === 2021 &&
                  monthNum === 1 &&
                  (displayDate ? displayDate[num] : num) === 6 && (
                    // <Box
                    //   direction="horizontal"
                    //   style={{
                    //     justifyContent: 'flex-start' as const,
                    //   }}>
                    <div
                      style={{
                        wordBreak: 'keep-all' as const,
                        whiteSpace: 'pre' as const,
                        position: 'absolute' as const,
                        left: 0,
                      }}>
                      145yw45w45uw45uw45uw4tus w35w45 w4jw4jw45jw4 jw4jw4j
                    </div>
                    // </Box>
                  )}
                {/* <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
                <div>12</div>
                <div>13</div>
                <div>14</div>
                <div>15</div> */}
              </CalendarDate>,
            )
            _tmpDateList.push(_date)
          }
        }

        if (displayWeekNum === 1) {
          if (seqOfFirstDayOfThisMonth === 0) {
            constructDateRow()
            firstDayOfThisMonth = 8
          } else {
            const displayDate: number[] = []
            let start = lastDayOfLastMonth - (seqOfFirstDayOfThisMonth - 1)
            for (start; start <= lastDayOfLastMonth; start++) {
              displayDate.push(start)
            }
            for (let end = seqOfFirstDayOfThisMonth; end < 7; end++) {
              displayDate.push(firstDayOfThisMonth)
              firstDayOfThisMonth++
            }
            if (month === monthNum) {
              constructDateRow(displayDate, 'before')
            }
          }
        } else if (displayWeekNum === displayWeekCnt) {
          let cnt = 1
          const displayDate: number[] = []
          for (let num = 0; num < 7; num++) {
            if (firstDayOfThisMonth > lastDayOfThisMonth) {
              displayDate.push(cnt)
              cnt++
            } else {
              displayDate.push(firstDayOfThisMonth)
              firstDayOfThisMonth++
            }
          }
          if (month === monthNum) {
            constructDateRow(displayDate, 'after')
          }
        } else {
          const displayDate: number[] = []
          for (let num = 0; num < 7; num++) {
            displayDate.push(firstDayOfThisMonth)
            firstDayOfThisMonth++
          }
          constructDateRow(displayDate)
        }

        if (DateList.length > 0) {
          DateRow.push(
            <Box
              key={`${year}_${helper.setMonth(monthNum)}_${displayWeekNum}`}
              direction="horizontal"
              style={CalendarDateContainerStyle.row}>
              {DateList}
            </Box>,
          )
        }
      }
    }

    setDateRow(() => DateRow)
    set_dateList(() => _tmpDateList)
  }, [isMounted, yearMonth, chosenDate])

  const onScroll = (e: Event) => {
    if (!isMounted()) return
    if (!_dateBody?.current) return
    if (!_dateList || _dateList.length === 0) return

    e.preventDefault()

    const _foundList = _dateList.filter((_date) => {
      if (_date?.current && _dateBody?.current) {
        const {
          extractedYear,
          extractedMonth,
          extractedDate,
          disabled,
        } = helper.extractValFromId(_date.current.attributes[0].value)

        const position = _date.current.getBoundingClientRect()

        if (
          extractedDate === '12' &&
          disabled &&
          position.top >= 0 &&
          position.bottom <= _dateBody.current.clientHeight
        ) {
          const st = _dateBody?.current ? _dateBody.current.scrollTop : 0

          if (st > lastScrollTop) {
            if (
              Number(
                extractedYear +
                  helper.makeTwoDigits(Number(extractedMonth) + 1),
              ) > Number(yearMonth)
            ) {
              return true
            }
          } else {
            if (
              Number(
                extractedYear +
                  helper.makeTwoDigits(Number(extractedMonth) + 1),
              ) < Number(yearMonth)
            ) {
              return true
            }
          }

          setLastScrollTop(st)
        }
      }
      return false
    })

    const _found = _foundList.length > 0 ? _foundList[0] : undefined

    if (_found?.current) {
      const { extractedYear, extractedMonth } = helper.extractValFromId(
        _found.current.attributes[0].value,
      )

      focusMonth(Number(extractedYear), Number(extractedMonth))
      onChangeMonth(new Date(Number(extractedYear), Number(extractedMonth), 1))
      setActionProcessing(true)
    }
  }

  React.useLayoutEffect(() => {
    if (!isMounted()) return
    if (!_dateBody?.current) return

    if (!actionProcessing) {
      _dateBody.current.addEventListener('scroll', onScroll)
    } else {
      const year = Number(yearMonth.substr(0, 4))
      const month = Number(yearMonth.substr(4, 2)) - 1
      focusMonth(year, month)
    }
    const st = _dateBody?.current ? _dateBody.current.scrollTop : 0
    setLastScrollTop(() => st)

    return () => {
      if (_dateBody?.current) {
        _dateBody.current.removeEventListener('scroll', onScroll)
      }
    }
  }, [
    isMounted,
    actionProcessing,
    onScroll,
    focusMonth,
    yearMonth,
    offsetY,
    _dateBody.current,
  ])

  const onWheel = (e: WheelEvent) => {
    if (e.deltaY < 10 || e.deltaY > -1) {
      setActionProcessing(() => false)
    } else {
      setActionProcessing(() => true)
    }
  }

  React.useLayoutEffect(() => {
    if (!isMounted()) return

    if (_dateBody?.current) {
      _dateBody.current.onwheel = onWheel
    }
    return () => {
      if (_dateBody?.current) {
        _dateBody.current.onwheel = null
      }
    }
  }, [isMounted, onWheel])

  return (
    <CalendarDateContainerStyle.container ref={_dateBody}>
      {dateRow}
    </CalendarDateContainerStyle.container>
  )
}
