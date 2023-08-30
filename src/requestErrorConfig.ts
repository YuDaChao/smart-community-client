import { refreshToken } from '@/services/ant-design-pro/api';
import type { RequestOptions } from '@@/plugin-request/request';
import { request } from '@umijs/max';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

interface PendingTask {
  config: any;
  resolve: (data: any) => void;
}

let isRefreshing = false;
const queue: PendingTask[] = [];

const refreshAccessToken = async () => {
  const token = window.localStorage.getItem('refreshAccessToken');
  if (token) {
    const res = await refreshToken({ refreshToken: token });
    if (res.code === 200) {
      window.localStorage.setItem('accessToken', res.data.accessToken);
      window.localStorage.setItem('refreshAccessToken', res.data.refreshAccessToken);
    }
    return res;
  }
  return null;
};

/**
 * @name
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: async (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      const { response, config } = error;
      // 我们的 errorThrower 抛出的错误。
      if (response) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            queue.push({
              config,
              resolve,
            });
          });
        }
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        const accessTokenExpired = response.status === 401;
        const isRefreshUrl = response.config.url !== '/api/refresh';
        if (accessTokenExpired && isRefreshUrl) {
          isRefreshing = true;
          const res = await refreshAccessToken();
          if (res && res.code === 200) {
            queue.forEach(({ config, resolve }) => {
              const { url, ...opts } = config;
              resolve(request(url, opts));
            });

            const { url, ...opts } = config;
            return request(url, opts);
          }
        }
        message.error(`Response status: ${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const accessToken = window.localStorage.getItem('accessToken');
      // config.headers.authorization = `Bearer ${accessToken}`;
      return { ...config, headers: { ...config.headers, authorization: `Bearer ${accessToken}` } };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      return response;
    },
  ],
};
