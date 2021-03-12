import theme from '../global/theme'

const CalendarContainerStyle = {
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden' as const,
  },
  header: {
    width: '100%',
    height: '7.625',
    borderBottom: `0.063rem solid ${theme.palette.mono.gray}`,
    backgroundColor: theme.palette.mono.white,
  },
  headerTop: {
    width: '100%',
    height: '2.5rem',
    padding: '1.25rem',
    justifyContent: 'center' as const,
    margin: 0,
  },
  headerTopSub: {
    width: '50%',
    justifyContent: 'space-between' as const,
  },
  pickerModal: {
    position: 'absolute' as const,
    top: '1.25rem',
    left: 'calc(50% - 8.75rem)',
  },
  topItem: {
    ...theme.font.titleLarge,
  },
  dayContainer: {
    justifyContent: 'space-between' as const,
    width: '100%',
    height: '1.875rem',
  },
  dayHeader: {
    width: 'calc(100% / 7)',
    margin: 0,
    marginBottom: '0.313rem',
  },
  day: {
    ...theme.font.text1,
  },
  dateContainer: {
    backgroundColor: theme.palette.mono.white,
    padding: '1.25rem',
    overflow: 'hidden' as const,
    height: 'calc(100% - 10.125rem)',
  },
}

export default CalendarContainerStyle
