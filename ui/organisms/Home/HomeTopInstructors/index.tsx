import { Button, Col, Row } from "antd";

import { useInstructors } from "hooks";

import { SizeBox } from "ui/atoms";
import { InstructorCard, TopInstructorHeader } from "ui/molecules";

import { Container } from "./styled";
import { useMediaQuery } from "react-responsive";

const HomeTopInstructor = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  let maxInstructors;

  if (isMobile) {
    maxInstructors = 2; // Set the desired value for small screens
  } else if (isTablet) {
    maxInstructors = 4; // Set the desired value for medium screens
  } else {
    maxInstructors = 4; // Set the default value for larger screens
  }

  const { data } = useInstructors({
    offset: 0,
    limit: maxInstructors,
  });

  return (
    <Container data-aos="fade-up" data-aos-anchor-placement="top-bottom">
      <TopInstructorHeader />

      <SizeBox height={48} />

      <Row gutter={[16, 32]}>
        {(data?.data || []).slice(0, maxInstructors).map((user, index) => (
          <Col key={user.id} xs={24} sm={12} md={6} lg={6}>
            <InstructorCard
              {...user}
              cardProps={{
                "data-aos": "fade-right",
                "data-aos-easing": "ease-in-sine",
                "data-aos-duration": "300",
                "data-aos-delay": 300 * index,
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeTopInstructor;
