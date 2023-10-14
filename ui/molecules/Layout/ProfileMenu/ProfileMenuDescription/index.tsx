import { PAGE_ROUTES } from "@constants";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography, notification } from "antd";
import { useMyProfile } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "ui/atoms";

const Container = styled.div`
  background: ${({ theme }) => theme.colors.purpleGradientBg};
  height: 360px;
  width: 240px;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 776px) {
    width: 100%;
    border-radius: 16px;
    margin-bottom: 24px;
  }
`;

const ProfileMenuDescription = () => {
  const { t } = useTranslation("sentence");
  const router = useRouter();
  const { data: profile } = useMyProfile();

  return (
    <Container>
      <Typography.Title className="text-contrast" level={2}>
        {t("createNewCourse")}
      </Typography.Title>
      <Typography.Paragraph className="text-contrast">
        {t("getStartedWithTopics")}
      </Typography.Paragraph>
      <Button
        style={{
          borderRadius: "50%",
          height: 40,
          width: 40,
          justifyContent: "center",
        }}
        icon={<ArrowForwardIosIcon />}
        onClick={() => {
          if (profile?.role === "USER") {
            notification.warning({
              message: "You must become an instructor to create a course",
              btn: (
                <Link href={PAGE_ROUTES.PROFILE.MY_PROFILE}>
                  {t("becomeInstructor")}
                </Link>
              ),
            });
          } else {
            router.push(PAGE_ROUTES.INSTRUCTOR_DASHBOARD.COURSES);
          }
        }}
      />
    </Container>
  );
};

export default ProfileMenuDescription;
