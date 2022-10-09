import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "sucess";
}

const dafaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState({
    ...dafaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      error: null,
      stat: "sucess",
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise对象");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSucess: state.stat === "sucess",
    run,
    setData,
    setError,
    ...state,
  };
};
