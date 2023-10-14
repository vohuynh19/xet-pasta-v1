import { Container } from "./styled";
import { useLinkInstructorDiscord, useMyProfile } from "hooks";
import { useRouter } from "next/router";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import { queryClientInstance, userQueryKeys } from "src/infra/https";
import { useEffect } from "react";

const ConnectDiscord = () => {
  const router = useRouter();
  const { guideId, discordId } = router.query;

  const { data: myProfile } = useMyProfile();
  const { mutate: linkInstructorDiscord, isLoading } =
    useLinkInstructorDiscord();

  const [form] = Form.useForm();

  useEffect(() => {
    if (guideId && discordId) {
      form.setFieldsValue({
        guideId,
        discordId,
      });
    }
  }, [guideId, discordId, form]);

  const onFinish = () => {
    const changeObj = form.getFieldsValue();

    let payload: LinkDiscordPayload = {
      uid: myProfile?.id || "",
      email: myProfile?.id || "",
      discordId: "",
      guideId: "",
    };

    if (changeObj.guideId) {
      payload.guideId = changeObj.guideId;
    }

    if (changeObj.discordId) {
      payload.discordId = changeObj.discordId;
    }

    linkInstructorDiscord(payload, {
      onSuccess: (res) => {
        message.success("Link profile succes");
        queryClientInstance.invalidateQueries({
          queryKey: userQueryKeys.getSelf().queryKey,
        });
      },
      onError: (err) =>
        message.error(err?.response?.data?.message || "Internal Server Error"),
    });
  };

  const initialValues = {
    guideId: guideId,
    discordId: discordId,
  };

  return (
    <Container>
      <Col span={10}>
        <Form onFinish={onFinish} form={form} initialValues={initialValues}>
          <Form.Item label="DiscordID (User ID)" name="discordId">
            <Input defaultValue={initialValues.discordId} />
          </Form.Item>
          <Form.Item label="GuideID (Server ID)" name="guideId">
            <Input defaultValue={initialValues.guideId} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Connect
            </Button>
          </Form.Item>
        </Form>

        <Space>
          <Typography.Text> Your Discord Channel</Typography.Text>
          <Button
            onClick={() =>
              router.push(`https://discord.com/channels/${myProfile?.guideId}`)
            }
          >
            {myProfile?.discordId && myProfile?.guideId ? (
              <Typography.Text type="success">Linked</Typography.Text>
            ) : (
              <Typography.Text type="danger">Unlinked</Typography.Text>
            )}
          </Button>
        </Space>

        <Divider></Divider>
        <Typography.Text> This is for instructor only !</Typography.Text>
      </Col>
    </Container>
  );
};

export default ConnectDiscord;
