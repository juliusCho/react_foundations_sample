import styled from 'styled-components'

const IconButonStyle = {
  button: styled.i`
    border: none;
    border-radius: 0.625rem;
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:active {
      opacity: 0.5;
    }
  `,
}

export default IconButonStyle
