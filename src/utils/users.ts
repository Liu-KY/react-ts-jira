import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";
import { User } from "screens/project-list/list";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(params || {}) }));
  }, [params]);
  return result;
};
