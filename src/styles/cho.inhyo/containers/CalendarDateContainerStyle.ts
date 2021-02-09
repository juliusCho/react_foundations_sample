import styled from 'styled-components'
import theme from '../global/theme'

const CalendarDateContainerStyle = {
  container: styled.div`
    width: 100%;
    max-height: calc(100vh - 180px);
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
    borderTop: `1px solid ${theme.palette.mono.gray}`,
  },
}

export default CalendarDateContainerStyle
