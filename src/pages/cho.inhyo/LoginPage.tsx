import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Recoil from 'recoil'
import GoSignIn from '../../components/cho.inhyo/GoSignIn'
import LoginContainer from '../../containers/cho.inhyo/LoginContainer'
import Box from '../../foundations/cho.inhyo/Box'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState } from '../../utils/cho.inhyo/states'
import { RoutePath } from '../../utils/cho.inhyo/types'

export default function LoginPage({ history }: RouteComponentProps) {
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

  return (
    <Box direction="vertical">
      <LoginContainer onLogin={onLogin} />
      <GoSignIn />
    </Box>
  )
}
