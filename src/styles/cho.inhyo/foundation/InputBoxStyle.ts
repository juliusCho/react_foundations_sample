import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

export const InputBoxStyle = {
  input: styled.input`
    font-weight: normal;
    border-radius: 0.313rem;
    padding: 0.313rem 0.625rem;
    margin: 0.188rem;

    ${(props: StyledPropType) => css`
      font-family: ${props.theme.font.text1.fontWeight};
      font-size: ${props.theme.font.text1.fontSize};
      color: ${props.theme.palette.mono.black};
      border: 0.063rem solid ${props.theme.palette.mono.gray};
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
