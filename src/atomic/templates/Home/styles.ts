import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  main {
    flex: 1;

    padding: 0 32px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    align-items: stretch;
    text-align: center;

    strong {
      font: 600 18px "Poppins", sans-serif;
      line-height: 42px;
      margin-top: 6px;
      color: ${props => props.theme.colors.text};
    }

    p {
      font-size: 14px;
      line-height: 32px;
      color: ${props => props.theme.colors.text};
    }

    > img {
      align-self: center;
    }

    form {
      input {
        height: 50px;
        border-radius: 8px;
        padding: 0 16px;
        background: #fff;
        border: 1px solid #a8a8b3;
      }

      button {
        margin-top: 16px;
      }

      button,
      input {
        width: 100%;
      }
    }
  }

  .create-room {
    margin-top: 10px;
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: #ea4335;
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    img {
      margin-right: 8px;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  .separator {
    font-size: 14px;
    color: ${props => props.theme.colors.text};

    margin: 32px 0;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      flex: 1;
      height: 1px;
      background: #a8a8b3;
      margin-right: 16px;
    }

    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #a8a8b3;
      margin-left: 16px;
    }
  }
`;
