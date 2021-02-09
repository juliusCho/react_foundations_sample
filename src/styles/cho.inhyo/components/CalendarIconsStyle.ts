import theme from '../global/theme'

const CalendarIconsStyle = {
  container: {
    margin: '1px 10px',
    justifyContent: 'flex-start' as const,
  },
  box: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  icon: {
    color: theme.palette.mono.white,
    ...theme.font.text1,
    width: '20px',
    height: '20px',
  },
}

export default CalendarIconsStyle
