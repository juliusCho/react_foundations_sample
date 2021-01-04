import React from 'react'
import BoxStyle from '../../styles/cho.inhyo/foundation/BoxStyle'

type Props = {
  children: React.ReactNode | React.ReactNode[]
  direction?: 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
}

export default function Box({
  children,
  direction,
  style = {},
  className,
  onClick,
}: Props) {
  if (direction === 'vertical') {
    style.flexDirection = 'column'
  } else if (direction === 'horizontal') {
    style.flexDirection = 'row'
  }

  return (
    <BoxStyle.box className={className} style={style} onClick={onClick}>
      {children}
    </BoxStyle.box>
  )
}
