import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

export const LoginScreen = () => {
  //自定义上下文HOOKS
  const { login, user } = useAuth();
  //登录方法
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type={"password"} id={"password"} autoComplete="true" />
      </div>
      <button type={"submit"}>登录</button>
      {user ? <div>登录成功{user?.name}</div> : null}
    </form>
  );
};
