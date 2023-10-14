import { NextPage } from "next";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

import { flexCenter, theme } from "styles";
import Head from "next/head";
import { Typography } from "antd";
import { PAGE_ROUTES } from "@constants";

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  height: 100%;
  padding: 64px 0;
`;

const CourseList: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page not found - Vicodemy</title>
      </Head>
      <Container>
        <NewReleasesIcon
          style={{
            fontSize: 240,
            color: theme.colors.primary,
            marginBottom: 24,
          }}
        />

        <Typography.Title level={3}>404 - Page Not Found</Typography.Title>

        <Typography.Link href={PAGE_ROUTES.HOME}>
          Go back to home
        </Typography.Link>
      </Container>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default CourseList;
