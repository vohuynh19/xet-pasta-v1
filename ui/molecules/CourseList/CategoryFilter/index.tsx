import { Form, Select } from "antd";
import { useTranslation } from "next-i18next";
import { useCourseCategory } from "hooks";

const CategoryFilter = () => {
  const { t } = useTranslation("common");
  const { data } = useCourseCategory();

  return (
    <Form.Item name="category" label={t("category")}>
      <Select size="large" placeholder={t("categoryPlaceholder")}>
        {(data?.data || []).map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CategoryFilter;
