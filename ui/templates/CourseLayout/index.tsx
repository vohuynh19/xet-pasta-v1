import { PropsWithChildren, ReactNode } from "react";
import { Col, Row } from "antd";
import styled from "styled-components";

import { container } from "styles";

type Props = PropsWithChildren<{
  HeaderComponent: ReactNode;
  RightComponent: ReactNode;
}>;

const Container = styled.div`
  ${container};
  padding-top: 32px;
`;

const ChildrenContainer = styled.div``;

const HeaderContainer = styled.div`
  margin-bottom: 32px;
`;

const RightContainer = styled.div`
  padding-left: 40px;
  position: sticky;
  top: 40px;

  @media (max-width: 991px) {
    position: static;
    padding-left: 0;
  }
`;

const CourseLayout = ({ HeaderComponent, RightComponent, children }: Props) => {
  return (
    <Container>
      <Row>
        <Col xs={24}>
          <HeaderContainer>{HeaderComponent}</HeaderContainer>
        </Col>

        <Col xs={24} lg={16}>
          <ChildrenContainer>{children}</ChildrenContainer>
        </Col>

        <Col xs={24} lg={8}>
          <RightContainer>{RightComponent}</RightContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseLayout;
