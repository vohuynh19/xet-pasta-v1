import { PAGE_ROUTES } from "@constants";
import { Button } from "ui/atoms";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Container, LeftContent, RightContent } from "./styled";

const TopInstructorHeader = () => {
  const { t } = useTranslation("home");
  const router = useRouter();

  return (
    <Container>
      <LeftContent>
        <h1>{t("topInstructorTitle")}</h1>
        <p>{t("topInstructorDesc")}</p>
      </LeftContent>

      <RightContent>
        <Button
          type="primary"
          size="large"
          onClick={() => router.push(PAGE_ROUTES.INSTRUCTORS)}
        >
          {t("findInstructors")}
        </Button>
      </RightContent>
    </Container>
  );
};

export default TopInstructorHeader;
