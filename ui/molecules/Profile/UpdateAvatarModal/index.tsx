import { Progress, Form, message, Modal, Upload, Typography } from "antd";
import ImgCrop from "antd-img-crop";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { RcFile } from "antd/es/upload";

import { useUploadImage } from "hooks";

type Props = {
  onConfirm: Function;
  confirmLoading: boolean;
};

export const UpdateAvatarModal: ForwardRefRenderFunction<any, Props> = (
  { onConfirm, confirmLoading },
  ref
) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { uploadImage, url, reset, progress } = useUploadImage();

  useImperativeHandle(ref, () => ({
    setData: (data: any) => setModalData(data),
    openModal: () => setOpen(true),
    closeModal: () => onCancel(),
  }));

  const onOk = () => {
    const validateFields = ["imageUri"];

    form
      .validateFields(validateFields)
      .then((value) => {
        onConfirm({
          ...value,
          imageUri: url,
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
      width={500}
    >
      <Typography.Title level={3}>Avatar</Typography.Title>

      <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
        <Form.Item
          required
          name="imageUri"
          label="Avatar image"
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
          <ImgCrop aspect={16 / 9}>
            <Upload
              listType="picture-card"
              name="imageUri"
              beforeUpload={handleUpload}
              multiple={false}
              showUploadList={false}
            >
              {url ? (
                <img src={url} alt="imageUri" style={{ width: "100%" }} />
              ) : (
                <>
                  Upload <FileUploadIcon />
                </>
              )}
            </Upload>
          </ImgCrop>
          {progress && <Progress percent={(progress?.progress || 0) * 100} />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(UpdateAvatarModal);
