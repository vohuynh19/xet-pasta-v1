import { Card, CardProps } from "antd";
import styled from "styled-components";
import { flexCenter } from "styles";

type Props = {
  backgroundLink: string;
} & CardProps;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0 0 0 / 50%);
  border-radius: 16px;
  z-index: 1;
`;
const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${flexCenter}
  z-index: 2;
`;

const StyledCard = styled(Card).withConfig({
  shouldForwardProp: (prop) => !["backgroundLink"].includes(prop),
})<Props>`
  && {
    background-image: ${({ backgroundLink }) => `url(${backgroundLink})`};
    background-size: cover;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    color: ${({ theme }) => theme.colors.white};
    z-index: 1;
    cursor: pointer;
  }

  .antd-card-body {
    border-radius: 16px;
    position: relative !important;
  }

  ${Content}:hover + ${Overlay} {
    background: rgba(0 0 0 / 80%);
  }
`;

const BackgroundCard = (props: Props) => {
  return (
    <StyledCard {...props}>
      <Content>{props.children}</Content>
      <Overlay />
    </StyledCard>
  );
};

export default BackgroundCard;
