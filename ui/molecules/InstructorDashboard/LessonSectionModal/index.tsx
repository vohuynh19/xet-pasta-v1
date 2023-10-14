import { Form, Input, Modal, Select, Spin, message } from "antd";

import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { queryClientInstance, sectionQueryKeys } from "src/infra/https";

import { useCourses, useCreateSection, useMyProfile } from "hooks";

const LessonSectionModal: ForwardRefRenderFunction<any, any> = ({}, ref) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { mutate: create, isLoading: createLoading } = useCreateSection();
  const { data: profile } = useMyProfile();
  const { data: course } = useCourses({
    offset: 0,
    limit: 1000,
    teacherId: profile?.id,
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const onFinish = () => {
    form.validateFields(["courseId", "sectionName", "no"]).then((value) => {
      create(
        {
          ...value,
          no: Number(value.no),
        },
        {
          onSuccess: () => {
            message.success("Create section success");
            queryClientInstance.invalidateQueries({
              queryKey: ["section"],
              exact: false,
            });
            setOpen(false);
            form.resetFields();
          },
          onError: (err) => {
            message.error(
              err?.response?.data?.message || "Internal Server Error"
            );
          },
        }
      );
    });
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      title="Create lesson section"
      width={400}
      confirmLoading={createLoading}
      onOk={onFinish}
    >
      <Form form={form}>
        <Spin spinning={createLoading}>
          <Form.Item required rules={[{ required: true }]} name={"courseId"}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select course"
              options={(course?.data || []).map((course) => ({
                label: course.name,
                value: course._id,
              }))}
            />
          </Form.Item>
          <Form.Item name="sectionName" required rules={[{ required: true }]}>
            <Input placeholder="Enter Section name" />
          </Form.Item>
          <Form.Item name="no" required rules={[{ required: true }]}>
            <Input placeholder="Enter Order number" />
          </Form.Item>
        </Spin>
      </Form>
    </Modal>
  );
};

export default forwardRef(LessonSectionModal);
