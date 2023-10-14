import styled from "styled-components";
import { container } from "styles";

export const Container = styled.div`
  ${container}
  background-color: transparent;
  background: ${({ theme }) => theme.colors.inverseLinearGradientBg};
`;
