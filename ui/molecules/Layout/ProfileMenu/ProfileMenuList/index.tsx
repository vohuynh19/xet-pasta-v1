import { PAGE_ROUTES } from "@constants";
import { TFunction } from "next-i18next";
import { useTranslation } from "next-i18next";
import ProfileMenuItem from "./ProfileMenuItem";
import styled from "styled-components";
import { Col, Row, message } from "antd";
import Link from "next/link";
import { useLogout } from "hooks";
import { useRouter } from "next/router";
import { queryClientInstance, userQueryKeys } from "src/infra/https";

const menuList1 = (t: TFunction) => [
  {
    key: t("profile"),
    name: t("profile"),
    url: PAGE_ROUTES.PROFILE.MY_PROFILE,
  },
  {
    key: t("dashboard"),
    name: t("dashboard"),
    url: PAGE_ROUTES.PROFILE.DASHBOARD,
  },
  {
    key: t("orderHistory"),
    name: t("orderHistory"),
    url: PAGE_ROUTES.PROFILE.ORDER_HISTORY,
  },
];

const menuList2 = (t: TFunction) => [
  // {
  //   key: t("settings"),
  //   name: t("settings"),
  //   url: PAGE_ROUTES.PROFILE.SETTING,
  // },
  {
    key: t("questionAndAnswer"),
    name: t("questionAndAnswer"),
    url: PAGE_ROUTES.PROFILE.QNA,
  },
];

const Container = styled.div`
  a {
    color: ${({ theme }) => theme.colors.textPrimarySecondary};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: 776px) {
    width: 100%;
  }

  .item {
    height: 40px;
    padding-left: 32px;
    width: 200px;

    @media (max-width: 776px) {
      padding-left: 8px;
      width: 100%;
    }
  }
`;

const ProfileMenuList = () => {
  const { t } = useTranslation("common");
  const { mutate } = useLogout();
  const router = useRouter();

  return (
    <Container>
      <Row>
        <Col xs={24} sm={12} span={12}>
          {menuList1(t).map((menu) => (
            <div className="item" key={menu.key}>
              <ProfileMenuItem {...menu} />
            </div>
          ))}
        </Col>

        <Col xs={24} sm={12} span={12}>
          {menuList2(t).map((menu) => (
            <div className="item" key={menu.key}>
              <ProfileMenuItem {...menu} key={menu.key} />
            </div>
          ))}

          <div className="item">
            <Link
              href={"#"}
              onClick={(e) => {
                e.preventDefault();
                mutate(undefined, {
                  onSuccess: () => {
                    message.success("Log out success");
                    router.push(PAGE_ROUTES.HOME);
                    queryClientInstance.resetQueries(userQueryKeys.getSelf());
                  },
                });
              }}
            >
              {t("logout")}
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileMenuList;
