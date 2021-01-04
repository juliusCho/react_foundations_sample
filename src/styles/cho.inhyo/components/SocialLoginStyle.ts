import theme from '../global/theme'

const SocialLoginStyle = {
  container: {
    marginTop: '15px',
  },
  icon: {
    width: '35px',
    height: '35px',
    color: theme.palette.white,
    borderRadius: '5px',
    margin: '5px',
  },
  naver: {
    backgroundColor: theme.palette.naver,
  },
  facebook: {
    backgroundColor: theme.palette.facebook,
  },
  kakao: {
    backgroundColor: theme.palette.kakao,
    color: theme.palette.black,
  },
  google: {
    backgroundColor: theme.palette.google,
  },
  apple: {
    backgroundColor: theme.palette.apple,
  },
}

export default SocialLoginStyle
