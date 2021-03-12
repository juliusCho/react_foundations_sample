import theme from '../global/theme'

const SocialLoginStyle = {
  container: {
    marginTop: '0.938rem',
  },
  icon: {
    width: '2.188rem',
    height: '2.188rem',
    color: theme.palette.mono.white,
    borderRadius: '0.313rem',
    margin: '0.313rem',
  },
  naver: {
    backgroundColor: theme.palette.naver,
  },
  facebook: {
    backgroundColor: theme.palette.facebook,
  },
  kakao: {
    backgroundColor: theme.palette.kakao,
    color: theme.palette.mono.black,
  },
  google: {
    backgroundColor: theme.palette.google,
  },
  apple: {
    backgroundColor: theme.palette.apple,
  },
}

export default SocialLoginStyle
