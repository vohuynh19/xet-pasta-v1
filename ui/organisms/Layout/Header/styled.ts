import { container, flex, flexCenterEnd, flexCenter } from "styles";
import styled from "styled-components";
export const Container = styled.div`
  ${container}
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

export const HeaderRightContainer = styled.div`
  ${flex}
  ${flexCenterEnd}
`;

export const MenuContainer = styled.div`
  ${flexCenter}
`;
