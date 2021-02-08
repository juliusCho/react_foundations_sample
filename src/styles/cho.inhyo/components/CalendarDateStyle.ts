const CalendarDateStyle = {
  container: {
    width: 'calc(100% / 7)',
    minHeight: '160px',
    maxHeight: '500px',
    justifyContent: 'flex-start' as const,
    cursor: 'pointer' as const,
    margin: '5px',
  },
  box: {
    width: '100%',
    justifyContent: 'flex-end' as const,
  },
}

export default CalendarDateStyle
