import moment from 'moment'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Recoil from 'recoil'
import DateTimePicker from '../../components/cho.inhyo/DateTimePicker'
import GoSignIn from '../../components/cho.inhyo/GoSignIn'
import LoginContainer from '../../containers/cho.inhyo/LoginContainer'
import Box from '../../foundations/cho.inhyo/Box'
import theme from '../../styles/cho.inhyo/global/theme'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState } from '../../utils/cho.inhyo/states'
import { RoutePath } from '../../utils/cho.inhyo/types'

export default function LoginPage({ history }: RouteComponentProps) {
  const [showPicker, setShowPicker] = React.useState(false)
  // const [localDate, setLocalDate] = React.useState<Date | Date[]>(new Date())
  const [localDate, setLocalDate] = React.useState<
    Date | Array<Date | undefined> | undefined
  >([new Date(), new Date()])

  const setLoading = Recoil.useSetRecoilState(loadingState)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setLoading(false)
    }
  }, [])

  const onLogin = () => {
    setLoading(true)
    history.push(RoutePath.MAIN)
  }

  const showDateTimePicker = () => {
    setShowPicker(true)
  }

  const changeDate = (date?: Date | Array<Date | undefined>) => {
    setLocalDate(date)
    setShowPicker(false)
  }

  const showTimeStyle: React.CSSProperties = {
    margin: '5px',
    padding: '5px',
    width: '100%',
    borderRadius: '30px',
    minWidth: '105px',
    backgroundColor: theme.palette.mono.paleWhite,
    cursor: 'pointer' as const,
  }

  return (
    <Box direction="vertical">
      {Array.isArray(localDate) ? (
        <>
          <div style={showTimeStyle} onClick={showDateTimePicker}>
            {moment(localDate[0]).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div style={showTimeStyle} onClick={showDateTimePicker}>
            {moment(localDate[1]).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </>
      ) : (
        <div style={showTimeStyle} onClick={showDateTimePicker}>
          {moment(localDate).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      )}
      <DateTimePicker
        date={localDate}
        changeDate={changeDate}
        timeDisplay={true}
        selectRange={true}
        isOpen={showPicker}
      />
      <LoginContainer onLogin={onLogin} />
      <GoSignIn />
    </Box>
  )
}
