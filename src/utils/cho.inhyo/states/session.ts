import Recoil from 'recoil'
import { InitSessionValue, SessionType } from '../types'

export const sessionState = Recoil.atom<SessionType>({
  key: 'sessionState',
  default: InitSessionValue,
})
