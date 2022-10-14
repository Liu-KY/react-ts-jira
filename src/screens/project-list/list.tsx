import { Table, TableProps } from "antd";
import { Pin } from "components/Pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";

export interface User {
  created: number;
  id: number;
  name: string;
  organization: string;
  personId: number;
  token: string;
}

export interface Project {
  key: number;
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh: () => void;
}

export const List = ({ users, refresh, ...props }: ListProps) => {
  const { mutate } = useEditProject();

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin choose />,
          dataIndex: "pin",
          render(value, project) {
            return (
              <Pin
                choose={value}
                onChange={(pin) =>
                  mutate({ id: project.id, pin: !!pin }).then(refresh)
                }
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={project.id + ""}>{value}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id == project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
      rowKey="id"
    />
  );
};
