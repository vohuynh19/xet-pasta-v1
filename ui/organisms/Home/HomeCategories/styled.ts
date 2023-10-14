import styled from "styled-components";
import { extend, flexCenter } from "styles";

export const Container = styled.section`
  .ant-card {
    height: ${({ theme }) => theme.utils.pxToCalc(100)};
    width: 100%;
    @media (max-width: 1200px) {
      height: ${({ theme }) => theme.utils.pxToCalc(180)};
    }
  }
  .ant-card-body {
    ${flexCenter}
    ${extend}

    font-size: ${({ theme }) => theme.utils.pxToCalc(20)};
    @media (max-width: 778px) {
      font-size: 20px;
    }
  }
  width: 100%;
  padding: 64px 24px;
`;
