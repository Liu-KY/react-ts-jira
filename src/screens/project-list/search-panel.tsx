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
        <input
          type="text"
          value={param.name}
          onChange={(ev) =>
            setParam({
              ...param,
              name: ev.target.value,
            })
          }
        />

        <select
          value={param.personId}
          onChange={(ev) =>
            setParam({
              ...param,
              personId: ev.target.value,
            })
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
