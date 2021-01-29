import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

export const DividerLineStyle = {
  line: styled.div`
    border: none;
    ${(props: StyledPropType) => css`
      background-color: ${props.theme.palette.mono.lightGray};
    `}
  `,
}
