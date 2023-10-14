import { Col } from "antd";
import { ReactNode } from "react";
import { OnlyPCPadding } from "styles";
import { StyledRow } from "./styled";

type Props = {
  LeftComponent: ReactNode;
  RightComponent: ReactNode;
};

const DualColorLayout = ({ LeftComponent, RightComponent }: Props) => {
  return (
    <StyledRow>
      <Col xs={24} md={14} className="left-layout">
        <OnlyPCPadding vertical={8} horizontal={32}>
          {LeftComponent}
        </OnlyPCPadding>
      </Col>

      <Col xs={24} md={10} className="right-layout">
        <OnlyPCPadding vertical={8} horizontal={32}>
          {RightComponent}
        </OnlyPCPadding>
      </Col>
    </StyledRow>
  );
};

export default DualColorLayout;
