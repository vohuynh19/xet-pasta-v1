import styled from "styled-components";
import { flexCenter, getScaledText } from "styles";

export const Container = styled.div`
  ${flexCenter}
  background: ${({ theme }) => theme.colors.linearGradientBg};
  padding: 80px 24px;

  .subcribe-title {
    font-size: ${({ theme }) => theme.utils.pxToCalc(52)};
    max-width: 50%;
    color: ${({ theme }) => theme.colors.textDarkPrimary};
    padding-right: 80px;
    text-align: center;
    font-weight: 500;
  }

  @media (max-width: 776px) {
    padding: 32px 0;
    flex-direction: column;
    .subcribe-title {
      padding-right: 0px;
      max-width: 320px;
    }
  }
`;

export const ContentContainer = styled.div`
  width: ${({ theme }) => theme.utils.pxToCalc(540)};
  text-align: center;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  h1 {
    ${getScaledText(28)}
    font-weight: 400;
    margin-top: 24px;
    margin-bottom: 48px;
  }

  .ant-input-affix-wrapper {
    border-radius: 16px !important;
    padding: 8px 8px 8px 24px;
    ${getScaledText(14)}

    button {
      ${getScaledText(14)}
    }
  }

  .textinput {
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    margin-top: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 24px;
    padding-bottom: 80px;
  }
`;
