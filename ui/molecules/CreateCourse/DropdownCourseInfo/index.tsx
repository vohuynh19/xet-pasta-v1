import { Collapse, Divider, Form, Input, Select } from "antd";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

type Props = {
  title: string;
  aboutCourse: string;
  thumbnailUrl: string;
  categories: CourseCategory[];
  availableCategories: CourseCategory[];
  difficultLevel: string;
};

const DropdownCourseInfo = ({
  title,
  aboutCourse,
  thumbnailUrl,
  categories,
  availableCategories,
  difficultLevel,
}: Props) => {
  const { t } = useTranslation("course");

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange} size="large" ghost>
      <Collapse.Panel header={t("courseInfo")} key="1">
        <Divider></Divider>
        <Form.Item
          name={"title"}
          label={t("courseTitle")}
          rules={[{ required: true }]}
        >
          <Input defaultValue={title} placeholder="New Course" />
        </Form.Item>

        <Form.Item
          name={"aboutCourse"}
          label={t("aboutCourse")}
          rules={[{ required: true }]}
        >
          <Input.TextArea defaultValue={aboutCourse} rows={4} />
        </Form.Item>

        <Form.Item
          name={"difficultLevel"}
          label={t("difficultLevel")}
          rules={[{ required: false }]}
        >
          <Select
            defaultValue={difficultLevel !== "" ? difficultLevel : "allLevel"}
          >
            <Select.Option value="allLevel">{t("allLevel")}</Select.Option>
            <Select.Option value="easy">{t("easy")}</Select.Option>
            <Select.Option value="intermediate">
              {t("intermediate")}
            </Select.Option>
            <Select.Option value="advanced ">{t("advanced")}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={"categories"}
          label={t("chooseCategory")}
          rules={[{ required: false }]}
        >
          <Select
            mode="multiple"
            defaultValue={categories.map((category) => category.id)}
          >
            {availableCategories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={"thumbnailUrl"}
          label={t("courseThumbnail")}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Collapse.Panel>
    </Collapse>
  );
};

// const DropdownMenuItemContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 36px;

//   .left {
//     display: flex;
//     align-items: center;
//     svg {
//       margin-right: 8px;
//     }
//   }
//   .right {
//     display: flex;
//     align-items: center;
//   }

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondaryBg};
//   }
// `;

export default DropdownCourseInfo;
