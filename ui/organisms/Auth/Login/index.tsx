import { Card } from "antd";

import { LoginAction, LoginForm } from "ui/molecules";
import { Container } from "../styled";

const Login = () => {
  return (
    <Container>
      <Card>
        <h2>Log in to your Vicodemy account</h2>

        <LoginForm />

        <LoginAction />
      </Card>
    </Container>
  );
};

export default Login;
