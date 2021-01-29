import React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router-dom'
import Recoil from 'recoil'
import Box from '../../foundations/cho.inhyo/Box'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import theme from '../../styles/cho.inhyo/global/theme'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState } from '../../utils/cho.inhyo/states'

export default function SignInPage({ history }: RouteComponentProps) {
  const { t } = useTranslation()

  const setLoading = Recoil.useSetRecoilState(loadingState)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setLoading(false)
    }
  }, [])

  const onClick = () => {
    history.goBack()
  }

  return (
    <Box direction="vertical">
      <TextView value={t('signin.title')} />
      <LabelButton
        value={t('signin.goBack')}
        onClick={onClick}
        style={{ color: theme.palette.main.blue }}
      />
    </Box>
  )
}
