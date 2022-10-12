import { useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

import { useAsync } from "utils/useAsync";
import { Project, User } from "screens/project-list/list";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
