import ProfileMenuDescription from "./ProfileMenuDescription";
import ProfileMenuList from "./ProfileMenuList";
import { Container } from "./styled";

const ProfileMenu = () => {
  return (
    <Container>
      <ProfileMenuDescription />
      <ProfileMenuList />
    </Container>
  );
};

export default ProfileMenu;
export { ProfileMenuDescription, ProfileMenuList };
