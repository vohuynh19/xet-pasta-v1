import { Typography } from "antd";
import { Container } from "./styled";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "ui/atoms";

const Setting = () => {
  return (
    <Container>
      <Typography.Title level={3}>Settings</Typography.Title>

      <div className="cover">
        <div className="avatar">
          <img
            src={
              "https://vicodemy.com/wp-content/plugins/tutor/assets/images/profile-photo.png"
            }
            alt="avatar"
          />

          <div className="abs-icon">
            <AddAPhotoIcon />
          </div>
        </div>

        <Button className="abs-btn" type="primary" icon={<AddAPhotoIcon />}>
          Upload cover photo
        </Button>
      </div>
    </Container>
  );
};

export default Setting;
