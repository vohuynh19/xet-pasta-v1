import { Col, Row, Space, Typography } from "antd";
import styled from "styled-components";

import InfoIcon from "@mui/icons-material/Info";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTranslation } from "react-i18next";
import { Button, MarkupView, SizeBox } from "ui/atoms";
import { CourseInformation } from "ui/organisms";

const { Text, Link, Title, Paragraph } = Typography;

const Container = styled.div`
  padding: 1px 20px 10px;
  max-width: 500px;
`;

type Props = {
  course: SCourse;
};

const CourseCardPopover = (props: Props) => {
  const { t: t } = useTranslation("common");

  const date = new Date(props.course.updatedAt);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <Container>
      <Title level={4}>{props.course.name}</Title>
      <Text style={{ color: "green" }}>{t("updated")} </Text>
      <Text style={{ color: "green" }} strong>
        {month} {year}
      </Text>
      <SizeBox height={10} />
      <Paragraph ellipsis={{ rows: 3, expandable: false }}>
        {props.course.shortDescription ||
          "This should be short description of course and i want it to be about 3 rows so i create this dummy text a bit longer than expected. I hope this will be 3 rows here"}
      </Paragraph>

      <MarkupView html={props.course.achivementDes} />
    </Container>
  );
};
export default CourseCardPopover;
