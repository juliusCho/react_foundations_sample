import styled, { css } from 'styled-components'
import { StyledPropType } from '../global/theme'

const TimePickerStyle = {
  container: styled.div`
    width: 45%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-left: 30%;
    position: absolute;
    bottom: 70px;
  `,
  picker: styled.div`
    width: calc(100% - 5px);
    height: 35px;
    cursor: pointer;
    border: none;
    border-radius: 30px;

    & * {
      cursor: pointer;
    }

    & .time-picker {
      width: 90%;
      text-align-last: center;
    }

    ${(props: StyledPropType) => css`
      & .time-picker .rc-time-picker-input {
        padding-right: 15px;
        background-color: ${props.theme.palette.mono.lightGray};
        font-weight: ${props.theme.font.text1.fontWeight};
        font-size: ${props.theme.font.text1.fontSize};
        border: none;
        border-radius: 30px;
        color: ${props.theme.palette.mono.black};
        height: 29px;
      }

      & .time-picker .rc-time-picker-clear {
        padding-right: 15px;
      }

      & .rc-time-picker-clear-icon {
        color: ${props.theme.palette.main.red};
        margin-bottom: 2px;
      }

      & .rc-time-picker-panel {
        color: ${props.theme.palette.mono.gray};
      }
    `}
  `,
}

export default TimePickerStyle
