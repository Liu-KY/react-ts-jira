import { logout } from "auth-provider";
import { useAuth } from "context/auth-context";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", //如果有token就放token
      "Content-Type": data ? "aplication/json" : "", //如果是data就设置json
    },
    ...customConfig,
  };

  //判断是否是GET
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //发送请求
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    //是否401
    if (res.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    //数据的JSON格式
    const data = await res.json();

    //成功与否
    if (res.ok) {
      return data;
    } else {
      Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth(); //获取token
  return (...[endpoint, congfig]: Parameters<typeof http>) =>
    http(endpoint, { ...congfig, token: user?.token });
};

//JS操作符
//Parameters<typeof http>
