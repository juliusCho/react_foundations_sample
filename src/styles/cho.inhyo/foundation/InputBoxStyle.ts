import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

export const InputBoxStyle = {
  input: styled.input`
    font-weight: normal;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 3px;

    ${(props: StyledPropType) => css`
      font-family: ${props.theme.font.text1.fontWeight};
      font-size: ${props.theme.font.text1.fontSize};
      color: ${props.theme.palette.mono.black};
      border: 1px solid ${props.theme.palette.mono.gray};
      background-color: ${props.theme.palette.mono.lightGray};

      &::-webkit-input-placeholder {
        color: ${props.theme.palette.mono.gray};
        font-size: ${props.theme.font.small.fontSize};
        font-weight: ${props.theme.font.small.fontWeight};
      }

      &:-ms-input-placeholder {
        font-size: ${props.theme.font.small.fontSize};
        font-weight: ${props.theme.font.small.fontWeight};
        color: ${props.theme.palette.mono.gray};
      }
    `}
  `,
}
