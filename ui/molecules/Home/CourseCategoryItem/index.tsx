import { BackgroundCard } from "ui/atoms";

type Props = {
  onClick: () => void;
  title: string;
  backgroundLink: string;
};

const CourseCategoryItem = ({ onClick, title, backgroundLink }: Props) => {
  return (
    <BackgroundCard backgroundLink={backgroundLink} onClick={onClick}>
      {title}
    </BackgroundCard>
  );
};

export default CourseCategoryItem;
