import { Card, Popover, Space, Typography } from "antd";
import { PAGE_ROUTES } from "@constants";
import router from "next/router";
import { useTranslation } from "react-i18next";
import { StyledCard } from "./styled";
import { Star, YouTube } from "@mui/icons-material";
import { UserInstroductionPopover } from "ui";
import { red } from "@mui/material/colors";

const defaultAvatar =
  "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";

const { Text } = Typography;
const InstructorCard = (props: User & { cardProps?: any }) => {
  const { t: t } = useTranslation("common");

  const content = <UserInstroductionPopover myProfile={props} />;

  const InstructorCardInner = () => {
    return (
      <StyledCard
        {...props?.cardProps}
        hoverable
        cover={
          <img
            alt="instructor"
            src={props.avatar || defaultAvatar}
            onClick={() => router.push(PAGE_ROUTES.USER_PROFILE(props.id))}
          />
        }
      >
        <Card.Meta
          title={props.displayName ? props.displayName : props.name}
          description={
            <Space direction="vertical">
              <Text>
                {props.profileTitles ? props.profileTitles : t("instructor")}
              </Text>

              <div className="more-info">
                <YouTube sx={{ color: red[500] }} />
                <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  {props?.profileYoutubeCount
                    ? `${props?.profileYoutubeCount}K`
                    : `0K`}
                </span>
              </div>
            </Space>
          }
        />
      </StyledCard>
    );
  };

  return (
    <Popover content={content} trigger="hover" placement="right">
      <div>
        <InstructorCardInner />
      </div>
    </Popover>
  );
};

export default InstructorCard;
