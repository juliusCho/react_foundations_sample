/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import endpoint from './endpoints.config'

export const Months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

export const Days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

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
      etc: {
        ok: '선택',
        time: '시간',
      },
      calendar: {
        schedule: '일정',
        channel: '마감 채널',
        card: '마감 카드',
        todo: '마감 할일',
        dueto: '{{date}} 마감',
        nodata: '해당 날짜에 조회된 건이 없습니다.',
        create: '일정 생성',
        january: '1월',
        february: '2월',
        march: '3월',
        april: '4월',
        may: '5월',
        june: '6월',
        july: '7월',
        august: '8월',
        september: '9월',
        october: '10월',
        november: '11월',
        december: '12월',
        sunday: '일',
        monday: '월',
        tuesday: '화',
        wednesday: '수',
        thursday: '목',
        friday: '금',
        saturday: '토',
        yearMonth: '{{year}}년 {{month}}',
        day1: '{{day}}일',
        day2: '{{day}}일',
        day3: '{{day}}일',
        day: '{{day}}일',
        moreSchedule: '그 외 {{count}}건...',
        before: '{{time}} 전',
        hour: '{{hour}}시간',
        minute: '{{minute}}분',
        mainSchedule: '주',
        subSchedule: '보',
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
      etc: {
        ok: 'Select',
        time: 'Time',
      },
      calendar: {
        schedule: 'Schedules',
        channel: 'Channels to be closed',
        card: 'Due Cards',
        todo: 'Due Tasks',
        dueto: 'Due to {{date}}',
        nodata: 'No data has been found within this date.',
        create: 'Create Schedule',
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
        sunday: 'Sun',
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        yearMonth: '{{month}} {{year}}',
        day1: '{{day}}st',
        day2: '{{day}}nd',
        day3: '{{day}}rd',
        day: '{{day}}th',
        moreSchedule: 'And {{count}} more...',
        before: '{{time}} before',
        hour: '{{hour}}hrs',
        minute: '{{minute}}mins',
        mainSchedule: 'M',
        subSchedule: 'S',
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
