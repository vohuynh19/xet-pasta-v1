import { Col, Empty, Pagination, PaginationProps, Row } from "antd";

import { CourseCard } from "ui/molecules";

import { BeatLoader } from "react-spinners";
import { theme } from "styles";

interface Props {
  pagination: PaginationProps;
  courses: SCourse[];
  total: number;
  isLoading: boolean;
}

const CourseSearch = (props: Props) => {
  return (
    <Row gutter={[32, 32]}>
      {(props.courses || []).map((course) => (
        <Col key={course._id} xs={24} sm={12} md={12} lg={8}>
          <CourseCard {...course} />
        </Col>
      ))}

      {props.isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 300,
          }}
        >
          <BeatLoader color={theme.colors.primary} />
        </div>
      )}

      {!props.isLoading && props.courses.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 300,
          }}
        >
          <Empty />
        </div>
      )}

      <Col span={24}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination {...props.pagination} total={props.total} />
        </div>
      </Col>
    </Row>
  );
};

export default CourseSearch;
