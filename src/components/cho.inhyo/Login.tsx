import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '../../foundations/cho.inhyo/Box'
import Form from '../../foundations/cho.inhyo/Form'
import InputBox from '../../foundations/cho.inhyo/InputBox'
import LabelButton from '../../foundations/cho.inhyo/LabelButton'
import LoginStyle from '../../styles/cho.inhyo/components/LoginStyle'
import { useIsMounted } from '../../utils/cho.inhyo/hooks'

type Props = {
  loginAttempt: (email: string, password: string) => void
  attemptSuccess: boolean
}

export default function Login({ loginAttempt, attemptSuccess }: Props) {
  const { t } = useTranslation()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setEmail(() => '')
      setPassword(() => '')
    }
  }, [isMounted, attemptSuccess])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else {
      setPassword(value)
    }
  }

  const onSubmit = () => {
    loginAttempt(email, password)
  }

  return (
    <Form onSubmit={onSubmit} className="col-12">
      <Box direction="vertical" style={LoginStyle.container}>
        <InputBox
          className="col-12"
          style={LoginStyle.input}
          type="email"
          name="email"
          value={email}
          placeholder={t('login.inputEmail')}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <InputBox
          className="col-12"
          style={LoginStyle.input}
          type="password"
          name="password"
          value={password}
          placeholder={t('login.inputPassword')}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <LabelButton
          className="col-12"
          value={t('login.submit')}
          onClick={onSubmit}
          style={LoginStyle.button}
        />
      </Box>
    </Form>
  )
}
