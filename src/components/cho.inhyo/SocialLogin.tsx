import React from 'react'
import Box from '../../foundations/cho.inhyo/Box'
import IconButton from '../../foundations/cho.inhyo/IconButton'
import SocialLoginStyle from '../../styles/cho.inhyo/components/SocialLoginStyle'
import { CorrectSessionValue, Icons } from '../../utils/cho.inhyo/types'

type Props = {
  loginAttempt: (email: string, password: string) => void
}

export default function SocialLogin({ loginAttempt }: Props) {
  const socialLogin = () => {
    const { email, password } = CorrectSessionValue

    loginAttempt(email, password)
  }

  return (
    <Box direction="horizontal" style={SocialLoginStyle.container}>
      <IconButton
        icon={Icons.NAVER}
        onClick={socialLogin}
        style={{ ...SocialLoginStyle.icon, ...SocialLoginStyle.naver }}
      />
      <IconButton
        icon={Icons.FACEBOOK}
        onClick={socialLogin}
        style={{ ...SocialLoginStyle.icon, ...SocialLoginStyle.facebook }}
      />
      <IconButton
        icon={Icons.KAKAO}
        onClick={socialLogin}
        style={{ ...SocialLoginStyle.icon, ...SocialLoginStyle.kakao }}
      />
      <IconButton
        icon={Icons.GOOGLE}
        onClick={socialLogin}
        style={{ ...SocialLoginStyle.icon, ...SocialLoginStyle.google }}
      />
      <IconButton
        icon={Icons.APPLE}
        onClick={socialLogin}
        style={{ ...SocialLoginStyle.icon, ...SocialLoginStyle.apple }}
      />
    </Box>
  )
}
