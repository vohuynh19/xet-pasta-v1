import { Card } from "antd";
import styled from "styled-components";
import { getScaledText } from "styles";

export const StyledCard = styled(Card)`
  .ant-card-cover {
    cursor: pointer !important;
  }

  h3 {
    margin: 0;
  }
  h4 {
    margin-top: 8px;
    margin-bottom: 0px;
    height: 32px;
  }

  .ant-card-meta-title {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    ${getScaledText(16)}
  }

  .ant-card-meta-description {
    ${getScaledText(14)}
  }

  .ant-card-cover {
    img {
      height: 160px;
      object-fit: cover;
    }
  }

  .ant-card-body {
    height: 180px;
  }
`;

export const ActionContainer = styled.div`
  width: 100%;
  padding: 0px 24px;
  button {
    width: 100%;
    height: 40px;
  }
`;
