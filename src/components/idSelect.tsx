import { type } from "@testing-library/user-event/dist/type";
import { Select, SelectProps } from "antd";
import { Raw } from "types";

type Select = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "onChange" | "value" | "options"> {
  value: null | undefined | Raw;
  onChange: (vakue?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => {
        onChange(toNumber(value));
      }}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((item) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

//判断是否能转换为数字  不能的话转换为0
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
