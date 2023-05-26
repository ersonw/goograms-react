import axios from "axios";
import qs from "qs";
import auth from "./auth";
import Auth from "./auth";


const service = axios.create({
  baseURL: process.env.API || '/',//'http://172.21.68.12:8080', // api base_url
  timeout: 30000 // 请求超时时间
});

/* 错误处理 */
const errStatus = [401, 502] // 需要退出的 service code
const err = (error: { response: { status: number; }; message: string | string[]; }) => {
  if (error.response) {
    if (errStatus.includes(error.response.status)) {
      // 退出
    } else {
      // @ts-ignore
     window.document.message.error(`code:${error.response.status} 服务异常，请刷新重试!`);
    }
  } else {
    // 请求超时
    const isTimeout = error.message.includes("timeout");
    // @ts-ignore
    // window.document.message.error(isTimeout ? "请求已超时，请刷新或检查互联网连接" : "请检查网络是否已连接");
  }
  return Promise.reject(error);
};

service.interceptors.request.use((config: any) => {
  const token = auth.get();
  if (token) {
    // @ts-ignore
    config.headers["X-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (config.method === "post") {
    // @ts-ignore
    // if (config.headers["Content-Type"] !== "multipart/form-data" || config.headers["Content-Type"] !== "multipart/form-data;charset=UTF-8") {
    if (config.headers["Content-Type"]) {
      config.data = qs.stringify(config.data);
    }else {
      config.headers["Content-Type"] = "multipart/form-data";
    }
  }
  return config;
}, err);

service.interceptors.response.use( (response: any) => {
  if (response.status !== 200) {
    return Promise.reject(response.data);
  }
  /* 特殊处理 */
  if (response.config.responseType === "blob") {
    return response;
  }
  if (response.config.responseType === "stream") {
    return response;
  }
  const {code,msg,data} = response.data;
  if (data!==undefined){
    if (code === 201) {
      Auth.del();
    }
    if (msg) {
      if (code === 0) {
        // @ts-ignore
        window.document.message.success(msg);
      } else {
        // @ts-ignore
        window.document.message.error(`code:${code} ${msg}`);
      }
    }
    if (code !== 0) {
      return Promise.reject(msg);
    }
    return data;
  }
  return response.data;
}, err);

export default service;
