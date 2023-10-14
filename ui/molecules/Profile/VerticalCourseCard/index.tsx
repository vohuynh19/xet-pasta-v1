import { Progress, Rate, Typography } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 300px;
    height: 100%;
    object-fit: cover;
  }

  .content {
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      margin: 16px 0;
    }

    width: 100%;
  }
`;

const VerticalCourseCard = () => {
  return (
    <Container>
      <img
        alt="course"
        src="	https://vicodemy.com/wp-content/uploads/2023/03/Huong-dan-lam-game.png"
      />

      <div className="content">
        <Rate value={5} disabled />

        <Typography.Title>Unity Beginer</Typography.Title>

        <Typography.Paragraph>Description</Typography.Paragraph>

        {/* <Typography.Paragraph>
          <Typography.Text type="secondary">Completed lessons:</Typography.Text>

          <Typography.Text type="secondary">10 of 100 lessons</Typography.Text>
        </Typography.Paragraph>

        <Progress percent={10} /> */}
      </div>
    </Container>
  );
};

export default VerticalCourseCard;
