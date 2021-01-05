/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import endpoint from './endpoints.config'

export const locales = {
  ko: {
    translation: {
      auth: {
        invalidReach: '잘못된 접근입니다.',
        loginSuccess: '로그인 되었습니다.',
        invalidLoginInfo: '이매일 또는 비밀번호가 유효하지 않습니다.',
        logout: '로그아웃 되었습니다.',
      },
      mainPage: {
        title: '메인 페이지',
        logout: '로그아웃',
      },
      noPage: {
        title: '존재하지 않는 페이지 입니다.',
      },
      signin: {
        title: '회원가입 페이지',
        goBack: '이전으로 이동',
      },
      login: {
        title: '로그인 해주세요',
        inputEmail: '이메일을 입력하세요.',
        inputPassword: '비밀번호를 입력하세요.',
        submit: '로그인',
        findPassword: '비밀번호 찾기',
        yourPasswordIs: '당신의 비밀번호는 [{{password}}] 입니다.',
        signinMsg: '아직도 회원이 아니신가요?',
        goSignin: '회원가입',
      },
    },
  },
  eng: {
    translation: {
      auth: {
        invalidReach: 'Invalid access.',
        loginSuccess: 'Login Succeeded.',
        invalidLoginInfo: 'Email or Password is invalid.',
        logout: 'Logout Proceeded.',
      },
      mainPage: {
        title: 'Main Page',
        logout: 'Logout',
      },
      noPage: {
        title: 'Page Not Exist.',
      },
      signin: {
        title: 'Signin Page',
        goBack: 'Go Back',
      },
      login: {
        title: 'Please login',
        inputEmail: 'Fill in your email.',
        inputPassword: 'Fill in your password.',
        submit: 'Login',
        findPassword: 'Find Password',
        yourPasswordIs: 'Your password is [{{password}}].',
        signinMsg: 'Still not a member?',
        goSignin: 'Sign In',
      },
    },
  },
}

void i18n.use(initReactI18next).init({
  debug: true,
  resources: {
    ...locales,
  },
  lng: endpoint.systemLocale,
  fallbackLng: 'ko',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
