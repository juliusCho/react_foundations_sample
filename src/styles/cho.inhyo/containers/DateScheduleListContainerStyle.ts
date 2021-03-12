import styled, { css } from 'styled-components'
import theme, { StyledPropType } from '../global/theme'

const DateScheduleListContainerStyle = {
  container: styled.div`
    width: calc(100% - 0.125rem);
    height: calc(100% - 3.063rem);
    padding-top: 3.063rem;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    ${(props: StyledPropType) => css`
      border: 0.063rem solid ${props.theme.palette.mono.pale};
      background-color: ${props.theme.palette.mono.white};
    `}
  `,
  date: {
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    height: '3rem',
    position: 'absolute' as const,
    zIndex: 1,
    backgroundColor: theme.palette.mono.lightGray,
    border: `1px solid ${theme.palette.mono.lightGray}`,
    ...theme.font.titleSmall,
  },
  sectionTitle: {
    margin: 0,
    justifyContent: 'space-between' as const,
    width: 'calc(100% - 1.6rem)',
    height: '2.5rem',
    padding: '0 0.8rem',
    borderBottom: `0.063rem solid ${theme.palette.mono.lightGray}`,
    backgroundColor: theme.palette.mono.paleWhite,
    color: theme.palette.mono.gray,
    cursor: 'pointer' as const,
    ...theme.font.list1,
  },
  toggle: {
    color: theme.palette.mono.black,
    ...theme.font.list1,
  },
}

export default DateScheduleListContainerStyle
