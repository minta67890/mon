import axios from 'axios';
import queryString from 'query-string';

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/`;
// const baseURL = 'http://localhost:8000/api/v1/';

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  };
});

publicClient.interceptors.response.use(
  response => {
    if (response && response.data) return response.data;
    return response;
  },
  err => {
    throw err.response.data;
  }
);

export default publicClient;
