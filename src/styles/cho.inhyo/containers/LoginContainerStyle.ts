import theme from '../global/theme'

const LoginContainerStyle = {
  container: {
    marginTop: '6.25rem',
    backgroundColor: theme.palette.mono.white,
    boxShadow: `0 0 0.625rem ${theme.palette.mono.lightGray}`,
    padding: '1.875rem 1.875rem 3.75rem 1.875rem',
  },
  title: {
    fontWeight: 'bold' as const,
  },
  or: {
    ...theme.font.text1,
    color: theme.palette.mono.gray,
  },
  findPw: {
    margin: '0.625rem 0 1.25rem 0',
    position: 'absolute' as const,
    right: '1.875rem',
    bottom: '0.625rem',
    ...theme.font.sub,
  },
}

export default LoginContainerStyle
