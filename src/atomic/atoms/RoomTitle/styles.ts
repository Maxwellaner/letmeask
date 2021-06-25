import styled from "styled-components";

export const Container = styled.div`
  margin: 32px 0 24px;
  display: flex;
  align-items: center;

  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    color: ${props => props.theme.colors.text};
  }

  span {
    margin-left: 16px;
    background: ${props => props.theme.colors.secondary};
    border-radius: 9999px;
    padding: 8px 16px;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
`;