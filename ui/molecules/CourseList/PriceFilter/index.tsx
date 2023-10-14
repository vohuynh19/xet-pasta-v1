import { Checkbox, Col, Form, Row } from "antd";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { flexVerticalCenter } from "styles";

import { PRICE_OPTION } from "ui/organisms/CourseList/types";

const Container = styled.div`
  .ant-checkbox-wrapper {
    ${flexVerticalCenter}
    margin-top: 16px;
  }

  .ant-checkbox {
    transform: none;
  }

  .ant-checkbox-inner {
    width: 24px;
    height: 24px;
    &::after {
      left: 50%;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
    }
  }
`;

const PriceFilter = () => {
  const { t } = useTranslation("common");

  const options = useMemo(
    () => [
      { label: t("free"), value: PRICE_OPTION.FREE },
      { label: t("paid"), value: PRICE_OPTION.PAID },
    ],
    [t]
  );

  return (
    <Container>
      <Form.Item name="price" label={t("price")}>
        <Checkbox.Group>
          <Row>
            {options.map((option) => (
              <Col key={option.value} span={24}>
                <Checkbox value={option.value}>{option.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </Container>
  );
};

export default PriceFilter;
