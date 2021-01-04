import React from 'react'
import LabelButonStyle from '../../styles/cho.inhyo/foundation/LabelButtonStyle'

type Props = {
  value: string
  onClick: (e?: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
  className?: string
}

export default function LabelButton({
  value,
  onClick,
  style,
  className,
}: Props) {
  return (
    <LabelButonStyle.button
      onClick={onClick}
      className={className}
      style={style}>
      {value}
    </LabelButonStyle.button>
  )
}
