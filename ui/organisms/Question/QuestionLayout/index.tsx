import { PropsWithChildren, ReactNode } from "react";
import { Col, Layout, Row } from "antd";

import { Container, StyledContent, StyledSider } from "./styled";
import useAppStore from "stores/useAppStore";

type Props = PropsWithChildren<{
  RightComponent: ReactNode;
  TopComponent: ReactNode;
  SiderComponent: ReactNode;
}>;

const FilterLayout = ({
  RightComponent,
  TopComponent,
  SiderComponent,
  children,
}: Props) => {
  const { collapsed } = useAppStore((state) => ({
    collapsed: state.isHiddenFilterNav,
  }));

  return (
    <Layout>
      <StyledContent>
        <Container>
          <Row>
            <Col xs={0} lg={1} />

            <Col xs={22} lg={16}>
              {TopComponent}
              {children}
            </Col>

            <Col xs={1} lg={1} />

            <Col xs={0} lg={5}>
              {RightComponent}
            </Col>

            <Col xs={1} lg={1} />
          </Row>
        </Container>
      </StyledContent>

      <StyledSider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        width="330px"
      >
        {SiderComponent}
      </StyledSider>
    </Layout>
  );
};

export default FilterLayout;
