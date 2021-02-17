import React from 'react'
import BoxStyle from '../../styles/cho.inhyo/foundation/BoxStyle'
import { useClickPreventionOnDoubleClick } from '../../utils/cho.inhyo/hooks'

type Props = {
  children: React.ReactNode | React.ReactNode[]
  direction?: 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
  onDoubleClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
  refObj?: React.RefObject<HTMLDivElement> | null
  id?: string
}

export default function Box({
  children,
  direction,
  style = {},
  className,
  onClick,
  onDoubleClick,
  refObj,
  id,
}: Props) {
  let handleClick = onClick
  let handleDoubleClick = onDoubleClick

  if (onClick && onDoubleClick) {
    const [hookedClick, hookedDoubleClick] = useClickPreventionOnDoubleClick(
      onClick,
      onDoubleClick,
    )
    handleClick = hookedClick
    handleDoubleClick = hookedDoubleClick
  }

  if (direction === 'vertical') {
    style.flexDirection = 'column'
  } else if (direction === 'horizontal') {
    style.flexDirection = 'row'
  }

  return (
    <BoxStyle.box
      id={id}
      className={className}
      style={style}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      ref={refObj}>
      {children}
    </BoxStyle.box>
  )
}
