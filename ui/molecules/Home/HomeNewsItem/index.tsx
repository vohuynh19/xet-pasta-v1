import Link from "next/link";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Spacer } from "styles";
import { StyledCard } from "./styled";

type Props = {
  date: string;
  title: string;
  url: string;
  onClick: () => void;
};
const HomeNewsItem = ({ date, title, url, onClick }: Props) => {
  return (
    <StyledCard onClick={onClick}>
      <p>{moment(date).format("MMM DD, yyyy")}</p>

      <h1>{title}</h1>

      <Spacer />

      <Link href={url}>
        Continue Reading <ArrowForwardIcon />
      </Link>
    </StyledCard>
  );
};

export default HomeNewsItem;
