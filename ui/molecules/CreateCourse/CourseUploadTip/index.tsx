import { Typography } from "antd";
import { useTranslation } from "next-i18next";
import { Container } from "./styled";
import { SizeBox } from "ui/atoms";

const { Paragraph, Text, Title } = Typography;

const CourseUploadTips = () => {
  const { t } = useTranslation("course");

  return (
    <Container>
      <Title level={3}>{t("courseUploadTipTilte")}</Title>
      <Paragraph>
        <ul>
          <li>
            <Text>{t("courseUploadTip1")}</Text>
            <SizeBox height={8} />
          </li>
          <li>
            <Text>{t("courseUploadTip2")}</Text>
            <SizeBox height={8} />
          </li>
          <li>
            <Text>{t("courseUploadTip3")}</Text>
            <SizeBox height={8} />
          </li>
          <li>
            <Text>{t("courseUploadTip4")}</Text>
            <SizeBox height={8} />
          </li>
          <li>
            <Text>{t("courseUploadTip5")}</Text>
            <SizeBox height={8} />
          </li>
          <li>
            <Text>{t("courseUploadTip6")}</Text>
            <SizeBox height={8} />
          </li>
          <li>
            <Text>{t("courseUploadTip7")}</Text>
            <SizeBox height={8} />
          </li>
        </ul>
      </Paragraph>
    </Container>
  );
};

export default CourseUploadTips;
