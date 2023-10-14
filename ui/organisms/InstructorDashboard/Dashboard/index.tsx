import { Typography } from "antd";
import styled from "styled-components";
import { StatisticItem } from "ui/molecules";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import PersonIcon from "@mui/icons-material/Person";

const Container = styled.div`
  padding: 24px;
  h3 {
    margin: 0;
    font-weight: 500;
    margin-bottom: 24px;
  }
`;

const StatisticContainer = styled.div`
  display: flex;

  .statistic-item {
    &:first-child {
      margin-right: 24px;
    }

    &:last-child {
      margin-left: 24px;
    }
  }
`;

const InstructorDashboard = () => {
  return (
    <Container>
      <Typography.Title level={3}>Số liệu phân tích</Typography.Title>
      <StatisticContainer>
        <StatisticItem
          icon={<VisibilityIcon />}
          name="Total views"
          value={1002}
        />
        <StatisticItem
          icon={<ShutterSpeedIcon />}
          name="Total watching time"
          value={12}
        />
        <StatisticItem icon={<PersonIcon />} name="Total students" value={1} />
      </StatisticContainer>
    </Container>
  );
};

export default InstructorDashboard;
