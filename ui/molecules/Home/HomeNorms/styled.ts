import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  h1 {
    font-weight: 400;
    margin: 0;
    font-size: ${({ theme }) => theme.utils.pxToCalc(40)};
    color: ${({ theme }) => theme.colors.textDarkPrimary};
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
