import { Row } from "antd";
import styled from "styled-components";

import { OnlyPCPadding } from "styles";

export const StyledRow = styled(Row)`
  border: 1px solid ${({ theme }) => theme.colors.line};

  .left-layout {
    border-right: 1px solid ${({ theme }) => theme.colors.line};
  }

  .right-layout ${OnlyPCPadding} {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  }

  @media (max-width: 778px) {
    border: none;
    .left-layout {
      border: none;
    }

    .right-layout ${OnlyPCPadding} {
      background-color: ${({ theme }) => theme.colors.bg};
    }
  }
`;
