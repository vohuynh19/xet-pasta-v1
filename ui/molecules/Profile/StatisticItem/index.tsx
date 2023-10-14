import { Typography } from "antd";
import styled from "styled-components";
import { flexCenter } from "styles";

type StatisticItemProps = {
  value: number;
  name: string;
  icon: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 12px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 32px;
  }

  .statistic-icon {
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.lightPrimaryBg};
    ${flexCenter}
    width: 64px;
    height: 64px;
    border-radius: 32px;
  }

  .statistic-value {
    font-weight: 700;
    font-size: 32px;
    margin: 16px 0 12px 0;
  }
`;

const StatisticItem = (props: StatisticItemProps) => {
  return (
    <Container className="statistic-item">
      <div className="statistic-icon">{props.icon}</div>

      <div className="statistic-value">{props.value}</div>

      <Typography.Text className="statistic-name">{props.name}</Typography.Text>
    </Container>
  );
};

export default StatisticItem;
