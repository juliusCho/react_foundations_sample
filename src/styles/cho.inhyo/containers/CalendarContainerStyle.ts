import theme from '../global/theme'

const CalendarContainerStyle = {
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden' as const,
  },
  header: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mono.gray}`,
    backgroundColor: theme.palette.mono.white,
  },
  headerTop: {
    width: '100%',
    padding: '20px',
    justifyContent: 'center' as const,
    margin: 0,
  },
  headerTopSub: {
    width: '50%',
    justifyContent: 'space-between' as const,
  },
  pickerModal: {
    position: 'absolute' as const,
    top: '20px',
    left: 'calc(50% - 140px)',
  },
  topItem: {
    ...theme.font.titleLarge,
  },
  dayContainer: {
    justifyContent: 'space-between' as const,
    width: '100%',
  },
  dayHeader: {
    width: 'calc(100% / 7)',
    margin: 0,
    marginBottom: '5px',
  },
  day: {
    ...theme.font.text1,
  },
  dateContainer: {
    backgroundColor: theme.palette.mono.white,
    padding: '20px',
    overflow: 'hidden' as const,
  },
}

export default CalendarContainerStyle
