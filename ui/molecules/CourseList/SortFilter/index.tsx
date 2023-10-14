import { Form, Select } from "antd";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { SORT_OPTION } from "ui/organisms/CourseList/types";

type Props = {
  showLabel?: boolean;
};

const SortFilter = ({ showLabel = true }: Props) => {
  const { t } = useTranslation("common");

  const sortList = useMemo(
    () => [
      {
        label: t("newest"),
        value: SORT_OPTION.NEWEST,
      },
      {
        label: t("highestRate"),
        value: SORT_OPTION.HIGHEST_RATE,
      },
    ],
    [t]
  );

  return (
    <Form.Item name="sort" label={showLabel ? t("sort") : ""}>
      <Select
        size="large"
        placeholder={t("sortPlaceholder")}
        defaultValue={sortList[0].value}
        style={{ minWidth: 220 }}
      >
        {sortList.map((sort) => (
          <Select.Option key={sort.value} value={sort.value}>
            {sort.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SortFilter;
