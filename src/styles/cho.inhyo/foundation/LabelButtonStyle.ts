import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

const LabelButonStyle = {
  button: styled.span`
    ${(props: StyledPropType) => css`
      font-weight: ${props.theme.font.item1.fontWeight};
      font-size: ${props.theme.font.item1.fontSize};
    `}
    border: none;
    border-radius: 0.625rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: 0.3;
    }
    &:active {
      opacity: 0.5;
    }
  `,
}

export default LabelButonStyle
