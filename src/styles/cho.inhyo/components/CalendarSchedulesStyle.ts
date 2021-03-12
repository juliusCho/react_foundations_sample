const stick = {
  margin: '0.063rem 0 0 0',
  width: '100%',
  height: '1.25rem',
  border: 'none' as const,
}

const CalendarSchedulesStyle = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
  flex: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
  box: {
    margin: '0.063rem 0 0 0',
    width: '100%',
    height: '1.25rem',
    position: 'relative' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
  nullStyle: {
    ...stick,
    zIndex: 1,
    backgroundColor: 'transparent' as const,
  },
  sub: {
    ...stick,
    opacity: 0.3,
    zIndex: 0,
  },
  main: {
    ...stick,
    zIndex: 1,
  },
  label: {
    whiteSpace: 'pre' as const,
    wordBreak: 'keep-all' as const,
    zIndex: 2,
    marginRight: 0,
  },
}

export default CalendarSchedulesStyle
