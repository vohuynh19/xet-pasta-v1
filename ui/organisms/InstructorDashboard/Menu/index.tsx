import { useMemo } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { PAGE_ROUTES } from "@constants";

import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

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
        t("dashboard"),
        PAGE_ROUTES.INSTRUCTOR_DASHBOARD.DASHBOARD,
        <DashboardIcon />
      ),
      getItem(
        t("lessons"),
        PAGE_ROUTES.INSTRUCTOR_DASHBOARD.LESSONS,
        <OndemandVideoIcon />
      ),
      getItem(
        t("courses"),
        PAGE_ROUTES.INSTRUCTOR_DASHBOARD.COURSES,
        <VideoLibraryIcon />
      ),
    ],
    [t]
  );

  const onClick: MenuProps["onClick"] = (e) => router.push(e.key);

  return (
    <Container>
      <Menu
        defaultSelectedKeys={[router.route]}
        selectedKeys={[router.route]}
        mode="inline"
        items={items}
        onClick={onClick}
      />
    </Container>
  );
};

export default MenuSiderList;
