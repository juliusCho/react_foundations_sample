import styled from 'styled-components'
import theme from '../global/theme'

const CalendarDateContainerStyle = {
  container: styled.div`
    width: 100%;
    overflow-y: scroll;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  `,
  row: {
    justifyContent: 'space-between' as const,
    width: '100%',
    borderTop: `1px solid ${theme.palette.mono.gray}`,
  },
}

export default CalendarDateContainerStyle
