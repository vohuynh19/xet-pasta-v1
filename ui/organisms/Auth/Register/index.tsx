import { Card } from "antd";

import { RegisterAction, RegisterForm } from "ui/molecules";

import { Container } from "../styled";

const Register = () => {
  return (
    <Container>
      <Card>
        <h2>Sign up and start learning</h2>
        <RegisterForm />
        <RegisterAction />
      </Card>
    </Container>
  );
};

export default Register;
