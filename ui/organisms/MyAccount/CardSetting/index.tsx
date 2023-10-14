import { Col, Row } from "antd";

import { SizeBox } from "ui/atoms";
import { InstructorCard, SettingAccountForm } from "ui/molecules";

import { Container } from "./styled";

const CardSetting = () => {
  return (
    <Container>
      <SizeBox height={48} />

      <Row>
        <Col xs={24} sm={12} md={8} lg={6}>
          {/* <InstructorCard /> */}
        </Col>
        <Col offset={4}>
          <SettingAccountForm />
        </Col>
      </Row>
    </Container>
  );
};

export default CardSetting;
