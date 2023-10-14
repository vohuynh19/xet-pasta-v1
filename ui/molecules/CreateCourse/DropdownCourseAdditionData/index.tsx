import { Collapse, Divider, Form, Input, Select } from "antd";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

type Props = {};

const DropdownCourseAdditionData = ({}: Props) => {
  const { t } = useTranslation(["course"]);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange} size="large" ghost>
      <Collapse.Panel header={t("additionalData")} key="1">
        <Divider></Divider>
        <Form.Item
          name={"whatWillILearn"}
          label={t("whatWillILearn")}
          rules={[{ required: false }]}
        >
          <Input.TextArea
            rows={2}
            placeholder={t("whatWillILearnPlaceholder") || ""}
          />
        </Form.Item>

        <Form.Item
          name={"targetedAudience"}
          label={t("targetedAudience")}
          rules={[{ required: false }]}
        >
          <Input.TextArea
            rows={2}
            placeholder={t("targetedAudiencePlaceHolder") || ""}
          />
        </Form.Item>

        <Form.Item
          name={"materialsIncluded"}
          label={t("materialsIncluded")}
          rules={[{ required: false }]}
        >
          <Input.TextArea
            rows={4}
            placeholder={t("materialsIncludedPlaceHolder") || ""}
          />
        </Form.Item>

        <Form.Item
          name={"requirements"}
          label={t("requirements")}
          rules={[{ required: false }]}
        >
          <Input.TextArea
            rows={2}
            placeholder={t("requirementsPlaceHolder") || ""}
          />
        </Form.Item>
      </Collapse.Panel>
    </Collapse>
  );
};

export default DropdownCourseAdditionData;
