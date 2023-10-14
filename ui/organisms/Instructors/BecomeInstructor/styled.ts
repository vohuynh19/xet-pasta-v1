import styled from "styled-components";
import { getScaledText } from "styles";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.utils.pxToCalc(0)} ${theme.utils.pxToCalc(200)}`};
  background-color: ${({ theme }) => theme.colors.lightPrimaryBg};
  position: relative;
  height: ${({ theme }) => theme.utils.pxToCalc(400)};
  margin-top: ${({ theme }) => theme.utils.pxToCalc(80)};

  .left-content {
    width: 44%;

    h1 {
      font-weight: 500 !important;
      margin-top: 0;
      ${getScaledText(44)}
    }

    .ant-typography-secondary {
      ${getScaledText(16)}
    }
  }

  img {
    border-radius: 16px;
    height: ${({ theme }) => theme.utils.pxToCalc(400)};
    position: absolute;
    bottom: ${({ theme }) => theme.utils.pxToCalc(44)};
    right: ${({ theme }) => theme.utils.pxToCalc(200)};
  }

  @media (max-width: 1024px) {
    padding: ${({ theme }) =>
      `${theme.utils.pxToCalc(0)} ${theme.utils.pxToCalc(80)}`};

    img {
      right: ${({ theme }) => theme.utils.pxToCalc(80)};
    }

    .left-content {
      width: 50%;

      h1 {
        font-size: 24px;
      }

      .ant-typography-secondary {
        font-size: 14px;
      }
    }

    button {
      margin-bottom: 24px;
    }
  }

  @media (max-width: 576px) {
    padding: 24px 40px;
    height: auto;
    .left-content {
      width: auto;
    }

    img {
      position: static;
      width: 280px;
      height: auto;
    }
  }
`;
