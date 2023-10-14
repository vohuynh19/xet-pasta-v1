import { IMAGES_URL } from "@constants";
import { Col, Row } from "antd";
import styled from "styled-components";

import { backgroundCenterCover, flexCenter, getScaledText } from "styles";

const Container = styled.div`
  ${backgroundCenterCover(IMAGES_URL.BANNER_COVER)}
  ${flexCenter}

  padding: 50px 10px 65px 10px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 40px 24px;
  }

  h2 {
    ${getScaledText(32)}
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
  }
  p {
    ${getScaledText(14)}
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
  }
`;

interface BannerTextBoxProps {
  title: string;
  content: string;
}

const BannerTextBox = ({ title, content }: BannerTextBoxProps) => {
  return (
    <Container>
      <Row>
        <Col span={24}>
          <h2>{title}</h2>
        </Col>
        <Col span={24}>
          <p>{content}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BannerTextBox;
