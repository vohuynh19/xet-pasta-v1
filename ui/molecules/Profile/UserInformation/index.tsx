import { Typography } from "antd";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 40px;
  .item {
    display: flex;
    padding-top: 28px;

    .label {
      width: 200px;
    }
  }
`;

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="item">
      <Typography.Text type="secondary" className="label">
        {label}
      </Typography.Text>
      <Typography.Text className="value">{value}</Typography.Text>
    </div>
  );
};
const UserInformation = () => {
  return (
    <Container>
      <Item label={"Registration Date"} value="April 8, 2023 9:43 am" />
      <Item label={"First Name"} value="hiep" />
      <Item label={"Last Name"} value="hoang" />
      <Item label={"Username"} value="admin123" />
      <Item label={"Email"} value="sireal.webmail@gmail.com" />
      <Item label={"Phone Number"} value="April 8, 2023 9:43 am" />
      <Item label={"Skill/Occupation"} value="April 8, 2023 9:43 am" />
      <Item label={"Biography"} value="April 8, 2023 9:43 am" />
    </Container>
  );
};
export default UserInformation;
