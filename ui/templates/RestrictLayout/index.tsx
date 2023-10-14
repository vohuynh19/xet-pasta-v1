import { PropsWithChildren } from "react";
import { Container, RestrictContent } from "./styled";

type Props = PropsWithChildren<{
  maxWidth?: string;
  maxHeight?: string;
}>;

const RestrictLayout = ({ children, maxWidth, maxHeight }: Props) => {
  return (
    <Container>
      <RestrictContent maxWidth={maxWidth} maxHeight={maxHeight}>
        {children}
      </RestrictContent>
    </Container>
  );
};

export default RestrictLayout;
