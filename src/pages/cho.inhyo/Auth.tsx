import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Recoil from 'recoil'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'
import { loadingState, sessionState } from '../../utils/cho.inhyo/states'
import { RoutePath } from '../../utils/cho.inhyo/types'

type Props = {
  children: React.ReactNode
}

export default function Auth({ children }: Props) {
  const session = Recoil.useRecoilValue(sessionState)
  const setLoading = Recoil.useSetRecoilState(loadingState)

  const isMounted = useIsMounted()

  const { pathname } = useLocation()
  const history = useHistory()

  React.useEffect(() => {
    if (!isMounted()) return
    if (pathname !== RoutePath.MAIN) return

    if (!session.email || !session.password) {
      setLoading(() => true)
      history.push(RoutePath.ROOT)
    }
  }, [pathname, session, history])

  return <>{children}</>
}
