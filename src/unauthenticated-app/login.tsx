import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";

export const LoginScreen = ({ onError }: { onError: (e: Error) => void }) => {
  //自定义上下文HOOKS
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { catch: true });

  //登录方法
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
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
        <LongButton type={"primary"} htmlType={"submit"} loading={isLoading}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
