type ThemeType = {
  palette: {
    mono: Record<string, string>
    main: Record<string, string>
    sub: Record<string, string>
    status: Record<string, string>

    naver: string
    facebook: string
    kakao: string
    google: string
    apple: string
  }
  font: Record<string, { fontSize: string; fontWeight: number }>
}

export type StyledPropType = {
  theme: ThemeType
}

const theme: ThemeType = {
  palette: {
    mono: {
      black: '#333',
      paleBlack: '#666',
      darkGray: '#999',
      gray: '#CCC',
      lightGray: '#DDD',
      pale: '#EEE',
      paleWhite: '#F7F7F7',
      white: '#ffffff',
    },
    main: {
      red: '#F85A5E',
      blue: '#3067A8',
      navy: '#001B57',
      darkNavy: '#1F2940',
      yellow: '#F7C954',
      turquoise: '#5EBCCA',
      pink: '#F97F90',
    },
    sub: {
      babyPink: '#FEDDDF',
      green: '#92DCA9',
      sky: '#58C5E3',
      darkPurple: '#6258BA',
      paleYellow: '#EABF80',
      purple: '#B48BD3',
      lightGreen: '#BBDA85',
      paleBlue: '#A3B7ED',
      ocean: '#99EAED',
      pink: '#EF91AA',
      darkNavy: '#233148',
      lightBlue: '#4695EC',
      paleSky: '#7FB2D6',
    },
    status: {
      active: '#37EB5B',
      unavailable: '#EBE537',
      inactive: '#AAAAAA',
    },
    naver: '#2AB404',
    facebook: '#3B599B',
    kakao: '#F7E106',
    google: '#DA2915',
    apple: '#222',
  },
  font: {
    titleLarge: {
      fontSize: '1.5rem',
      fontWeight: 900,
    },
    titleMedium: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    titleSmall: {
      fontSize: '1.125rem',
      fontWeight: 900,
    },
    list1: {
      fontSize: '1rem',
      fontWeight: 900,
    },
    list2: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    item1: {
      fontSize: '0.875rem',
      fontWeight: 900,
    },
    item2: {
      fontSize: '0.875rem',
      fontWeight: 700,
    },
    text1: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    text2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    placeholder: {
      fontSize: '0.875rem',
      fontWeight: 300,
    },
    sub: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    small: {
      fontSize: '0.625rem',
      fontWeight: 500,
    },
  },
}

export default theme
