import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/list";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageError, FullPageLoading } from "components/Lib";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (from: AuthForm) => Promise<void>;
      register: (from: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

//获取token
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 设置供应商
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isError,
    isLoading,
    isIdle,
    setData: setUser,
    run,
  } = useAsync<User | null>();

  const login = (from: AuthForm) => auth.login(from).then(setUser);
  const register = (from: AuthForm) => auth.register(from).then(setUser);
  const logout = () => auth.logout().then(() => setUser(user));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

// 消费者提取
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
