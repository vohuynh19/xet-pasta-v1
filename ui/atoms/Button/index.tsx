import { Button, ButtonProps } from "antd";
import styled from "styled-components";

type Props = {
  isFullWidth?: boolean;
  borderRadius?: string;
  isScaled?: boolean;
} & ButtonProps &
  React.RefAttributes<HTMLElement>;

const SButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !["isFullWidth", "borderRadius", "isScaled"].includes(prop),
})<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isFullWidth = false }) => (isFullWidth ? "100%" : "auto")};

  &&.ant-btn-background-ghost {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &&.ant-btn-lg {
    padding: 8px 24px !important;
    /* border-radius: 24px !important; */
  }
`;

export default SButton;
