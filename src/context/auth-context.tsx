import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/list";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (from: AuthForm) => auth.login(from).then(setUser);
  const register = (from: AuthForm) => auth.register(from).then(setUser);
  const logout = () => auth.logout().then(() => setUser(user));

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
