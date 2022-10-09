import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";

export interface User {
  id: string;
  name: string;
}

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(params || {}) }));
  }, [params]);
  return result;
};
