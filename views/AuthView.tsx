import { Form, Input, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "src/infra/firebase";
import styled from "styled-components";
import { Button } from "ui";

const StyledWrapper = styled.div`
  height: 100vh;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AuthView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success("Đăng nhập thành công");
    } catch (error) {
      message.error("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <StyledWrapper>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Đăng nhập
      </h2>

      <Form>
        <Form.Item>
          <Input
            placeholder="Nhập tài khoản"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Button type="primary" isFullWidth onClick={signIn}>
          Đăng nhập
        </Button>
      </Form>
    </StyledWrapper>
  );
};

export default AuthView;
