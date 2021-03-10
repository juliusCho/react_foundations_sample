import theme from '../global/theme'

const DateScheduleListContainerStyle = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const,
    alignItems: 'center' as const,
    border: `1px solid ${theme.palette.mono.pale}`,
    backgroundColor: theme.palette.mono.white,
  },
  date: {
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    width: '100%',
    height: '3rem',
    ...theme.font.titleSmall,
  },
  sectionTitle: {
    margin: 0,
    justifyContent: 'space-between' as const,
    width: 'calc(100% - 1.6rem)',
    height: '2.5rem',
    padding: '0 0.8rem',
    borderBottom: `1px solid ${theme.palette.mono.lightGray}`,
    backgroundColor: theme.palette.mono.paleWhite,
    color: theme.palette.mono.gray,
    cursor: 'pointer' as const,
    ...theme.font.list1,
  },
  toggle: {
    color: theme.palette.mono.black,
    ...theme.font.list1,
  },
}

export default DateScheduleListContainerStyle
