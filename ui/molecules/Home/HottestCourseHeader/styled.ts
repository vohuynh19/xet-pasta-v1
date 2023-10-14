import styled from "styled-components";
import { flex, flexVerticalCenter } from "styles";

export const Container = styled.div`
  ${flexVerticalCenter}

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const LeftContent = styled.div`
  width: 60%;
  h1 {
    font-size: ${({ theme }) => theme.utils.pxToCalc(48)};
    margin: 0;
  }
  p {
    font-size: ${({ theme }) => theme.utils.pxToCalc(16)};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 768px) {
    width: 100%;
    h1 {
      font-size: 48px;
    }
    p {
      font-size: 16px;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const RightContent = styled.div`
  ${flex}
  width: 40%;
  justify-content: flex-end;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }

  .ant-btn.ant-btn-primary.ant-btn-lg {
    width: ${({ theme }) => theme.utils.pxToCalc(160)};
    height: ${({ theme }) => theme.utils.pxToCalc(48)} !important;
    border-radius: ${({ theme }) => theme.utils.pxToCalc(48)} !important;
    font-size: ${({ theme }) => theme.utils.pxToCalc(16)} !important;
    @media (max-width: 768px) {
      width: 160px;
      height: 48px !important;
      border-radius: 48px !important;
      font-size: 16px !important;
    }
  }
`;
