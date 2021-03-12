import styled from 'styled-components'
import theme from '../global/theme'

const CalendarDateContainerStyle = {
  container: styled.div`
    width: 100%;
    max-height: calc(100vh - 11.25rem);
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  row: {
    justifyContent: 'space-between' as const,
    width: '100%',
    minHeight: '7.5rem',
    maxHeight: '21.875rem',
    borderTop: `0.063rem solid ${theme.palette.mono.gray}`,
    margin: 0,
    alignItems: 'flex-start' as const,
  },
}

export default CalendarDateContainerStyle
