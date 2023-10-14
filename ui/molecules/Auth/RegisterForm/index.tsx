import { Form, Input } from "antd";
import { Container } from "./styled";

const { Item } = Form;

const RegisterForm = () => {
  return (
    <Container>
      <Form layout="vertical">
        <Item name={"fullName"} label={"Full Name"}>
          <Input size="large" />
        </Item>
        <Item name={"email"} label={"Email"}>
          <Input size="large" />
        </Item>
        <Item name={"password"} label={"Password"}>
          <Input size="large" />
        </Item>
      </Form>
    </Container>
  );
};

export default RegisterForm;
