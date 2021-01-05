import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Recoil from 'recoil'
import { ThemeProvider } from 'styled-components'
import LoadingSpinner from '../../foundations/cho.inhyo/LoadingSpinner'
import '../../styles/cho.inhyo/global/App.scss'
import '../../styles/cho.inhyo/global/pseudoHelper.scss'
import theme from '../../styles/cho.inhyo/global/theme'
import i18n from '../../utils/cho.inhyo/i18n'
import { loadingState } from '../../utils/cho.inhyo/states'
import { RoutePath } from '../../utils/cho.inhyo/types'
import Auth from './Auth'
import OnLoading from './OnLoading'
const LoginPage = React.lazy(() => import('./LoginPage'))
const MainPage = React.lazy(() => import('./MainPage'))
const NoPage = React.lazy(() => import('./NoPage'))
const Redirector = React.lazy(() => import('./Redirector'))
const SignInPage = React.lazy(() => import('./SignInPage'))

export default function App() {
  const loading = Recoil.useRecoilValue(loadingState)

  return (
    <>
      <div data-test="loginTitle">aaaaaa</div>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <OnLoading loading={loading}>
              <LoadingSpinner />
            </OnLoading>
            <Suspense fallback={<></>}>
              <BrowserRouter>
                <Auth>
                  <Switch>
                    <Route path={RoutePath.ROOT} exact component={Redirector} />
                    <Route path={RoutePath.LOGIN} component={LoginPage} />
                    <Route path={RoutePath.SIGNIN} component={SignInPage} />
                    <Route path={RoutePath.MAIN} component={MainPage} />
                    <Route component={NoPage} />
                  </Switch>
                </Auth>
              </BrowserRouter>
            </Suspense>
          </div>
        </ThemeProvider>
      </I18nextProvider>
    </>
  )
}
