import { Card } from "antd";
import styled from "styled-components";

const ShadowCard = styled(Card)`
  && {
    transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  }
`;

export default ShadowCard;
