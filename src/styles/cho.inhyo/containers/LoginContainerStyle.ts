import theme from '../global/theme'

const LoginContainerStyle = {
  container: {
    marginTop: '100px',
    backgroundColor: theme.palette.mono.white,
    boxShadow: `0 0 10px ${theme.palette.mono.lightGray}`,
    padding: '30px 30px 60px 30px',
  },
  title: {
    fontWeight: 'bold' as const,
  },
  or: {
    ...theme.font.text1,
    color: theme.palette.mono.gray,
  },
  findPw: {
    margin: '10px 0 20px 0',
    position: 'absolute' as const,
    right: '30px',
    bottom: '10px',
    ...theme.font.sub,
  },
}

export default LoginContainerStyle
