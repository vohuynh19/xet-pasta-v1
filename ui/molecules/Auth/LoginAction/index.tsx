import { Divider } from "antd";
import Link from "next/link";

import { PAGE_ROUTES } from "@constants";

import { Button } from "ui/atoms";

import { Container } from "./styled";

const LoginAction = () => {
  return (
    <Container>
      <Button isFullWidth type="primary" size="large">
        Sign in
      </Button>

      <p>
        or <Link href={PAGE_ROUTES.FORGOT_PASSWORD}>Forgot Password</Link>
      </p>

      <Divider />

      <p>
        Do not have an account?{" "}
        <Link href={PAGE_ROUTES.REGISTER}>Register</Link>
      </p>
    </Container>
  );
};

export default LoginAction;
