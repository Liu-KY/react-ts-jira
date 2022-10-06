import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { Form, Input, Button } from "antd";

export const LoginScreen = () => {
  //自定义上下文HOOKS
  const { login } = useAuth();
  //登录方法
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="用户名" />
      </Form.Item>

      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input
          type={"password"}
          id={"password"}
          autoComplete="true"
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
