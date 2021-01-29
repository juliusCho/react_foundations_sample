import React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router-dom'
import Recoil from 'recoil'
import { Alert } from '../../containers/cho.inhyo/AlertOrConfirm'
import Box from '../../foundations/cho.inhyo/Box'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import theme from '../../styles/cho.inhyo/global/theme'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState, sessionState } from '../../utils/cho.inhyo/states'
import { InitSessionValue, RoutePath } from '../../utils/cho.inhyo/types'

export default function MainPage({ history }: RouteComponentProps) {
  const { t } = useTranslation()

  const setLoading = Recoil.useSetRecoilState(loadingState)
  const setSession = Recoil.useSetRecoilState(sessionState)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setLoading(false)
    }
  }, [])

  const onClick = () => {
    setSession(InitSessionValue)
    void Alert(t('auth.logout'))
    history.push(RoutePath.LOGIN)
  }

  return (
    <Box direction="vertical">
      <TextView value={t('mainPage.title')} />
      <LabelButton
        value={t('mainPage.logout')}
        onClick={onClick}
        style={{ color: theme.palette.main.blue }}
      />
    </Box>
  )
}
