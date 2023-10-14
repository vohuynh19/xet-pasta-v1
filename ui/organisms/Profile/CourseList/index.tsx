import { Col, Empty, Row } from "antd";
import { CourseCard } from "ui/molecules";
import { useCourses } from "hooks";

import { Container } from "./styled";

const ProfileCourseList = () => {
  const { data } = useCourses({
    offset: 0,
    limit: 100,
  });

  return (
    <Container>
      <Row gutter={[32, 32]}>
        {(data?.data || []).length > 0 ? (
          (data?.data || []).map((course) => (
            <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
              <CourseCard {...course} />
            </Col>
          ))
        ) : (
          <div
            style={{
              width: "100%",
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProfileCourseList;
