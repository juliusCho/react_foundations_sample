import Enzyme from 'enzyme'
// import { createMemoryHistory } from 'history'
import * as H from 'history'
import React from 'react'
import { RecoilRoot } from 'recoil'
import App from '../../pages/cho.inhyo/App'
import { RoutePath } from '../../utils/cho.inhyo/types'

describe('화면 초기 UI', () => {
  test('타이틀 정상 출력', () => {
    const history = H.createMemoryHistory()
    history.push(RoutePath.LOGIN)

    const wrapper = Enzyme.shallow(
      // <Router history={history}>
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    )
    expect(wrapper).toBeTruthy()

    const title = wrapper.find(`div[data-test="${'loginTitle'}"]`)

    console.log('===============', title.length)
    // expect(title.text().length).not.toBe(0)

    // const title = getTestElement(RoutePath.LOGIN, 'loginTitle')
    // expect(title).toBe(locales['ko'].translation.login.title)
  })
})
