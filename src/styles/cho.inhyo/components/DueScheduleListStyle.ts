import theme from '../global/theme'

const DueScheduleListStyle = {
  nodata: {
    width: '100%',
    minHeight: '3rem',
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderBottom: `1px solid ${theme.palette.mono.paleWhite}`,
    backgroundColor: 'transparent' as const,
    color: theme.palette.mono.gray,
    ...theme.font.list2,
  },
}

export default DueScheduleListStyle
