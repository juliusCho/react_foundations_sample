import theme from '../global/theme'

const CalendarContainerStyle = {
  container: {
    width: '100%',
    backgroundColor: theme.palette.mono.white,
    padding: '20px',
  },
  header: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mono.gray}`,
    backgroundColor: theme.palette.mono.white,
    position: 'sticky' as const,
    top: 0,
    zIndex: 1,
  },
  headerTop: {
    width: '100%',
    padding: '20px',
    justifyContent: 'center' as const,
  },
  headerTopSub: {
    width: '50%',
    justifyContent: 'space-between' as const,
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
}

export default CalendarContainerStyle
