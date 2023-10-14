import { Container } from "./styled";

const HomeNewsHeader = () => {
  return (
    <Container>
      <h1>Tin tức mới nhất</h1>
      <p>
        Việc học tập thường diễn ra trong lớp học nhưng không nhất thiết phải
        như vậy.
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          className="clip-path"
          d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"
        ></path>
      </svg>
    </Container>
  );
};

export default HomeNewsHeader;
