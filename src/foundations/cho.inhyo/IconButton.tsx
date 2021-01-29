import React from 'react'
import IconButonStyle from '../../styles/cho.inhyo/foundation/IconButtonStyle'
import { Icons } from '../../utils/cho.inhyo/types'

type Props = {
  icon: Icons
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
  className?: string
}

export default function IconButton({ icon, onClick, style, className }: Props) {
  return (
    <IconButonStyle.button
      className={icon + (className ? ' ' + className : '')}
      onClick={onClick}
      style={style}
    />
  )
}
