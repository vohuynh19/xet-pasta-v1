import { IMAGES_URL } from "@constants";
import styled from "styled-components";
import { container, flexCenter } from "styles";

export const Container = styled.section`
  ${container}
  ${flexCenter}
  height: 500px;
  background: ${`url(${IMAGES_URL.HOME_COVER}) no-repeat center / cover,
    linear-gradient(180deg, white 0%, #E9F1F8 50%, white 100%)`};
  background-position: top center;

  @media (max-width: 1024px) {
    height: 400px;
  }
`;
