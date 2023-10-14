import styled from "styled-components";

export const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 50%;

  .avatar-button {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
`;

export const Container = styled.div`
  padding: 0 24px;

  .avatar {
    border-radius: 50%;
    overflow: hidden;
    width: 168px;
    height: 168px;
    border: 6px solid white;

    img {
      width: 100%;
      height: 100%;
    }

    position: absolute;
    bottom: -68px;
    left: 40px;
  }

  .abs-icon {
    position: absolute;
    right: 24px;
    bottom: 24px;
    width: 100%;
    border-radius: 50%;
  }

  .cover {
    background-color: ${({ theme }) => theme.colors.line};
    border-radius: 8px;
    height: 200px;
    position: relative;

    img {
      width: 100%;
      height: 200px;
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

// .abs-icon {
  //   position: absolute;
  //   bottom: 0;
  //   width: 100%;
  //   background-color: rgba(0, 0, 0, 0.253);
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   height: 32px;
  //   svg {
  //     color: white;
  //     font-size: 20px;
  //   }
  // }