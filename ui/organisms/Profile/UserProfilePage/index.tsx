import {
  Col,
  Divider,
  Row,
  Space,
  Typography,
  message,
  Modal,
  notification,
  Avatar,
} from "antd";
import { AvatarContainer, Container } from "./styled";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button, SizeBox } from "ui/atoms";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { IMAGES_URL } from "@constants";
import { UserOutlined } from "@ant-design/icons";

const { Text, Link, Title, Paragraph } = Typography;
const { confirm } = Modal;

type Props = {
  userProfile: User;
};

const UserProfilePage = (props: Props) => {
  const { t: t } = useTranslation("common");
  const { t: sentence } = useTranslation("sentence");

  const success = () => {
    message.open({
      type: "warning",
      content: "We are on development",
    });
  };

  return (
    <Col offset={4} span={16}>
      <Container>
        <Typography.Title level={3}>{t("profile")}</Typography.Title>
        <div className="cover">
          <img src={IMAGES_URL.PROFILE_PANEL} alt="photo" />
        </div>
        <Row>
          <Col
            lg={5}
            span={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <AvatarContainer>
              <Avatar
                size={144}
                icon={<UserOutlined />}
                src={props.userProfile.avatar}
              />
            </AvatarContainer>
          </Col>
          <Col span={6}>
            <Title level={3}>
              {props.userProfile?.displayName
                ? props.userProfile.displayName
                : props.userProfile.name}
            </Title>
            <Text type="secondary">
              {props.userProfile?.profileSubscriber || "0"} subscriber .{" "}
              {props.userProfile?.profileTotalCourse || "0"} course
            </Text>
          </Col>
          <Col>
            <SizeBox height={30} />
            <Space>
              <Button onClick={success} type="primary">
                Send message
              </Button>
              <Button
                onClick={() => {
                  if (props.userProfile?.profileDiscordLink) {
                    window.open(props.userProfile.profileDiscordLink, "_blank");
                  }
                }}
              >
                {t("joinDiscord")}
              </Button>
            </Space>
          </Col>
        </Row>
        <SizeBox height={10} />
        <Divider />
        <Title level={3}>{t("introduce")}</Title>

        <Row>
          <Col span={16}>
            <Space direction="vertical">
              <Paragraph>
                {props.userProfile?.profileStory ||
                  "Tell other dudes your story"}
              </Paragraph>

              <Space>
                <InfoIcon color="action" />
                {/* <Text strong>instructor</Text> */}
                <Text>
                  {props.userProfile?.profileTitles ||
                    "Người hướng dẫn - Lập trình viên"}
                </Text>
              </Space>
            </Space>
          </Col>
          <Col span={8}>
            <Button
              onClick={() => {
                if (props.userProfile?.profileYoutubeLink) {
                  window.open(props.userProfile.profileYoutubeLink, "_blank");
                }
              }}
            >
              <YouTubeIcon />
              <Text strong>Youtube .</Text>
              <Text>{props.userProfile?.profileYoutubeCount || "0"}K</Text>
            </Button>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default UserProfilePage;
