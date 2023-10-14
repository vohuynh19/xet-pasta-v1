import styled from "styled-components";
import { flexCenter } from "styles";

export const Container = styled.section`
  ${flexCenter};
`;

type RestrictContentProps = {
  maxWidth?: string;
  maxHeight?: string;
};
export const RestrictContent = styled.div<RestrictContentProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "100%")};
`;
