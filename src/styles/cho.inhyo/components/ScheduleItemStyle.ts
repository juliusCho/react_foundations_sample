import theme from '../global/theme'

const ScheduleItemStyle = {
  container: {
    width: '100%',
    minHeight: '3rem',
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
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
