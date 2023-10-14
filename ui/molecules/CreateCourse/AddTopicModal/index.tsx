import { Divider, Form, Input, Modal, Row, Typography } from "antd";
import { useTranslation } from "next-i18next";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SizeBox } from "ui/atoms";

const { Paragraph, Text, Title } = Typography;

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  selectedTopic: CourseTopic;
};

const AddTopicModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  selectedTopic,
}: Props) => {
  const { t } = useTranslation(["course"]);

  return (
    <Modal
      title={t("addTopic")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("addTopic")}
    >
      <Divider />
      <Form.Item
        style={{ marginBottom: "2px" }}
        name={"topicName"}
        label={t("topicName")}
      >
        <Input />
      </Form.Item>
      <Text type="secondary">{t("topicNameNote")}</Text>

      <SizeBox height={8} />

      <Form.Item
        style={{ marginBottom: "2px" }}
        name={"topicSummary"}
        label={t("topicSummary")}
      >
        <Input.TextArea value={selectedTopic.summary} />
      </Form.Item>
      <Text type="secondary">{t("topicSummaryNote")}</Text>
    </Modal>
  );
};

export default AddTopicModal;
