import theme from '../global/theme'

const CalendarDateContainerStyle = {
  container: {
    width: '100%',
    // overflowY: 'scroll' as const,
    overflowY: 'hidden' as const,
  },
  row: {
    justifyContent: 'space-between' as const,
    width: '100%',
    borderTop: `1px solid ${theme.palette.mono.gray}`,
  },
}

export default CalendarDateContainerStyle
