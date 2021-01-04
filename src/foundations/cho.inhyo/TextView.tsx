import React from 'react'
import TextViewStyle from '../../styles/cho.inhyo/foundation/TextViewStyle'

type Props = {
  value: string
  style?: React.CSSProperties
  className?: string
}

export default function TextView({ value, style, className }: Props) {
  return (
    <TextViewStyle.text className={className} style={style}>
      {value}
    </TextViewStyle.text>
  )
}
