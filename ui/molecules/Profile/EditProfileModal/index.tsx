import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";

import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import { useCourseSection, useCourses, useMyProfile } from "hooks";

type Props = {
  onConfirm: Function;
  confirmLoading: boolean;
};

export const EditProfileModal: ForwardRefRenderFunction<any, Props> = (
  { onConfirm, confirmLoading },
  ref
) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { data: profile } = useMyProfile();

  useImperativeHandle(ref, () => ({
    setData: (data: any) => setModalData(data),
    openModal: () => setOpen(true),
    closeModal: () => onCancel(),
  }));

  form.setFieldValue("displayName", profile?.displayName || profile?.name);
  form.setFieldValue("profileStory", profile?.profileStory);
  form.setFieldValue("profileTitles", profile?.profileTitles);
  form.setFieldValue("profileYoutubeLink", profile?.profileYoutubeLink);
  form.setFieldValue("profileDiscordLink", profile?.profileDiscordLink);
  form.setFieldValue("profileYoutubeCount", profile?.profileYoutubeCount);
  form.setFieldValue("profileSubscriber", profile?.profileSubscriber);
  form.setFieldValue("profileTotalCourse", profile?.profileTotalCourse);

  const onOk = () => {
    const validateFields = [
      "displayName",
      "profileStory",
      "profileTitles",
      "profileYoutubeLink",
      "profileDiscordLink",
      "profileYoutubeCount",
      "profileSubscriber",
      "profileTotalCourse",
    ];

    form
      .validateFields(validateFields)
      .then((value) => {
        onConfirm({
          ...value,
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const onValuesChange = (changes: any, values: any) => {};

  return (
    <Modal
      confirmLoading={confirmLoading}
      onOk={onOk}
      open={open}
      closable
      onCancel={onCancel}
      width={500}
    >
      <Typography.Title level={3}>Edit Profile</Typography.Title>

      <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
        <Form.Item
          name="displayName"
          label="Display name"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="Please enter your name which will be display" />
        </Form.Item>

        <Form.Item name="profileStory" label="Story">
          <Input.TextArea rows={3} placeholder="Please enter your story" />
        </Form.Item>

        <Form.Item name="profileTitles" label="Professional Titles">
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Select title"
            options={[
              {
                value: "Người hướng dẫn - Lập trình viên",
                label: "Người hướng dẫn - Lập trình viên",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="profileYoutubeLink" label="Your Youtube channel">
          <Input placeholder="..." />
        </Form.Item>

        <Form.Item
          name="profileYoutubeCount"
          label="Youtube subscriber (per K)"
        >
          <Input placeholder="100" />
        </Form.Item>

        <Form.Item name="profileDiscordLink" label="Your Discord channel">
          <Input placeholder="..." />
        </Form.Item>

        <Form.Item name="profileSubscriber" label="Vicodemy Subscriber">
          <Input placeholder="Your Subscriber (Lazy dev)" />
        </Form.Item>

        <Form.Item name="profileTotalCourse" label="Total Course">
          <Input placeholder="5 (We will update later)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(EditProfileModal);
