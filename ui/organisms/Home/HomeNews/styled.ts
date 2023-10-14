import styled from "styled-components";

export const Container = styled.section`
  position: relative;
  height: ${({ theme }) => theme.utils.pxToCalc(400)};

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const HomeNewsContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.utils.pxToCalc(160)};
  z-index: 100;
  height: ${({ theme }) => theme.utils.pxToCalc(240)};
  width: 100%;
  padding: 0px 80px;
  .ant-row {
    height: 100%;
  }

  @media (max-width: 768px) {
    position: relative;
    height: auto;
    top: -52px;
    padding: 0px 12px;
  }
`;
