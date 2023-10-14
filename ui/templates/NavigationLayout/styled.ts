import { Layout } from "antd";
import styled from "styled-components";

const { Sider, Content, Header, Footer } = Layout;

export const StyledContent = styled(Content)`
  && {
    height: 100vh !important;
    background-color: ${({ theme }) => theme.colors.line} !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .container {
      max-width: 767px;
      height: 100vh !important;
      background-color: ${({ theme }) => theme.colors.white} !important;
      overflow-y: auto;
    }
  }
`;

export const StyledHeader = styled(Header)``;

export const StyledFooter = styled(Footer)`
  && {
    padding: 0 !important;
  }
`;

export const SiderContainer = styled.div``;
