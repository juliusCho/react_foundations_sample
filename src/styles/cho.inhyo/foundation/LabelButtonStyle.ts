import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

const LabelButonStyle = {
  button: styled.span`
    ${(props: StyledPropType) => css`
      font-family: ${props.theme.font.basic};
      font-size: ${props.theme.font.size.medium};
    `}
    border: none;
    border-radius: 10px;
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
