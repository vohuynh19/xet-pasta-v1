import { Divider } from "antd";
import Link from "next/link";

import { PAGE_ROUTES } from "@constants";

import { Button } from "ui/atoms";

import { Container } from "./styled";

const RegisterAction = () => {
  return (
    <Container>
      <Button isFullWidth type="primary" size="large">
        Register
      </Button>

      <p>
        By signing up, you agree to our{" "}
        <Link href={PAGE_ROUTES.TERM_OF_USE}>
          <u>Terms of Use</u>
        </Link>{" "}
        and{" "}
        <Link href={PAGE_ROUTES.PRIVACY_POLICY}>
          <u>Privacy Policy</u>
        </Link>
        .
      </p>

      <Divider />

      <p>
        Already have an account? <Link href={PAGE_ROUTES.LOGIN}>Log in</Link>
      </p>
    </Container>
  );
};

export default RegisterAction;
