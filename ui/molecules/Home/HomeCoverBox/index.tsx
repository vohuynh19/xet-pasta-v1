import { PAGE_ROUTES } from "@constants";
import { Button } from "ui/atoms";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Container } from "./styled";
import Link from "next/link";

const HomeCoverBox = () => {
  const { t } = useTranslation("home");
  const router = useRouter();

  return (
    <Container data-aos="flip-left">
      <h2>
        Viet Code <b>Academy</b>
      </h2>
      <p>{t("desc1")}</p>
      <br />

      <div className="btn-group">
        <Link
          className="community"
          href="https://discord.com/channels/1073065344064819280/1110497103744073789"
          target="#blank"
        >
          <Button size="large" type="primary">
            {t("joinVicodemyDiscordCommunity")}
          </Button>
        </Link>

        <Button
          size="large"
          type="primary"
          onClick={() => router.push(PAGE_ROUTES.COURSE_LIST)}
          ghost
        >
          {t("moreCourses")}
        </Button>
      </div>
    </Container>
  );
};

export default HomeCoverBox;
