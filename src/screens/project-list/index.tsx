import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/users";
import { useProjectsSearchParams } from "./util";

export const ProjectListScreen = () => {
  //对象会无限创建需要使用useMemo解决
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProject(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>

      <SearchPanel param={param} users={users || []} setParam={setParam} />

      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}

      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
