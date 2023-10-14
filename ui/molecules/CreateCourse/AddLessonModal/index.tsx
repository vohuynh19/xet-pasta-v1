import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useTranslation } from "next-i18next";
import { SizeBox } from "ui/atoms";
import YouTubeIcon from "@mui/icons-material/YouTube";

const { Paragraph, Text, Title } = Typography;

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  selectedLesson: CourseLesson;
};

const AddLessonModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  selectedLesson,
}: Props) => {
  const { t } = useTranslation(["course"]);

  return (
    <Modal
      title={t("lesson")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("updateLesson")}
    >
      <Divider />
      <Form.Item
        style={{ marginBottom: "2px" }}
        name={"lessonName"}
        label={t("lessonName")}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Text type="secondary">{t("lessonNameNote")}</Text>

      <SizeBox height={8} />
      <Form.Item
        name={"videoSource"}
        style={{ marginBottom: "2px" }}
        label={t("videoSource")}
        rules={[{ required: true }]}
      >
        <Select defaultValue="youtube">
          <Select.Option value="youtube">
            {
              <Row align={"middle"}>
                <YouTubeIcon />
                Youtube
              </Row>
            }
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={"lessonVideo"}
        style={{ marginBottom: "2px" }}
        rules={[{ required: false }]}
      >
        <Input placeholder={t("pasteYoutubeURL") || ""} />
      </Form.Item>

      <SizeBox height={16} />
      <Text>{t("videoPlaybackTime")}</Text>
      <SizeBox height={8} />
      <Row>
        <Col span={7}>
          <Form.Item name={"lessonHour"}>
            <Input placeholder={"00"} addonAfter={<Text>Hour</Text>} />
          </Form.Item>
        </Col>
        <Col span={7} offset={1}>
          <Form.Item name={"lessonMinute"}>
            <Input placeholder={"00"} addonAfter={<Text>Minute</Text>} />
          </Form.Item>
        </Col>
        <Col span={7} offset={1}>
          <Form.Item name={"lessonSecond"}>
            <Input placeholder={"00"} addonAfter={<Text>Second</Text>} />
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddLessonModal;
