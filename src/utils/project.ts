import { useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

import { useAsync } from "utils/useAsync";
import { Project } from "screens/project-list/list";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProject = () =>
    client("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProject(), { retry: fetchProject });
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return { mutate, ...result };
};

export const useAddProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return { mutate, ...result };
};
