import { PAGE_ROUTES } from "@constants";
import { Button } from "ui/atoms";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Container, LeftContent, RightContent } from "./styled";

const HottestCourseHeader = () => {
  const { t } = useTranslation("home");
  const router = useRouter();

  return (
    <Container>
      <LeftContent>
        <h1>{t("topCoursesTitle")}</h1>
        <p>{t("topCoursesDesc")}</p>
      </LeftContent>

      <RightContent>
        <Button
          type="primary"
          size="large"
          onClick={() => router.push(PAGE_ROUTES.COURSE_LIST)}
        >
          {t("findCourses")}
        </Button>
      </RightContent>
    </Container>
  );
};

export default HottestCourseHeader;
