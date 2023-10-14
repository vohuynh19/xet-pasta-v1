import { Form, Input, Button } from "antd";

const SettingAccountForm = () => {
  const onFinish = () => {
    // You can perform further actions with the form values here
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="youtubeChannel"
        label="YouTube Channel"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="youtubeSubscribers"
        label="YouTube Subscribers"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="facebookChannel"
        label="Facebook Channel"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="facebookSubscribers"
        label="Facebook Subscribers"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="discordChannel"
        label="Discord Channel"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SettingAccountForm;
