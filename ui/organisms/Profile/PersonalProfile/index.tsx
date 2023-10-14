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
import { ExclamationCircleFilled } from "@ant-design/icons";
import router, { useRouter } from "next/router";
import { useMyProfile, useRegisterInstructor, useUpdateProfile } from "hooks";
import { IMAGES_URL } from "@constants";
import EditProfileModal from "ui/molecules/Profile/EditProfileModal";
import { userQueryKeys } from "src/infra/https/keys/user";
import { queryClientInstance } from "src/infra/https";
import { useRef } from "react";
import { UpdateAvatarModal, UserIntroduction } from "ui/molecules";
import { UserOutlined } from "@ant-design/icons";

const { Text, Link, Title, Paragraph } = Typography;
const { confirm } = Modal;

type Props = {
  myProfile: User;
};

const PersonalProfile = (props: Props) => {
  const { t: t } = useTranslation("common");
  const { t: sentence } = useTranslation("sentence");

  const editProfileModalRef = useRef<any>(null);
  const updateAvatarModalRef = useRef<any>(null);

  const { mutate, isLoading } = useRegisterInstructor();
  const { mutate: editProfile, isLoading: editLoading } = useUpdateProfile();

  const onOpenEditProfileModal = () => editProfileModalRef.current.openModal();
  const onOpenupdateAvatarModal = () =>
    updateAvatarModalRef.current.openModal();
  const onEditProfile = (payload: UserProfilePayload) => {
    payload.email = props.myProfile.name;
    payload.uid = props.myProfile.id;

    editProfile(payload, {
      onSuccess: (res) => {
        message.success("Update profile succes");
        editProfileModalRef.current.closeModal();
        updateAvatarModalRef.current.closeModal();
        queryClientInstance.invalidateQueries({
          queryKey: userQueryKeys.getSelf().queryKey,
        });
      },
      onError: (err) =>
        message.error(err?.response?.data?.message || "Internal Server Error"),
    });
  };

  const becomeInstructor = () => {
    props.myProfile.role === "USER"
      ? confirm({
          title: sentence("Do you want to become an instructor?"),
          icon: <ExclamationCircleFilled />,
          okText: "Confirm",
          cancelText: "Cancel",
          content: "Some ",
          okButtonProps: {
            loading: isLoading,
          },
          onOk() {
            mutate(undefined, {
              onSuccess() {
                message.success("Become instructor success");
              },
              onError() {
                message.error("Become instructor error");
              },
            });
          },
          onCancel() {},
        })
      : notification.warning({
          message: "You already have been an instructor",
        });
  };

  return (
    <Container>
      <Typography.Title level={3}>{t("profile")}</Typography.Title>
      <div className="cover">
        <img src={IMAGES_URL.PROFILE_PANEL} alt="photo" />
        <Button className="abs-btn" type="primary" icon={<AddAPhotoIcon />}>
          Upload cover photo
        </Button>
      </div>
      <Row justify="center">
        <Col
          lg={5}
          span={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <AvatarContainer>
            <Avatar
              size={144}
              icon={<UserOutlined />}
              src={props.myProfile.avatar}
            />
            <Button
              onClick={() => onOpenupdateAvatarModal()}
              className="avatar-button"
              type="primary"
              shape="circle"
              icon={<AddAPhotoIcon />}
            />
          </AvatarContainer>
        </Col>
        <Col span={8}>
          <Title level={3}>
            {props.myProfile?.displayName
              ? props.myProfile.displayName
              : props.myProfile.name}
          </Title>
          <Text type="secondary">
            {props.myProfile?.profileSubscriber || "0"} subscriber .{" "}
            {props.myProfile?.profileTotalCourse || "0"} course
          </Text>
        </Col>
        <Col span={8}>
          <SizeBox height={30} />
          <Space direction="vertical">
            <Space>
              <Button onClick={() => onOpenEditProfileModal()} type="primary">
                {t("edit")}
              </Button>
              <Button type="primary" onClick={becomeInstructor}>
                {sentence("becomeInstructor")}
              </Button>
            </Space>
            <Button
              onClick={() => {
                if (props.myProfile?.profileDiscordLink) {
                  window.open(props.myProfile.profileDiscordLink, "_blank");
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

      <UserIntroduction myProfile={props.myProfile} />
      <EditProfileModal
        ref={editProfileModalRef}
        onConfirm={onEditProfile}
        confirmLoading={false}
      />
      <UpdateAvatarModal
        ref={updateAvatarModalRef}
        onConfirm={onEditProfile}
        confirmLoading={false}
      />
    </Container>
  );
};

export default PersonalProfile;
