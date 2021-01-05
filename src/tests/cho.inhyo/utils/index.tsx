import Enzyme from 'enzyme'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import App from '../../../pages/cho.inhyo/App'
import { RoutePath } from '../../../utils/cho.inhyo/types'

export const getTestElement = (path: RoutePath, dataTest: string) => {
  const history = createMemoryHistory()
  history.push(path)

  const wrapper = Enzyme.shallow(
    <Router history={history}>
      <App />
    </Router>,
  )
  wrapper.find(`[data-test="${dataTest}"]`)
}
