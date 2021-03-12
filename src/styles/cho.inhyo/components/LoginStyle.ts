import theme from '../global/theme'

const LoginStyle = {
  container: {
    margin: 0,
  },
  input: {
    width: 'calc(100% - 1.563rem)',
  },
  button: {
    backgroundColor: theme.palette.main.blue,
    color: theme.palette.mono.white,
    ...theme.font.text1,
    borderRadius: '0.313rem',
    margin: '0.438rem 0 1.25rem 0',
    height: '2.188rem',
  },
}

export default LoginStyle
