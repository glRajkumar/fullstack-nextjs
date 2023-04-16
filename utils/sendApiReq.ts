// import jsCookie from "js-cookie";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { root } from './endPoints';

type SendApiReqParams = {
  isAuthendicated?: boolean;
  headers?: Record<string, string>;
  method?: AxiosRequestConfig['method'];
  url?: string;
  data?: unknown;
};

type CustomError = Error & { status?: number };

const requestIntercepter = (instance: AxiosInstance, isAuthendicated: boolean, headers: Record<string, string>): void => {
  instance.interceptors.request.use(
    function (config) {
      if (isAuthendicated) {
        config.headers = {
          // Authorization - handled by next-auth
          // Authorization: "Bearer " + jsCookie.get("next-auth.session-token"),
          ...headers
        }
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  )
}

const responseIntercepter = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    error => {
      const err: CustomError = new Error(error?.message)
      err.status = error?.response?.status
      err.message = error?.response?.data?.message
      throw err
    }
  )
}

const sendApiReq = ({ isAuthendicated = true, headers = {}, ...others }: SendApiReqParams): Promise<any> => {
  const instance = axios.create({ baseURL: root.baseUrl })
  requestIntercepter(instance, isAuthendicated, headers)
  responseIntercepter(instance)
  return instance({ ...others })
}

export default sendApiReq;
