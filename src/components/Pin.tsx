import { Rate } from "antd";
import React from "react";

interface PinProps extends React.ComponentProps<typeof Rate> {
  choose?: Boolean;
  onChange?: (value: number) => void;
}
export const Pin = ({ choose, onChange }: PinProps) => {
  return <Rate count={1} value={choose ? 1 : 0} onChange={onChange} />;
};
