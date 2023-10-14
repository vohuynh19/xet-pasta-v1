import { Input, Typography, Row, Col, Form, message } from "antd";
import { Button, SizeBox } from "ui/atoms";
import { Container, ContentContainer } from "./styled";
import { useTranslation } from "next-i18next";
import { useSendFeedback } from "hooks/server/misc";

const HomeSubscribe = () => {
  const { t } = useTranslation("home");

  const { mutate: sendFeedback, isLoading } = useSendFeedback();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const [form] = Form.useForm();

  const onSubmitForm = (value: any) => {
    let payload: UserFeedbackPayload = {
      email: "",
      feedback: "",
      preName: "",
      phoneNumber: "",
    };

    if (value.email) {
      payload.email = value.email;
    }

    if (value.feedback) {
      payload.feedback = value.feedback;
    }

    if (value.preName) {
      payload.preName = value.preName;
    }

    if (value.phoneNumber) {
      payload.phoneNumber = value.phoneNumber;
    }

    sendFeedback(payload, {
      onSuccess: (res) => {
        message.success("Send feedback succes");
        form.resetFields();
      },
      onError: (err) => message.error("Internal Server Error"),
    });
  };

  const onFinish = () => {
    const validateFields = ["email", "feedback", "preName", "phoneNumber"];

    form
      .validateFields(validateFields)
      .then((value) => {
        console.log(value);
        onSubmitForm({
          ...value,
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  return (
    <Container>
      <h1
        className="subcribe-title"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
      >
        {t("feedbackSen1")}
      </h1>

      <ContentContainer data-aos="flip-left" data-aos-easing="ease-out-cubic">
        <h1>Thông tin của bạn</h1>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item name={"email"} rules={[{ required: true }]}>
            <Input size="large" placeholder="Your email address here" />
          </Form.Item>

          <Form.Item name={"feedback"} rules={[{ required: true }]}>
            <Input.TextArea rows={4} size="large" placeholder="Your feedback" />
          </Form.Item>

          <Form.Item
            name={"preName"}
            label={t("feedbackSen2")}
            rules={[{ required: false }]}
          >
            <Input placeholder="Yes ..." />
          </Form.Item>

          <Form.Item
            name={"phoneNumber"}
            label={t("feedbackSen3")}
            rules={[{ required: false }]}
          >
            <Input placeholder="Phone number" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" size="large" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default HomeSubscribe;
