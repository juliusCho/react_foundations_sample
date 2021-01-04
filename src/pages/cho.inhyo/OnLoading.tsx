import React from 'react'
import '../../styles/cho.inhyo/global/loadingSpinner.scss'

type Props = {
  children: JSX.Element
  loading: boolean
}

export default function OnLoading({ children, loading }: Props) {
  return <div style={{ display: loading ? 'block' : 'none' }}>{children}</div>
}
