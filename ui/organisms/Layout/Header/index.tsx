import { Col, Row, Popover } from "antd";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppStore } from "stores";
import { IMAGES_URL, API_HOST, PAGE_ROUTES } from "@constants";
import { useMyProfile } from "hooks";
import { API_ENDPONTS } from "src/infra/https";

import { Button, Drawer, SizeBox } from "ui/atoms";
import { HeaderMenu, ProfileMenu, UserHeaderProfile } from "ui/molecules";

import { HeaderRightContainer, MenuContainer, Container } from "./styled";

const Header = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { data } = useMyProfile();
  const drawerRef = useRef<{ toggle: () => void }>(null);

  const { toggleNav } = useAppStore((state) => ({
    toggleNav: state.toggleNav,
  }));

  return (
    <>
      <Container>
        <Row align="middle">
          <Col xs={12} md={6} lg={3}>
            <Link href={PAGE_ROUTES.HOME} style={{ width: 75, height: 75 }}>
              <div style={{ width: 75, height: 75 }}>
                <Image
                  alt="logo"
                  src={IMAGES_URL.LOGO}
                  width={75}
                  height={75}
                  priority
                />
              </div>
            </Link>
          </Col>

          <Col xs={0} md={12} lg={14}>
            <HeaderMenu />
          </Col>

          <Col xs={0} md={6} lg={7}>
            <HeaderRightContainer>
              {/* <Button type="text" icon={<TranslateIcon />} />

              <SizeBox width={16} />

              <Cart cartItemNumber={0} />

              <SizeBox width={16} /> */}

              {data ? (
                <Popover content={<ProfileMenu />} placement="bottomRight">
                  <div>
                    <UserHeaderProfile />
                  </div>
                </Popover>
              ) : (
                <Link
                  href={`${API_HOST}${API_ENDPONTS.auth.LOGIN(
                    window.location.href
                  )}`}
                >
                  <Button type="primary" size="large">
                    {t("signIn")}
                  </Button>
                </Link>
              )}
            </HeaderRightContainer>
          </Col>

          <Col xs={12} md={0} lg={0}>
            <HeaderRightContainer>
              <div
                onClick={() => {
                  drawerRef.current?.toggle();
                }}
              >
                <UserHeaderProfile />
              </div>
              <SizeBox width={16} />

              <MenuContainer onClick={toggleNav}>
                <MenuIcon fontSize="large" />
              </MenuContainer>
            </HeaderRightContainer>
          </Col>
        </Row>
      </Container>

      <Drawer title="Profile" placement={"right"} ref={drawerRef}>
        <ProfileMenu />
      </Drawer>
    </>
  );
};

export default Header;
