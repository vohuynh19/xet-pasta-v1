import { Avatar, Typography } from "antd";
import styled from "styled-components";

import { useMyProfile } from "hooks";
import { flexVerticalCenter } from "styles";

const Container = styled.div`
  ${flexVerticalCenter}
  cursor: pointer;
`;
const UserHeaderProfile = () => {
  const { data } = useMyProfile();

  return (
    <Container>
      <Avatar size={"large"}>{data?.name?.[0] || ""}</Avatar>

      <Typography.Text style={{ maxWidth: 120, marginLeft: 8 }} ellipsis={true}>
        {data?.name}
      </Typography.Text>
    </Container>
  );
};

export default UserHeaderProfile;
