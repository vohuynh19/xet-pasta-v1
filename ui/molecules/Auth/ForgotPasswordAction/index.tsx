import { Divider } from "antd";
import Link from "next/link";

import { PAGE_ROUTES } from "@constants";

import { Button } from "ui/atoms";

import { Container } from "./styled";

const ForgotPasswordAction = () => {
  return (
    <Container>
      <Button isFullWidth type="primary" size="large">
        Forgot Password
      </Button>

      <Divider />

      <p>
        or {""}
        <Link href={PAGE_ROUTES.REGISTER}>Login </Link>
      </p>
    </Container>
  );
};

export default ForgotPasswordAction;
