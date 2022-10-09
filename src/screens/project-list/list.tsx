import { Table, TableProps } from "antd";
import dayjs from "dayjs";

export interface User {
  created: number;
  id: string;
  name: string;
  organization: string;
  personId: string;
  token: string;
}

interface ListProps extends TableProps<User> {
  users: {
    id: string;
    name: string;
  }[];
}

export const List = ({ users, ...props }: ListProps) => {
  console.log(props);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
                {users.find((user) => user.id === project.personId)?.name ||
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
