import theme from '../global/theme'

const CalendarContainerStyle = {
  container: {
    width: '100%',
  },
  yearHeader: {
    width: '100%',
    justifyContent: 'space-between' as const,
    borderBottom: `2px solid ${theme.palette.mono.gray}`,
    padding: '20px',
  },
  year: {
    ...theme.font.titleLarge,
  },
  monthContainer: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mono.lightGray}`,
  },
  monthHeader: {
    cursor: 'pointer' as const,
  },
  month: {
    ...theme.font.titleMedium,
  },
}

export default CalendarContainerStyle
