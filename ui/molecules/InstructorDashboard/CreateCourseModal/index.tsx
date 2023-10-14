import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Progress,
  Row,
  Select,
  Typography,
  Upload,
  message,
} from "antd";

import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useCourseCategory, useUploadImage } from "hooks";
import { RcFile } from "antd/es/upload";
import { TextEditor } from "ui/atoms";

type Props = {
  onConfirm: Function;
  confirmLoading: boolean;
};

export const CreateCourseModal: ForwardRefRenderFunction<any, Props> = (
  { onConfirm, confirmLoading },
  ref
) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { data } = useCourseCategory();
  const { uploadImage, url, reset, progress } = useUploadImage();

  useImperativeHandle(ref, () => ({
    setData: (data: any) => setModalData(data),
    openModal: () => setOpen(true),
    closeModal: () => onCancel(),
  }));

  const onOk = () => {
    const validateFields = [
      "name",
      "price",
      "categoryId",
      "courseIntro",
      "thumnail",
      "description",
      "shortDescription",
      "achivementDes",
      "prerequisiteDes",
    ];

    form
      .validateFields(validateFields)
      .then((value) => {
        onConfirm({
          ...value,
          thumnail: url,
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    reset();
  };

  const handleUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    isJpgOrPng && isLt2M && uploadImage(file);
    return false;
  };

  return (
    <Modal
      confirmLoading={confirmLoading}
      onOk={onOk}
      open={open}
      closable
      onCancel={onCancel}
      width={800}
    >
      <Typography.Title level={3}>Create Course</Typography.Title>

      <Form form={form} layout="vertical">
        <Row>
          <Col span={11}>
            <Form.Item
              name="name"
              label="Course name"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Please enter course name" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Course Price"
              required
              rules={[{ required: true }]}
            >
              <InputNumber placeholder="Price" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              required
              rules={[
                { required: true, message: "Please select course category" },
              ]}
              name="categoryId"
              label="Category"
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select course category"
                options={(data?.data || []).map((e) => ({
                  label: e.name,
                  value: e.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true }]}
              name="courseIntro"
              label="Course Intro Youtube Link"
            >
              <Input placeholder="Please enter youtube link" />
            </Form.Item>

            <Form.Item
              required
              name="thumnail"
              label="Thumbnail image"
              rules={[
                {
                  validator: () => {
                    if (!url) {
                      return Promise.reject("Please select image");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                listType="picture-card"
                name="thumnail"
                beforeUpload={handleUpload}
                multiple={false}
                showUploadList={false}
              >
                {url ? (
                  <img src={url} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  <>
                    Upload <FileUploadIcon />
                  </>
                )}
              </Upload>
              {progress && (
                <Progress percent={(progress?.progress || 0) * 100} />
              )}
            </Form.Item>
          </Col>

          <Col span={1} />

          <Col span={12}>
            <Form.Item
              required
              rules={[{ required: true }]}
              name="description"
              label="Course Description"
            >
              <TextEditor placeholder="Please enter course Description" />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true }]}
              name="shortDescription"
              label="Course short description"
            >
              <Input.TextArea
                rows={3}
                placeholder="Please enter course short description"
              />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true }]}
              name="achivementDes"
              label="Course Archivement"
            >
              <TextEditor placeholder="Please enter course Description" />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true }]}
              name="prerequisiteDes"
              label="Course Prerequisite"
            >
              <TextEditor placeholder="Please enter course Description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateCourseModal);
