import { Table } from "antd";

export interface User {
  created: number;
  id: number;
  name: string;
  organization: string;
  personId: number;
  token: string;
}

interface ListProps {
  users: {
    id: number;
    name: string;
  }[];
  list: User[];
}

export const List = ({ list, users }: ListProps) => {
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
      ]}
      dataSource={list}
      rowKey="id"
    />
  );
};
