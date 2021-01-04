import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Router from 'react-router-dom'
import Box from '../../foundations/cho.inhyo/Box'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import TextView from '../../foundations/cho.inhyo/TextView'
import GoSignInStyle from '../../styles/cho.inhyo/components/GoSignInStyle'
import { RoutePath } from '../../utils/cho.inhyo/types'

const GoSignIn = function ({ history }: Router.RouteComponentProps) {
  const { t } = useTranslation()

  const onClick = () => {
    history.push(RoutePath.SIGNIN)
  }

  return (
    <Box direction="horizontal" style={GoSignInStyle.container}>
      <TextView value={t('login.signinMsg')} style={GoSignInStyle.text} />
      <LabelButton
        value={t('login.goSignin')}
        onClick={onClick}
        style={{ ...GoSignInStyle.text, ...GoSignInStyle.button }}
      />
    </Box>
  )
}

export default Router.withRouter(GoSignIn)
