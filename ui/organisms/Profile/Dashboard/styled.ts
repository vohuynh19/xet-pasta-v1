import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;

  h3 {
    font-weight: 500;
    margin: 0;
    margin-bottom: 24px;
  }

  .statistic-item {
    &:first-child {
      margin-right: 24px;
    }

    &:last-child {
      margin-left: 24px;
    }
  }
`;

export const StatisticContainer = styled.div`
  display: flex;
`;

export const ProgressCourseContainer = styled.div``;
