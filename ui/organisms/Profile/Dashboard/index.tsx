import { Typography } from "antd";
import { useTranslation } from "next-i18next";

import {
  Container,
  ProgressCourseContainer,
  StatisticContainer,
} from "./styled";
import { StatisticItem, VerticalCourseCard } from "ui/molecules";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import { SizeBox } from "ui/atoms";

const ProfileDashboard = () => {
  const { t } = useTranslation("common");

  return (
    <Container>
      <Typography.Title level={3}>{t("dashboard")}</Typography.Title>

      <StatisticContainer>
        <StatisticItem
          icon={<LocalLibraryIcon />}
          name="Enrolled Courses"
          value={1}
        />
        <StatisticItem icon={<SchoolIcon />} name="Active Courses" value={2} />

        <StatisticItem
          icon={<VerifiedIcon />}
          name="Completed Courses"
          value={3}
        />
      </StatisticContainer>

      <SizeBox height={32} />

      <Typography.Title level={3}>Enrolled Courses</Typography.Title>

      <ProgressCourseContainer>
        <VerticalCourseCard />
        <SizeBox height={32} />
        <VerticalCourseCard />
      </ProgressCourseContainer>
    </Container>
  );
};

export default ProfileDashboard;
