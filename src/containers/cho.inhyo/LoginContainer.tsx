import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import Login from '../../components/cho.inhyo/Login'
import SocialLogin from '../../components/cho.inhyo/SocialLogin'
import Box from '../../foundations/cho.inhyo/Box'
import DividerLine from '../../foundations/cho.inhyo/DividerLine'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import LoginContainerStyle from '../../styles/cho.inhyo/containers/LoginContainerStyle'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { sessionState } from '../../utils/cho.inhyo/states'
import { CorrectSessionValue } from '../../utils/cho.inhyo/types'
import { Alert, Warn } from './AlertOrConfirm'

type Props = {
  onLogin: () => void
}

export default function LoginContainer({ onLogin }: Props) {
  const { t } = useTranslation()

  const [session, setSession] = Recoil.useRecoilState(sessionState)

  const [attemptSuccess, setAttemptSuccess] = React.useState(false)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    if (session === CorrectSessionValue) {
      setAttemptSuccess(() => true)
    } else {
      setAttemptSuccess(() => false)
    }
  }, [isMounted, session, CorrectSessionValue])

  const loginAttempt = (inputEmail: string, inputPassword: string) => {
    if (
      inputEmail === CorrectSessionValue.email &&
      inputPassword === CorrectSessionValue.password
    ) {
      setSession({ email: inputEmail, password: inputPassword })

      void Alert(t('auth.loginSuccess'))
      onLogin()
      return
    }
    void Warn(t('auth.invalidLoginInfo'))
  }

  const findPassword = () => {
    void Alert(
      t('login.yourPasswordIs', {
        password: CorrectSessionValue.password,
      }),
    )
  }

  return (
    <Box direction="vertical" style={LoginContainerStyle.container}>
      <TextView value={t('login.title')} style={LoginContainerStyle.title} />
      <SocialLogin loginAttempt={loginAttempt} />
      <TextView value="OR" style={LoginContainerStyle.or} />
      <Login loginAttempt={loginAttempt} attemptSuccess={attemptSuccess} />
      <DividerLine direction="horizontal" />
      <LabelButton
        value={t('login.findPassword')}
        onClick={findPassword}
        style={LoginContainerStyle.findPw}
      />
    </Box>
  )
}
