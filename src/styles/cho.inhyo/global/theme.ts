type ThemeType = {
  palette: Record<string, string>
  font: {
    basic: string
    bold: string
    size: Record<string, string>
  }
}

export type StyledPropType = {
  theme: ThemeType
}

const theme: ThemeType = {
  palette: {
    black: '#000000',
    white: '#ffffff',
    gray: '#838383',
    superLightGray: '#FAFAFA',
    moreLightGray: '#F2F2F2',
    lightGray: '#E9E9E9',
    slightLightGray: '#CECECE',
    slightDarkGray: '#A1A1A1',
    darkGray: '#707070',
    red: '#F85A5E',
    orange: '#ff6f00',
    blue: '#3067a8',
    slightLightBlue: '#4377b3',
    lightBlue: '#5EBCCA',
    navy: '#232F4A',
    input: '#e2ebff',
    purple: '#922aa9',
    yellow: '#ffc75e',
    naver: '#2AB404',
    facebook: '#3B599B',
    kakao: '#F7E106',
    google: '#DA2915',
    apple: '#222',
  },
  font: {
    basic: 'NotoSansCJKkr-Regular',
    bold: 'NotoSansCJKkr-Bold',
    size: {
      xSmall: '8px',
      small: '10px',
      xsmedium: '13px',
      smedium: '15px',
      medium: '16px',
      sbig: '18px',
      big: '22px',
    },
  },
}

export default theme
