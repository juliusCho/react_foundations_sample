import React from 'react'
import { DividerLineStyle } from '../../styles/cho.inhyo/foundation/DividerLine'

type Props = {
  direction: 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
}

export default function DividerLine({
  direction,
  style = {},
  className,
}: Props) {
  if (direction === 'vertical') {
    style.height = '100%'
    if (!('width' in style) && !className) {
      style.width = '1px'
    }
  } else {
    style.width = '100%'
    if (!('height' in style) && !className) {
      style.height = '1px'
    }
  }

  return <DividerLineStyle.line className={className} style={style} />
}
