/* @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import { Form, Input, Select } from "antd";
import { UseSelect } from "components/userSelect";
import { User } from "./list";

interface ListProps {
  param: Partial<Pick<User, "name" | "personId">>;
  users: User[];
  setParam: (param: ListProps["param"]) => void;
}

export const SearchPanel = ({ param, users, setParam }: ListProps) => {
  // console.log(param, users)
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
        <UseSelect
          value={param.personId}
          onChange={(value) => {
            console.log(value);
            setParam({
              ...param,
              personId: value,
            });
          }}
          defaultOptionName={"负责人"}
        />

        {/* <Select
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
        </Select> */}
      </Form.Item>
    </Form>
  );
};
