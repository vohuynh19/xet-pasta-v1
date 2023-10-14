import { Input, Typography } from "antd";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { CloseOutlined } from "@mui/icons-material";

import {
  CourseListCategoryFilter as CategoryFilter,
  CourseListPriceFilter as PriceFilter,
  CourseListSortFilter as SortFilter,
} from "ui/molecules";
import { Button } from "ui/atoms";
import { FlexSpaceBetween } from "styles";
import useAppStore from "stores/useAppStore";

const Container = styled.div`
  padding: 0px 24px;

  h3 {
    margin: 0;
  }

  .ant-input-search {
    margin-bottom: 24px;
  }

  .ant-form-item-label {
    font-weight: 500;
  }
`;

type Props = {
  onResetForm: () => void;
};

const QuestionSiderFilter = ({ onResetForm }: Props) => {
  const { t } = useTranslation("common");
  const { closeSider } = useAppStore((state) => ({
    closeSider: state.toggleFilterNav,
  }));

  return (
    <Container>
      <FlexSpaceBetween style={{ margin: "24px 0" }}>
        <Typography.Title level={3}>{t("filter")}</Typography.Title>

        <Button type="text" icon={<CloseOutlined />} onClick={closeSider} />
      </FlexSpaceBetween>

      <Input.Search size="large" placeholder={t("search") || ""} />

      <SortFilter />

      <CategoryFilter />

      <PriceFilter />

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

export default QuestionSiderFilter;
