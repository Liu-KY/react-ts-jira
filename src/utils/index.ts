import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => {
  return value === 0 ? false : !value;
};

//判断是否为null
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

//如果传入的对象属性是空的就删除
export const cleanObject = (object: { [key: string]: unknown }) => {
  const res = { ...object };
  Object.keys(res).forEach((key: string) => {
    const value = res[key];
    if (isVoid(value)) {
      delete res[key];
    }
  });

  return res;
};

//执行一次
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

//防抖hooks
export const useDebounce = <T>(value: T, time?: number) => {
  const [newValue, setValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(value), time);
    return () => clearTimeout(timeout);
  }, [value, time]);

  return newValue;
};

//设置标题
export const useTitle = (newTitle: string, config: boolean = true) => {
  const title = useRef<string>(document.title).current;

  useEffect(() => {
    document.title = newTitle;

    return () => {
      if (!config) document.title = title;
    };
  }, [newTitle, config]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
