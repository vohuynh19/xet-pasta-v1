import { Card } from "antd";

import { ForgotPasswordAction, ForgotPasswordForm } from "ui/molecules";

import { Container } from "../styled";

const ForgotPassword = () => {
  return (
    <Container>
      <Card>
        <h2>Forgot Password</h2>
        <ForgotPasswordForm />
        <ForgotPasswordAction />
      </Card>
    </Container>
  );
};

export default ForgotPassword;
