import { PAGE_ROUTES } from "@constants";
import { Card, Popover, Row, Tag, Typography } from "antd";
import { useRouter } from "next/router";
import { Button, SizeBox } from "ui/atoms";
import { useTranslation } from "react-i18next";

import { StyledCard } from "./styled";
import {
  AccessTimeFilled,
  ArrowCircleRightOutlined,
  Star,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { theme } from "styles";
import CourseCardPopover from "../CourseCardPopover";
import { useState, useEffect, useRef } from "react";

const CourseCard = (props: SCourse & { cardProps?: any }) => {
  const router = useRouter();

  const { t } = useTranslation("common");
  const imgRef = useRef<HTMLImageElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [imgHeight, setImgHeight] = useState(144);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      const img = imgRef.current;
      if (img) {
        const width = img.offsetWidth;
        setImgHeight((width * 9) / 16); // Calculate the height based on the width and the 16:9 ratio
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const content = <CourseCardPopover course={props} />;

  const CourseCardInner = () => {
    return (
      <Card
        {...props.cardProps}
        hoverable
        cover={
          <img
            onClick={() => router.push(PAGE_ROUTES.COURSE_DETAIL(props._id))}
            ref={imgRef}
            alt="cover"
            src={props.thumnail}
            style={{
              height: `${imgHeight}px`,
              width: "100%",
              objectFit: "cover",
            }}
          />
        }
      >
        <Card.Meta
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {props.categoryInfo?.[0]?.name && (
                  <Tag color="geekblue">{props.categoryInfo?.[0]?.name}</Tag>
                )}
              </div>

              <Typography.Title level={3}>${props.price}</Typography.Title>
            </div>
          }
          description={
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                <AccessTimeFilled
                  style={{ fontSize: 20, color: theme.colors.primary }}
                />
                <SizeBox width={4} />
                <Typography.Text style={{ fontSize: 12, lineHeight: "12px" }}>
                  {props.totalDuration / 60} {t("hours")}
                </Typography.Text>

                <SizeBox width={8} />

                <PersonIcon
                  style={{ fontSize: 20, color: theme.colors.primary }}
                />
                <SizeBox width={4} />
                <Typography.Text style={{ fontSize: 12, lineHeight: "12px" }}>
                  {props.numberEnrolled} {t("students")}
                </Typography.Text>

                <SizeBox width={8} />

                <Star style={{ fontSize: 20, color: theme.colors.primary }} />
                <SizeBox width={4} />
                <Typography.Text style={{ fontSize: 12, lineHeight: "12px" }}>
                  {props.rating || 2.7} {t("star")}
                </Typography.Text>
              </div>

              <Typography.Title
                level={4}
                ellipsis={{
                  rows: 2,
                }}
              >
                {props.name}
              </Typography.Title>

              <Button
                type="text"
                style={{ padding: 0, fontWeight: 700 }}
                color={theme.colors.primary}
              >
                {t("viewCourse")}
                <SizeBox width={4} />
                <ArrowCircleRightOutlined />
              </Button>
            </div>
          }
        />
      </Card>
    );
  };

  if (isMobile) {
    return <CourseCardInner />;
  }

  return (
    <Popover content={content} trigger="hover" placement="right">
      <div>
        <CourseCardInner />
      </div>
    </Popover>
  );
};

export default CourseCard;
