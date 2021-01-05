import React from 'react'
import TextViewStyle from '../../styles/cho.inhyo/foundation/TextViewStyle'

type Props = {
  value: string
  style?: React.CSSProperties
  className?: string
  dataTest?: string
}

export default function TextView({ value, style, className, dataTest }: Props) {
  return (
    <TextViewStyle.text
      className={className}
      style={style}
      data-test={dataTest}>
      {value}
    </TextViewStyle.text>
  )
}
