import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => {
  return value === 0 ? false : !value;
};

export const cleanObject = (object: { [key: string]: unknown }) => {
  const res = { ...object };

  Object.keys(object).forEach((key) => {
    if (isFalsy(res[key])) {
      delete res[key];
    }
  });

  return res;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, time?: number) => {
  const [newValue, setValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(value), time);
    return () => clearTimeout(timeout);
  }, [value, time]);

  return newValue;
};
