import Link from "next/link";

type Props = {
  name: string;
  url: string;
};

const ProfileMenuItem = (props: Props) => {
  return <Link href={props.url}>{props.name}</Link>;
};

export default ProfileMenuItem;
