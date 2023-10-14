import { Layout } from "antd";
import styled from "styled-components";
import { getScaledText } from "styles";

const { Content, Sider } = Layout;

export const Container = styled.section`
  margin: 80px 0;
  .ant-form-item-label label {
    ${getScaledText(16)}
    font-weight: 500;
  }
`;

export const StyledContent = styled(Content)`
  background-color: ${({ theme }) => theme.colors.bg} !important;
`;

export const StyledSider = styled(Sider)`
  && {
    position: fixed !important;
    top: 0 !important;
    bottom: 0 !important;
    right: 0;
  }
`;
