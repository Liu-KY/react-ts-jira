/* @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import { Form, Input, Select } from "antd";

interface ListProps {
  param: {
    name: string;
    personId: string;
  };
  users: {
    id: string;
    name: string;
  }[];
  setParam: (param: ListProps["param"]) => void;
}

export const SearchPanel = ({ param, users, setParam }: ListProps) => {
  return (
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(ev) =>
            setParam({
              ...param,
              name: ev.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
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
            <Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
