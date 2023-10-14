import { Col, Row } from "antd";
import { TFunction, useTranslation } from "next-i18next";
import Link from "next/link";
import styled from "styled-components";

type MenuItem = {
  label: string;
  url?: string;
  children?: MenuItem[];
};

type GetMenuType = (t: TFunction) => MenuItem[];
const menuItems: GetMenuType = (t) => [
  {
    label: t("quickLinks"),
    children: [
      {
        label: t("aboutUs"),
        url: "/about-us",
      },
      {
        label: t("blog"),
        url: "/blog",
      },
      {
        label: t("contact"),
        url: "/contact",
      },
    ],
  },
  {
    label: t("resources"),
    children: [
      {
        label: t("courses"),
        url: "/course-list",
      },
      {
        label: t("instructors"),
        url: "/instructors",
      },
    ],
  },
  {
    label: t("support"),
    children: [
      {
        label: t("community"),
        url: "/community",
      },
      {
        label: t("privacyPolicy"),
        url: "/privacy-policy",
      },
      {
        label: t("termsAndConditions"),
        url: "/terms-and-conditions",
      },
    ],
  },
];

const Container = styled(Row)`
  color: ${({ theme }) => theme.colors.contrastText};
  h2 {
    font-size: 20px;
    margin-bottom: 32px;
  }

  p {
    font-size: 16px;
    margin: 24px 0;
  }
`;

const FooterMenu = () => {
  const { t } = useTranslation("common");

  return (
    <Container>
      {menuItems(t).map((item) => {
        return (
          <Col key={item.label} xs={24} md={24 / menuItems(t).length}>
            <>
              <h2>{item.label}</h2>
              {item.children?.map((child) => (
                <p key={child.url}>
                  <Link href={child.url || ""}>{child.label}</Link>
                </p>
              ))}
            </>
          </Col>
        );
      })}
    </Container>
  );
};

export default FooterMenu;
