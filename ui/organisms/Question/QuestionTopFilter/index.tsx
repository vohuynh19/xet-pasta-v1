import { Col, Row } from "antd";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import FilterListIcon from "@mui/icons-material/FilterList";

import { CourseListSortFilter as SortFilter } from "ui/molecules";
import { Button, SizeBox } from "ui/atoms";

import useAppStore from "stores/useAppStore";

const QuestionTopFilter = () => {
  const { t } = useTranslation("common");
  const { toggleFilterNav } = useAppStore((state) => ({
    toggleFilterNav: state.toggleFilterNav,
  }));

  return (
    <Fragment>
      <Row>
        <Col lg={0}>
          <Button
            onClick={toggleFilterNav}
            size="large"
            icon={<FilterListIcon style={{ marginRight: 8 }} />}
            style={{ marginRight: 16 }}
          >
            {t("filter")}
          </Button>
        </Col>

        <Col span={0} xs={0} lg={6}>
          <SortFilter showLabel={false} />
        </Col>
      </Row>

      <SizeBox height={8} />
    </Fragment>
  );
};

export default QuestionTopFilter;
