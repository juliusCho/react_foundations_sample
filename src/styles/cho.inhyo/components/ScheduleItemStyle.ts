import theme from '../global/theme'

const ScheduleItemStyle = {
  container: {
    width: 'calc(100% - 0.5rem)',
    minHeight: '3rem',
    display: 'flex' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
    borderBottom: `1px solid ${theme.palette.mono.paleWhite}`,
    cursor: 'pointer' as const,
  },
  color: {
    width: '2rem',
    height: '2rem',
    border: 'none' as const,
    borderRadius: '50%',
    margin: '0.5rem',
    color: theme.palette.mono.white,
    fontSize: '1rem',
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  infoContainer: {
    width: 'calc(100% - 3.5rem)',
  },
  top: {
    display: 'flex' as const,
    alignItems: 'center' as const,
  },
  mainLabel: {
    color: theme.palette.mono.darkGray,
    ...theme.font.text1,
  },
  schedule: {
    color: theme.palette.mono.darkGray,
    ...theme.font.sub,
  },
  label: {
    color: theme.palette.mono.black,
    ...theme.font.list2,
  },
}

export default ScheduleItemStyle
