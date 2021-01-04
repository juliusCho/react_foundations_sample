import theme from '../global/theme'

const LoginContainerStyle = {
  container: {
    marginTop: '100px',
    backgroundColor: theme.palette.white,
    boxShadow: `0 0 10px ${theme.palette.lightGray}`,
    padding: '30px 30px 60px 30px',
  },
  title: {
    fontWeight: 'bold' as const,
  },
  or: {
    fontSize: theme.font.size.small,
    color: theme.palette.gray,
  },
  findPw: {
    margin: '10px 0 20px 0',
    position: 'absolute' as const,
    right: '30px',
    bottom: '10px',
    fontSize: theme.font.size.xsmedium,
  },
}

export default LoginContainerStyle
