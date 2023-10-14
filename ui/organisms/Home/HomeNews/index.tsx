import { HomeNewsItem, HomeNewsHeader } from "ui/molecules";

import { Container, HomeNewsContainer } from "./styled";

import { Col, Row } from "antd";

import { useRouter } from "next/router";
import { PAGE_ROUTES } from "@constants";
import { useLatestBlogQuery } from "hooks";

const maxItem = 3;

const HomeNews = () => {
  const { data } = useLatestBlogQuery();
  const router = useRouter();

  return (
    <Container>
      <HomeNewsHeader />

      <HomeNewsContainer>
        <Row gutter={[32, 32]}>
          {(data || []).slice(0, maxItem).map((news, index) => (
            <Col key={index} xs={24} md={8}>
              <HomeNewsItem
                date={news.updatedAt}
                title={news.title}
                url={`${PAGE_ROUTES.BLOG}/${news.id}`}
                onClick={() => router.push(`${PAGE_ROUTES.BLOG}/${news.id}`)}
              />
            </Col>
          ))}
        </Row>
      </HomeNewsContainer>
    </Container>
  );
};

export default HomeNews;
