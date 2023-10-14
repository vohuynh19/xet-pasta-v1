import { PropsWithChildren } from "react";
import { BannerContainer } from "./styled";
import { BannerTextBox } from "ui/molecules";

type Props = PropsWithChildren<{
  title: string;
  content: string;
}>;

const BannerLayout = ({ children, title, content }: Props) => {
  return (
    <BannerContainer>
      <BannerTextBox title={title} content={content} />
      {children}
    </BannerContainer>
  );
};

export default BannerLayout;
