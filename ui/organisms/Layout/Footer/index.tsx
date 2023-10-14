import { Col, Row } from "antd";
import styled from "styled-components";
import SizeBox from "ui/atoms/SizeBox";
import { FooterDescription, FooterMenu } from "ui/molecules";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryBg};
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col xs={24} lg={12}>
          <FooterDescription />
        </Col>

        <Col xs={24} lg={0}>
          <SizeBox height={32} />
        </Col>

        <Col xs={24} lg={12}>
          <FooterMenu />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
