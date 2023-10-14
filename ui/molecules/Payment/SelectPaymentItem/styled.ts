import styled from "styled-components";
import { flexVerticalCenter } from "styles";

export const Container = styled.div`
  width: 100%;
`;

export const PaymentHead = styled.div`
  ${flexVerticalCenter};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  padding: 16px;
`;

export const LeftHead = styled.div`
  ${flexVerticalCenter};
  svg {
    margin-right: 8px;
  }
`;

export const RightHead = styled.div`
  ${flexVerticalCenter};
`;

export const PaymentContent = styled.div``;
