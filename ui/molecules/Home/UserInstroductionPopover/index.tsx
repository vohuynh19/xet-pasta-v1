import { Col, Row, Space, Typography } from "antd";
import styled from "styled-components";

import InfoIcon from "@mui/icons-material/Info";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTranslation } from "react-i18next";
import { Button, SizeBox } from "ui/atoms";

const { Text, Link, Title, Paragraph } = Typography;

const Container = styled.div`
  padding: 5px 20px 10px;
`;

type Props = {
  myProfile: User;
};

const UserInstroductionPopover = (props: Props) => {
  const { t: t } = useTranslation("common");
  return (
    <Container>
      <Title level={3}>{t("introduce")}</Title>
      <Row>
        <Col span={16}>
          <Space direction="vertical">
            <Paragraph>
              {props.myProfile?.profileStory || "Tell other dudes your story"}
            </Paragraph>

            <Space>
              <InfoIcon color="action" />
              {/* <Text strong>instructor</Text> */}
              <Text>
                {props.myProfile?.profileTitles ||
                  "Người hướng dẫn - Lập trình viên"}
              </Text>
            </Space>
          </Space>
        </Col>
        <Col span={8}>
          <Space direction="vertical">
            <Button
              onClick={() => {
                if (props.myProfile?.profileDiscordLink) {
                  window.open(props.myProfile.profileDiscordLink, "_blank");
                }
              }}
            >
              {t("joinDiscord")}
            </Button>
            {props.myProfile?.profileYoutubeLink && (
              <Button
                onClick={() => {
                  window.open(props.myProfile.profileYoutubeLink, "_blank");
                }}
              >
                <YouTubeIcon />
                <Text strong>Youtube .</Text>
                <Text>{props.myProfile?.profileYoutubeCount || "0"}K</Text>
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Container>
  );
};
export default UserInstroductionPopover;
