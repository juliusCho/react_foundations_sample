import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

const TextViewStyle = {
  text: styled.span`
    ${(props: StyledPropType) => css`
      font-weight: ${props.theme.font.text1.fontWeight};
      font-size: ${props.theme.font.text1.fontSize};
      color: ${props.theme.palette.mono.black};
    `}
    background-color: transparent;
    margin: 5px;
    wite-space: break-spaces;
    word-break: break-word;
  `,
}

export default TextViewStyle
