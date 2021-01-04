import React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router-dom'
import Recoil from 'recoil'
import { Alert } from '../../containers/cho.inhyo/AlertOrConfirm'
import Box from '../../foundations/cho.inhyo/Box'
import TextView from '../../foundations/cho.inhyo/TextView'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState } from '../../utils/cho.inhyo/states'
import { RoutePath } from '../../utils/cho.inhyo/types'

export default function NoPage({ history }: RouteComponentProps) {
  const { t } = useTranslation()

  const setLoading = Recoil.useSetRecoilState(loadingState)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    setLoading(false)

    void Alert(t('auth.invalidReach'))

    setTimeout(() => {
      setLoading(true)
      history.push(RoutePath.ROOT)
    }, 2000)
  }, [])

  return (
    <Box>
      <TextView value={t('noPage.title')} />
    </Box>
  )
}
