import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config/config.js";

const NETWORK_ERROR = "网络错误...";
const server = axios.create({
  baseURL: config.baseApi,
});
// 添加请求拦截器
server.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
server.interceptors.response.use((response) => {
  const { code, data, msg } = response.data;
  if (code === 200) {
    return data;
  } else {
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  } // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
});

function request(options) {
  options.method = options.method || "get";
  //关于get请求参数的调整
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }

  //对mock的开关做一个处理
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }

  //对环境做一个处理
  if (config.env === "prod") {
    server.defaults.baseURL = config.baseApi;
  } else {
    server.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return server(options);
}

export default request;
