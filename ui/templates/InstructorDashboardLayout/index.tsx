import { Col, Row } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import { InstructorDashboardMenu } from "ui/organisms";

const Container = styled.div``;

const InstructorDashboardLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Container>
      <Row>
        <Col span={4}>
          <InstructorDashboardMenu />
        </Col>

        <Col span={20}>{children}</Col>
      </Row>
    </Container>
  );
};

export default InstructorDashboardLayout;
