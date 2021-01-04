import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

const TextViewStyle = {
  text: styled.span`
    ${(props: StyledPropType) => css`
      font-family: ${props.theme.font.basic};
      font-size: ${props.theme.font.size.medium};
      color: ${props.theme.palette.black};
    `}
    background-color: transparent;
    margin: 5px;
    wite-space: break-spaces;
    word-break: break-word;
  `,
}

export default TextViewStyle
