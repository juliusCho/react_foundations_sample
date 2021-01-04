import React from 'react'
import { InputBoxStyle } from '../../styles/cho.inhyo/foundation/InputBoxStyle'

type InputTypes =
  | 'email'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: number | string
  type?: InputTypes
  ref?: React.RefObject<HTMLInputElement> | null
  name?: string
  placeholder?: string
  onFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void
  onKeyUp?: (e?: React.KeyboardEvent<HTMLInputElement>) => void
  onSubmit?: () => void
  style?: React.CSSProperties
  className?: string
}

export default function InputBox({
  onChange,
  value,
  type,
  ref,
  name,
  placeholder,
  onFocus,
  onBlur,
  onKeyUp,
  onSubmit,
  style,
  className,
}: Props) {
  const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      if (onSubmit) {
        onSubmit()
      }
    }
  }

  return (
    <InputBoxStyle.input
      type={type}
      ref={ref}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp || enter}
      className={className}
      style={style}
    />
  )
}
