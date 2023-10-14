import styled from "styled-components";
import { container } from "styles";

export const Container = styled.section`
  ${container}
  padding-bottom: 80px;
  background: white;

  .nextButton {
    position: absolute;
    bottom: -32px;
    right: 0;
  }
`;
