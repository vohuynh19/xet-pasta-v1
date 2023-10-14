import { CloseOutlined } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { useMyProfile } from "hooks";
import { API_HOST } from "@constants";
import { API_ENDPONTS } from "src/infra/https";

import { Button, SizeBox } from "ui/atoms";
import { HeaderMenu, UserHeaderProfile } from "ui/molecules";
import { SiderProfileContainer, StyledSider } from "./styled";

type Props = {
  collapsed: boolean;
  closeHandler: () => void;
};

const NavigationSider = ({ collapsed, closeHandler }: Props) => {
  const { t } = useTranslation("common");
  const { data } = useMyProfile();

  return (
    <StyledSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      width="330px"
    >
      <SiderProfileContainer>
        <Button
          style={{ float: "right", marginBottom: 16 }}
          type="text"
          icon={<CloseOutlined />}
          onClick={closeHandler}
        />

        {data ? (
          <>
            <SizeBox height={24} />
            <UserHeaderProfile />
            <Button isFullWidth size="large">
              {t("logout")}
            </Button>
          </>
        ) : (
          <Link
            href={`${API_HOST}${API_ENDPONTS.auth.LOGIN(window.location.href)}`}
          >
            <Button isFullWidth size="large" type="primary">
              {t("signIn")}
            </Button>
          </Link>
        )}
      </SiderProfileContainer>

      <HeaderMenu mode="vertical" onMenuPress={closeHandler} />
    </StyledSider>
  );
};

export default NavigationSider;
