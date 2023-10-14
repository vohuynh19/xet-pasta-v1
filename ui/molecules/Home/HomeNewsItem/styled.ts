import { Card } from "antd";
import styled from "styled-components";
import { flexCol, flexVerticalCenter, getScaledText, shadow } from "styles";

export const StyledCard = styled(Card)`
  height: 100%;
  width: 100%;
  .ant-card-body {
    height: 100%;
    width: 100%;
    cursor: pointer;
    ${flexCol}

    h1 {
      ${getScaledText(20)}
      margin: 0;
      font-weight: 500;
      margin-top: 16px;
    }

    p {
      ${getScaledText(14)}
      margin: 0;
      color: ${({ theme }) => theme.colors.textSecondary};
      font-weight: 400;
    }

    a {
      ${getScaledText(16)}
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
      ${flexVerticalCenter}
    }

    &:hover {
      a {
        color: ${({ theme }) => theme.colors.primary};
      }
      ${shadow}
    }
  }
`;
