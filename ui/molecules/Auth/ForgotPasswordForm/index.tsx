import { Form, Input } from "antd";
import { Container } from "./styled";

const { Item } = Form;

const ForgotPasswordForm = () => {
  return (
    <Container>
      <Form layout="vertical">
        <Item name={"email"} label={"Email"}>
          <Input size="large" />
        </Item>
      </Form>
    </Container>
  );
};

export default ForgotPasswordForm;
