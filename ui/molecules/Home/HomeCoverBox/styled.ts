import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  width: ${({ theme }) => theme.utils.pxToCalc(600)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.utils.pxToCalc(48)};
    b {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  p {
    font-size: ${({ theme }) => theme.utils.pxToCalc(24)};
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    width: 100%;

    h2 {
      font-size: 32px;
    }

    p {
      font-size: 16px;
    }
    br {
      display: none;
    }
  }

  .btn-group {
    display: flex;
    .ant-btn.ant-btn-primary.ant-btn-lg {
      width: 140px;
      height: 54px;
      padding: 0 !important;
    }
    .community {
      margin-right: 24px;
    }
  }
`;
