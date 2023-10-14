import { Layout } from "antd";
import styled from "styled-components";

export const StyledSider = styled(Layout.Sider)`
  && {
    position: fixed !important;
    right: 0px !important;
    height: 100% !important;
    z-index: 10000;
  }
`;
export const SiderProfileContainer = styled.div`
  padding: 8px 16px;
  .ant-btn {
    margin-top: 12px;
  }
`;
