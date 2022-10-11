import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";

export const RegisterScreen = ({
  onError,
}: {
  onError: (e: Error) => void;
}) => {
  //自定义上下文HOOKS
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { catch: true });

  //注册方法
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password)
      return onError(new Error("请确认两次密码的正确"));
    try {
      await run(register(values));
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

      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input
          type={"password"}
          id={"cpassword"}
          autoComplete="true"
          placeholder="确认密码"
        />
      </Form.Item>

      <Form.Item>
        <LongButton type={"primary"} htmlType={"submit"} loading={isLoading}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
