import styled from "styled-components";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

const Container = styled.div`
  min-height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 120px;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 32px;
    font-weight: 500;
    margin-top: 16px;
  }
`;

const ComingSoon = () => {
  return (
    <Container>
      <IntegrationInstructionsIcon />
      <p>We are developing feature</p>
    </Container>
  );
};

export default ComingSoon;
