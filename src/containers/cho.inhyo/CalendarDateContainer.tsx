import moment from 'moment'
import React from 'react'
import CalendarDate from '../../components/cho.inhyo/CalendarDate'
import Box from '../../foundations/cho.inhyo/Box'
import CalendarDateContainerStyle from '../../styles/cho.inhyo/containers/CalendarDateContainerStyle'
import * as helper from '../../utils/cho.inhyo/helpers'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import testScheduleData, {
  TestDataType,
} from '../../utils/cho.inhyo/testScheduleData'

export type ScheduleStackType = {
  no: number
  subNo?: number
  week: number
  mainWeek: boolean
  outOfThisWeek?: boolean
  label: string
  color: string
}

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

        if (id === `${dt}-15` || id === `${id}-01`) {
          return true
        }
      }
    })

    if (_focusTargets.length > 0) {
      _focusTargets.forEach((_date) => {
        if (_date?.current) {
          const id = _date.current.attributes[0].value.replace(':disabled', '')
          const dt = `${focusingYear}-${helper.makeTwoDigits(focusingMonth)}-15`

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

  const constructWeekRow = (
    year: number,
    monthNum: number,
    data: TestDataType[],
    displayDate?: number[],
    beforeOrAfter?: 'before' | 'after',
  ) => {
    const month = Number(helper.setMonth(monthNum))
    const day = displayDate ? displayDate[0] : 1
    const week: number[] = []

    for (let i = 0; i < 7; i++) {
      const dt = helper.getNewDateUponBeforeOrAfter(
        year,
        month,
        day,
        beforeOrAfter,
      )
      dt.setDate(dt.getDate() + i)
      week.push(Number(moment(dt).format('YYYYMMDD')))
    }

    let targetData: TestDataType[] = []
    const subData: TestDataType[] = []

    data
      .filter((datum) => {
        const startDate = Number(moment(datum.startDate).format('YYYYMMDD'))
        if (datum.endDate) {
          const endDate = Number(moment(datum.endDate).format('YYYYMMDD'))
          if (endDate === startDate) {
            return (
              startDate >= Math.min(...week) && Math.max(...week) >= startDate
            )
          }
          return (
            (startDate >= Math.min(...week) &&
              Math.max(...week) >= startDate) ||
            (endDate >= Math.min(...week) && Math.max(...week) >= endDate) ||
            (Math.min(...week) >= startDate && endDate >= Math.min(...week)) ||
            (Math.max(...week) >= startDate && endDate >= Math.max(...week))
          )
        } else {
          return (
            startDate >= Math.min(...week) && Math.max(...week) >= startDate
          )
        }
      })
      .forEach((datum) => {
        if (datum.type === 'main') {
          targetData.push(datum)
        } else {
          subData.push(datum)
        }
      })

    if (targetData.length > 0) {
      if (subData.length > 0) {
        let allCovered = subData.length

        subData.forEach((datum) => {
          targetData = targetData.map((target) => {
            if (target.no === datum.parentNo) {
              allCovered--
              return {
                ...target,
                subNo: datum.no,
                subStartDate: datum.startDate,
                subEndDate: datum.endDate,
              }
            } else {
              return target
            }
          })
        })

        if (allCovered > 0) {
          const subLefts = subData.filter(
            (subDatum) =>
              !targetData.some((datum) => datum.subNo === subDatum.no),
          )
          targetData = [...targetData, ...subLefts]
        }
      }
    } else {
      targetData = subData
    }

    const stack: Array<Array<ScheduleStackType>> = []

    while (targetData.length > 0) {
      const availableRange = [...week]
      const queue: Array<ScheduleStackType> = []

      for (let i = 0; i < targetData.length; i++) {
        const startDate = helper.getStartEndDateNum(
          'start',
          targetData[i].startDate,
          targetData[i].subStartDate,
        )
        const endDate = helper.getStartEndDateNum(
          'end',
          targetData[i].endDate,
          targetData[i].subEndDate,
        )

        if (!startDate) continue

        let added = false

        if (endDate && endDate !== startDate) {
          const dtNums: number[] = []
          let outOfThisWeek = false

          for (
            let dtOffset = 0,
              jj = helper.getDiffDayCnt(
                helper.getStartEndDate(
                  'start',
                  targetData[i].startDate,
                  targetData[i].subStartDate,
                ) as Date,
                helper.getStartEndDate(
                  'end',
                  targetData[i].endDate,
                  targetData[i].subEndDate,
                ) as Date,
              );
            dtOffset <= jj;
            dtOffset++
          ) {
            const dt = moment(
              helper.getStartEndDate(
                'start',
                targetData[i].startDate,
                targetData[i].subStartDate,
              ) as Date,
            ).toDate()
            dt.setDate(dt.getDate() + dtOffset)

            const dtNum = Number(moment(dt).format('YYYYMMDD'))

            if (dtNum >= Math.min(...week) && Math.max(...week) >= dtNum) {
              dtNums.push(Number(moment(dt).format('YYYYMMDD')))
            } else {
              outOfThisWeek = true
            }
          }

          const available = dtNums.every((dtNum) =>
            availableRange.some((avlRng) => avlRng === dtNum),
          )
          if (available) {
            dtNums.forEach((dtNum) => {
              queue.push({
                no: targetData[i].no,
                subNo: targetData[i].subNo,
                week: dtNum,
                mainWeek:
                  targetData[i].type !== 'sub' &&
                  helper.checkMainWeek(targetData[i], dtNum),
                label: targetData[i].name,
                color: targetData[i].channel.color,
                outOfThisWeek,
              })
              availableRange.splice(
                availableRange.findIndex((avlRng) => avlRng === dtNum),
                1,
              )
            })
            added = true
          }
        } else {
          const available = availableRange.findIndex(
            (avlRng) => avlRng === startDate,
          )
          if (available > -1) {
            queue.push({
              no: targetData[i].no,
              subNo: targetData[i].subNo,
              week: startDate,
              mainWeek: helper.checkMainWeek(targetData[i], startDate),
              label: targetData[i].name,
              color: targetData[i].channel.color,
            })
            availableRange.splice(available, 1)
            added = true
          }
        }

        if (added) {
          targetData.splice(i, 1)
          if (targetData.length > 0) {
            i--
          }
        }
      }

      if (queue.length === 0) break
      stack.push(queue)
    }

    return stack
  }

  const constructDateRow = (
    scheduleStack: Array<Array<ScheduleStackType>>,
    _date: React.RefObject<HTMLDivElement> | null,
    num: number,
    year: number,
    month: number,
    monthNum: number,
    displayWeekNum: number,
    displayDate?: number[],
    beforeOrAfter?: 'before' | 'after',
  ) => {
    const day = displayDate ? displayDate[num] : num
    const thisMonth = beforeOrAfter
      ? beforeOrAfter === 'before'
        ? (displayDate ? displayDate[num] : num) < 7
        : (displayDate ? displayDate[num] : num) > 6
      : month === monthNum

    const testData = {
      endingProjects: [
        moment('2021-02-09', 'YYYY-MM-DD').toDate(),
        moment('2021-02-12', 'YYYY-MM-DD').toDate(),
        moment('2021-02-26', 'YYYY-MM-DD').toDate(),
        moment('2021-02-26', 'YYYY-MM-DD').toDate(),
        moment('2021-02-06', 'YYYY-MM-DD').toDate(),
        moment('2021-02-21', 'YYYY-MM-DD').toDate(),
        moment('2021-02-21', 'YYYY-MM-DD').toDate(),
        moment('2021-02-21', 'YYYY-MM-DD').toDate(),
        moment('2021-02-24', 'YYYY-MM-DD').toDate(),
        moment('2021-03-09', 'YYYY-MM-DD').toDate(),
        moment('2021-03-12', 'YYYY-MM-DD').toDate(),
        moment('2021-03-26', 'YYYY-MM-DD').toDate(),
        moment('2021-03-26', 'YYYY-MM-DD').toDate(),
        moment('2021-03-06', 'YYYY-MM-DD').toDate(),
        moment('2021-03-21', 'YYYY-MM-DD').toDate(),
        moment('2021-03-21', 'YYYY-MM-DD').toDate(),
        moment('2021-03-21', 'YYYY-MM-DD').toDate(),
        moment('2021-03-24', 'YYYY-MM-DD').toDate(),
      ],
      endingCards: [
        moment('2021-02-24', 'YYYY-MM-DD').toDate(),
        moment('2021-02-24', 'YYYY-MM-DD').toDate(),
        moment('2021-02-02', 'YYYY-MM-DD').toDate(),
        moment('2021-02-01', 'YYYY-MM-DD').toDate(),
        moment('2021-02-22', 'YYYY-MM-DD').toDate(),
        moment('2021-02-14', 'YYYY-MM-DD').toDate(),
        moment('2021-02-02', 'YYYY-MM-DD').toDate(),
        moment('2021-02-09', 'YYYY-MM-DD').toDate(),
        moment('2021-02-28', 'YYYY-MM-DD').toDate(),
        moment('2021-02-27', 'YYYY-MM-DD').toDate(),
        moment('2021-03-24', 'YYYY-MM-DD').toDate(),
        moment('2021-03-24', 'YYYY-MM-DD').toDate(),
        moment('2021-03-02', 'YYYY-MM-DD').toDate(),
        moment('2021-03-01', 'YYYY-MM-DD').toDate(),
        moment('2021-03-22', 'YYYY-MM-DD').toDate(),
        moment('2021-03-14', 'YYYY-MM-DD').toDate(),
        moment('2021-03-02', 'YYYY-MM-DD').toDate(),
        moment('2021-03-09', 'YYYY-MM-DD').toDate(),
        moment('2021-03-28', 'YYYY-MM-DD').toDate(),
        moment('2021-03-27', 'YYYY-MM-DD').toDate(),
      ],
      endingTodos: [
        moment('2021-02-01', 'YYYY-MM-DD').toDate(),
        moment('2021-02-01', 'YYYY-MM-DD').toDate(),
        moment('2021-02-11', 'YYYY-MM-DD').toDate(),
        moment('2021-02-21', 'YYYY-MM-DD').toDate(),
        moment('2021-02-25', 'YYYY-MM-DD').toDate(),
        moment('2021-02-03', 'YYYY-MM-DD').toDate(),
        moment('2021-02-16', 'YYYY-MM-DD').toDate(),
        moment('2021-02-25', 'YYYY-MM-DD').toDate(),
        moment('2021-02-17', 'YYYY-MM-DD').toDate(),
        moment('2021-02-17', 'YYYY-MM-DD').toDate(),
        moment('2021-02-20', 'YYYY-MM-DD').toDate(),
        moment('2021-02-09', 'YYYY-MM-DD').toDate(),
        moment('2021-03-01', 'YYYY-MM-DD').toDate(),
        moment('2021-03-01', 'YYYY-MM-DD').toDate(),
        moment('2021-03-11', 'YYYY-MM-DD').toDate(),
        moment('2021-03-21', 'YYYY-MM-DD').toDate(),
        moment('2021-03-25', 'YYYY-MM-DD').toDate(),
        moment('2021-03-03', 'YYYY-MM-DD').toDate(),
        moment('2021-03-16', 'YYYY-MM-DD').toDate(),
        moment('2021-03-25', 'YYYY-MM-DD').toDate(),
        moment('2021-03-17', 'YYYY-MM-DD').toDate(),
        moment('2021-03-17', 'YYYY-MM-DD').toDate(),
        moment('2021-03-20', 'YYYY-MM-DD').toDate(),
        moment('2021-03-09', 'YYYY-MM-DD').toDate(),
      ],
    }

    return (
      <CalendarDate
        key={`${year}_${helper.makeTwoDigits(monthNum)}_${displayWeekNum}_${
          displayDate ? displayDate[num] : num
        }`}
        chosenDate={chosenDate}
        startWeekOffset={displayDate ? 0 - num : 1 - num}
        edgeOfWeek={
          num == (displayDate ? 0 : 1)
            ? 'start'
            : num === (displayDate ? 6 : 7)
            ? 'end'
            : undefined
        }
        day={day}
        year={year}
        month={Number(helper.setMonth(monthNum))}
        beforeOrAfter={beforeOrAfter}
        thisMonth={thisMonth}
        onClick={onClickDate}
        _date={_date}
        scheduleStack={scheduleStack}
        icons={testData}
      />
    )
  }

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

        const constructRow = (
          displayDate?: number[],
          beforeOrAfter?: 'before' | 'after',
        ) => {
          const scheduleStack = constructWeekRow(
            year,
            monthNum,
            testScheduleData,
            displayDate,
            beforeOrAfter,
          )

          for (
            let num = displayDate ? 0 : 1;
            num < (displayDate ? 7 : 8);
            num++
          ) {
            const _date = React.createRef<HTMLDivElement>()
            DateList.push(
              constructDateRow(
                scheduleStack,
                _date,
                num,
                year,
                month,
                monthNum,
                displayWeekNum,
                displayDate,
                beforeOrAfter,
              ),
            )
            _tmpDateList.push(_date)
          }
        }

        if (displayWeekNum === 1) {
          if (seqOfFirstDayOfThisMonth === 0) {
            constructRow()
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
              constructRow(displayDate, 'before')
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
            constructRow(displayDate, 'after')
          }
        } else {
          const displayDate: number[] = []
          for (let num = 0; num < 7; num++) {
            displayDate.push(firstDayOfThisMonth)
            firstDayOfThisMonth++
          }
          constructRow(displayDate)
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
