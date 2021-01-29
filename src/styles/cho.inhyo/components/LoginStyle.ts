import theme from '../global/theme'

const LoginStyle = {
  container: {
    margin: 0,
  },
  input: {
    width: 'calc(100% - 25px)',
  },
  button: {
    backgroundColor: theme.palette.main.blue,
    color: theme.palette.mono.white,
    ...theme.font.text1,
    borderRadius: '5px',
    margin: '7px 0 20px 0',
    height: '35px',
  },
}

export default LoginStyle
