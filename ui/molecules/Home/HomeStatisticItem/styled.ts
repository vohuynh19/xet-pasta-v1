import styled from "styled-components";
import { flexColCenter } from "styles";

export const Container = styled.div`
  ${flexColCenter}
  h1 {
    font-size: ${({ theme }) => theme.utils.pxToCalc(24)};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textDarkPrimary};
    margin: 0;
    margin-bottom: 24px;
  }
  p {
    font-size: ${({ theme }) => theme.utils.pxToCalc(18)};
    margin: 0;
    color: ${({ theme }) => theme.colors.textPrimarySecondary};
  }
`;
