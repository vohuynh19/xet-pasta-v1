import styled from "styled-components";

export const Container = styled.div`
  padding: 0 24px;

  .cover {
    background-color: ${({ theme }) => theme.colors.line};
    border-radius: 8px;
    height: 200px;
    position: relative;

    .avatar {
      border-radius: 50%;
      overflow: hidden;
      width: 100px;
      height: 100px;
      border: 6px solid white;

      img {
        width: 100%;
        height: 100%;
      }

      position: absolute;
      bottom: -40px;
      left: 40px;
    }

    .abs-icon {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.253);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      svg {
        color: white;
        font-size: 20px;
      }
    }

    .abs-btn {
      position: absolute;
      right: 24px;
      bottom: 24px;

      svg {
        margin-right: 8px;
      }
    }
  }
`;
