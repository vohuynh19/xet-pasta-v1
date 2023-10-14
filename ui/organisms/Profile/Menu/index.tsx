import { useMemo } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { PAGE_ROUTES } from "@constants";

import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReviewsIcon from "@mui/icons-material/Reviews";
import HistoryIcon from "@mui/icons-material/History";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LinkIcon from "@mui/icons-material/Link";

import { Container } from "./styled";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MenuSiderList = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const items: MenuItem[] = useMemo(
    () => [
      getItem(
        t("profile"),
        PAGE_ROUTES.PROFILE.MY_PROFILE,
        <AccountCircleIcon />
      ),
      getItem(t("dashboard"), PAGE_ROUTES.PROFILE.DASHBOARD, <DashboardIcon />),
      getItem(
        t("orderHistory"),
        PAGE_ROUTES.PROFILE.ORDER_HISTORY,
        <HistoryIcon />
      ),
      getItem(
        t("questionAndAnswer"),
        PAGE_ROUTES.PROFILE.QNA,
        <QuestionAnswerIcon />
      ),
      // getItem(
      //   t("connectDiscord"),
      //   PAGE_ROUTES.PROFILE.CONNECT_DISCORD,
      //   <LinkIcon />
      // ),
    ],
    [t]
  );

  const onClick: MenuProps["onClick"] = (e) => router.push(e.key);

  return (
    <Container>
      <Menu
        defaultSelectedKeys={[router.route]}
        mode="inline"
        items={items}
        onClick={onClick}
      />
    </Container>
  );
};

export default MenuSiderList;
