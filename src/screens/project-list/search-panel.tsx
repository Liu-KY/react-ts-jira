import { Input, Select } from "antd";

interface ListProps {
  param: {
    name: string;
    personId: string;
  };
  users: {
    id: number;
    name: string;
  }[];
  setParam: (param: ListProps["param"]) => void;
}

export const SearchPanel = ({ param, users, setParam }: ListProps) => {
  return (
    <form action="">
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(ev) =>
            setParam({
              ...param,
              name: ev.target.value,
            })
          }
        />

        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
