import { CloseOutlined } from "@mui/icons-material";
import { Form, Input } from "antd";
import { useTranslation } from "next-i18next";

import { Button } from "ui/atoms";
import {
  CourseListCategoryFilter as CategoryFilter,
  CourseListPriceFilter as PriceFilter,
  ResolveFilter,
} from "ui/molecules";

import { Container } from "./styled";

type Props = {
  onResetForm: () => void;
};

const QuestionRightFilter = ({ onResetForm }: Props) => {
  const { t } = useTranslation("common");

  return (
    <Container direction="vertical" size="large">
      <Form.Item name="search">
        <Input.Search size="large" placeholder={t("search") || ""} />
      </Form.Item>

      <ResolveFilter />

      <CategoryFilter />

      <Button
        type="primary"
        size="large"
        icon={<CloseOutlined />}
        onClick={onResetForm}
      >
        {t("clearFilter")}
      </Button>
    </Container>
  );
};

export default QuestionRightFilter;
