import { useRouter } from "next/router";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

import { IMAGES_URL, PAGE_ROUTES } from "@constants";
import { CourseCategoryItem } from "ui/molecules";
import { Container } from "./styled";
import { Col, Row } from "antd";

type TCategory = {
  label: string;
  image: string;
  destination: string;
};

const HomeCategories = () => {
  const { t } = useTranslation("home");
  const router = useRouter();

  const categories = useMemo<TCategory[]>(
    () => [
      {
        label: t("programming"),
        image: IMAGES_URL.CATEGORY_5,
        destination: PAGE_ROUTES.COURSE_LIST,
      },
      {
        label: t("design"),
        image: IMAGES_URL.CATEGORY_1,
        destination: PAGE_ROUTES.COURSE_LIST,
      },
      {
        label: t("game"),
        image: IMAGES_URL.CATEGORY_2,
        destination: PAGE_ROUTES.COURSE_LIST,
      },
      {
        label: t("javascript"),
        image: IMAGES_URL.CATEGORY_3,
        destination: PAGE_ROUTES.COURSE_LIST,
      },
      {
        label: t("uxui"),
        image: IMAGES_URL.CATEGORY_4,
        destination: PAGE_ROUTES.COURSE_LIST,
      },
      {
        label: t("ai"),
        image: IMAGES_URL.CATEGORY_1,
        destination: PAGE_ROUTES.COURSE_LIST,
      },
    ],
    [t]
  );

  return (
    <Container data-aos="fade-up" data-aos-easing="ease-in-sine">
      <Row gutter={[16, 24]}>
        {categories.map((category) => (
          <Col key={category.label} xs={12} sm={8} xl={24 / categories.length}>
            <CourseCategoryItem
              title={category.label}
              backgroundLink={category.image}
              onClick={() => router.push(category.destination)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeCategories;
