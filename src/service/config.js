
import cookie from 'js-cookie';
import axios from 'axios';

const defaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',
};

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  headers: defaultHeader,
  // withCredentials: true,
});

// 请求拦截，设置Header的token
instance.interceptors.request.use(
  (config) => {
    const token = cookie.get('csrfToken');
    if (token) config.headers.token = token;
    return config;
  },
  e => Promise.reject(e)
);

//响应拦截
instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res && res.data);
  },
  e => Promise.reject(e)
);

export default instance;
