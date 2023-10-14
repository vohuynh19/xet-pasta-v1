import styled from "styled-components";

import { getScaledText } from "styles";

export const Container = styled.div`
  background-color: transparent;
  background-image: linear-gradient(90deg, #0634a1 5%, #4307c578 80%);
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  margin-top: 0px;
  margin-bottom: 0px;
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  padding: 48px 80px;
  height: ${({ theme }) => theme.utils.pxToCalc(300)};

  h1 {
    ${getScaledText(32)}
    margin: 0;
  }
  p {
    ${getScaledText(16)}
  }

  svg {
    color: ${({ theme }) => theme.colors.white};
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    line-height: 0;
  }
  .clip-path {
    fill: ${({ theme }) => theme.colors.white};
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
    height: auto;
    padding-bottom: 80px;
  }
`;
