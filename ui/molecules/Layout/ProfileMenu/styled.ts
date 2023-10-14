import styled from "styled-components";

import { flexVerticalCenter } from "styles";

export const Container = styled.div`
  ${flexVerticalCenter}
  max-height: 400px;

  @media (max-width: 776px) {
    flex-direction: column;
  }
`;
