import styled from "styled-components";

export const Container = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + .question {
    margin-top: 8px;
  }

  &.highlighted {
    background: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    filter: saturate(1.2);

    footer .user-info span {
      color: ${props => props.theme.colors.text};
    }
  }

  &.answered {
    opacity: 0.3;
  }

  p {
    color: ${props => props.theme.colors.text};
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        color: ${props => props.theme.colors.text};
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: none;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2s;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: ${props => props.theme.colors.primary};

          svg path {
            stroke: ${props => props.theme.colors.primary};
          }
        }
      }

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;
