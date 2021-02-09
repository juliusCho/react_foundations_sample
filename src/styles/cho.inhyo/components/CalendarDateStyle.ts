const CalendarDateStyle = {
  container: {
    width: 'calc(100% / 7)',
    justifyContent: 'flex-start' as const,
    cursor: 'pointer' as const,
    margin: '0 5px',
    minHeight: '120px',
  },
  title: {
    width: '100%',
    justifyContent: 'flex-end' as const,
  },
  contents: {
    width: '100%',
  },
}

export default CalendarDateStyle
