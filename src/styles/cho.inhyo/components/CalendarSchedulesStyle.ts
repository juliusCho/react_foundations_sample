const stick = {
  margin: '1px 0',
  width: '100%',
  height: '20px',
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
    margin: '1px 0',
    width: '100%',
    height: '20px',
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
  },
}

export default CalendarSchedulesStyle
