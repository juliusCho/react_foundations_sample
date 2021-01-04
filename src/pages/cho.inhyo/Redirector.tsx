import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Recoil from 'recoil'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { sessionState } from '../../utils/cho.inhyo/states'
import { RoutePath } from '../../utils/cho.inhyo/types'

export default function Redirector({ history }: RouteComponentProps) {
  const session = Recoil.useRecoilValue(sessionState)

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      if (!!session.email || !!session.password) {
        history.push(RoutePath.MAIN)
        return
      }
      history.push(RoutePath.LOGIN)
    }
  }, [])

  return null
}
