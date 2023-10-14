import { Form, Input, Modal, Spin, Table, Button, message } from "antd";

import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import {
  useCourseCategory,
  useCreateCourseCategory,
  useUpdateCourseCategory,
} from "hooks";
import { queryClientInstance, courseCategoryQueryKeys } from "src/infra/https";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const CourseCategoryModal: ForwardRefRenderFunction<any, any> = ({}, ref) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { data: categories } = useCourseCategory();
  const { mutate: create, isLoading: createLoading } =
    useCreateCourseCategory();
  const { mutate: update, isLoading: updateLoading } =
    useUpdateCourseCategory();

  const columns: any[] = useMemo(
    () => [
      {
        title: "Category Name",
        dataIndex: "name",
      },
      {
        title: "Category ID",
        dataIndex: "id",
      },

      {
        title: "Action",
        key: "operation",
        width: 112,
        render: () => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon={<ModeEditIcon fontSize={"small"} color={"primary"} />}
            />

            <Button
              icon={<RemoveCircleIcon fontSize={"small"} color={"error"} />}
            />
          </div>
        ),
        fixed: "right",
      },
    ],
    []
  );

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const onFinish = () => {
    create(
      {
        ...form.getFieldsValue(),
      },
      {
        onSuccess: () => {
          message.success("Add category success");
          queryClientInstance.invalidateQueries(
            courseCategoryQueryKeys.get().queryKey
          );
          form.resetFields();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      footer={null}
      title="Course Category"
      width={600}
    >
      <div>
        <Form form={form} onFinish={onFinish}>
          <Spin spinning={createLoading}>
            <Form.Item name={"name"}>
              <Input
                prefix={<AddIcon />}
                placeholder="Add course category"
                disabled={createLoading}
              />
            </Form.Item>
          </Spin>
        </Form>
      </div>

      <div style={{ marginTop: 24 }}>
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: CourseCategory[]
            ) => {
              console.log("selectedRowKeys", selectedRowKeys);
              console.log("selectedRows", selectedRows);
            },
            getCheckboxProps: (record: CourseCategory) => ({
              value: record.id,
              key: record.id,
            }),
          }}
          scroll={{ x: 600 }}
          columns={columns}
          dataSource={categories?.data || []}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </Modal>
  );
};

export default forwardRef(CourseCategoryModal);
