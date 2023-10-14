import { Col, Row } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import { ProfileVerticalMenu } from "ui/organisms";

const Container = styled.div``;

const ProfileLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Container>
      <Row>
        <Col span={5}>
          <ProfileVerticalMenu />
        </Col>

        <Col span={19}>{children}</Col>
      </Row>
    </Container>
  );
};

export default ProfileLayout;
