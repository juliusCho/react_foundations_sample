import styled, { css } from 'styled-components'
import theme, { StyledPropType } from '../global/theme'

const ScheduleItemStyle = {
  container: styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    padding: 0.4rem 0;

    ${(props: StyledPropType) => css`
      border-bottom: 0.063rem solid ${props.theme.palette.mono.paleWhite};

      &:hover {
        background-color: ${props.theme.palette.mono.paleWhite};
      }
    `}
  `,
  color: {
    width: '2rem',
    height: '2rem',
    border: 'none' as const,
    borderRadius: '50%',
    margin: '0.5rem',
    color: theme.palette.mono.white,
    fontSize: '1rem',
    fontWeight: 900,
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  infoContainer: {
    width: 'calc(100% - 3.5rem)',
  },
  top: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  mainLabel: {
    color: theme.palette.mono.darkGray,
    ...theme.font.text1,
  },
  bottomLabel: {
    color: theme.palette.mono.darkGray,
    ...theme.font.small,
  },
  schedule: {
    marginRight: '0.4rem',
    color: theme.palette.mono.darkGray,
    ...theme.font.sub,
  },
  label: {
    color: theme.palette.mono.black,
    ...theme.font.list2,
  },
  mainLabelArea: {
    margin: '0.4rem 0',
    width: '100%',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
}

export default ScheduleItemStyle
