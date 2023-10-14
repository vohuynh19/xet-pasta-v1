import styled from "styled-components";
import { getScaledText } from "styles";

export const Container = styled.section`
  margin: 80px 0;
  background-color: #f7f9fa;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 1000px) {
    flex-direction: column;
  }

  .ant-form-item-label label {
    ${getScaledText(16)}
    font-weight: 500;
  }
`;

export const SummaryContainer = styled.section`
  padding: 16px;
  max-width: 576px;
  width: 100%;
`;
