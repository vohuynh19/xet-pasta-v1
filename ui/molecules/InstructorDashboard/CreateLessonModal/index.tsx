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

export const CreateLessonModal: ForwardRefRenderFunction<any, Props> = (
  { onConfirm, confirmLoading },
  ref
) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [courseId, setCourseId] = useState<string>();

  const { data: profile } = useMyProfile();
  const { data: course } = useCourses({
    offset: 0,
    limit: 1000,
    teacherId: profile?.id,
  });

  const { data: section } = useCourseSection({
    courseId: courseId || "0",
    offset: 0,
    limit: 1000,
  });

  useImperativeHandle(ref, () => ({
    setData: (data: any) => setModalData(data),
    openModal: () => setOpen(true),
    closeModal: () => onCancel(),
  }));

  const onOk = () => {
    const validateFields = [
      "name",
      "courseId",
      "sectionId",
      "youtubeLink",
      "duration",
      "isTrivial",
      "no",
    ];

    form
      .validateFields(validateFields)
      .then((value) => {
        onConfirm({
          ...value,
          isTrivial: value.isTrivial.toString(),
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

  const onValuesChange = (changes: any, values: any) => {
    if (changes.courseId) {
      setCourseId(changes.courseId);
    }
  };

  return (
    <Modal
      confirmLoading={confirmLoading}
      onOk={onOk}
      open={open}
      closable
      onCancel={onCancel}
      width={500}
    >
      <Typography.Title level={3}>Create Lesson</Typography.Title>

      <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
        <Form.Item
          name="name"
          label="Lesson name"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="Please enter lesson name" />
        </Form.Item>

        <Form.Item
          required
          rules={[{ required: true, message: "Please select course" }]}
          name="courseId"
          label="Course"
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Select course"
            options={(course?.data || []).map((e) => ({
              label: e.name,
              value: e._id,
            }))}
          />
        </Form.Item>

        <Form.Item
          required
          rules={[{ required: true }]}
          name="sectionId"
          label="Video Section"
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Select video section"
            options={(section?.data || []).map((e) => ({
              label: e.sectionName,
              value: e._id,
            }))}
          />
        </Form.Item>

        <Form.Item
          required
          rules={[{ required: true }]}
          name="youtubeLink"
          label="Youtube link"
        >
          <Input placeholder="Please enter youtube link" />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              required
              rules={[{ required: true }]}
              name="duration"
              label="Video Minutes"
            >
              <InputNumber
                style={{ width: "90%" }}
                placeholder="Please enter video minutes"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              required
              rules={[{ required: true }]}
              name="no"
              label="Video Order in Section"
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter the video order"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="isTrivial" valuePropName="checked">
          <Checkbox>Set Trivial Video</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateLessonModal);
