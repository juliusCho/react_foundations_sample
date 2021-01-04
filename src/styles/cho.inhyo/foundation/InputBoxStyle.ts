import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

export const InputBoxStyle = {
  input: styled.input`
    font-weight: normal;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 3px;

    ${(props: StyledPropType) => css`
      font-family: ${props.theme.font.basic};
      font-size: ${props.theme.font.size.smedium};
      color: ${props.theme.palette.black};
      border: 1px solid ${props.theme.palette.gray};
      background-color: ${props.theme.palette.input};

      &::-webkit-input-placeholder {
        font-weight: lighter;
        color: ${props.theme.palette.gray};
        font-size: ${props.theme.font.size.xsmedium};
      }

      &:-ms-input-placeholder {
        font-weight: lighter;
        color: ${props.theme.palette.gray};
        font-size: ${props.theme.font.size.xsmedium};
      }
    `}
  `,
}
