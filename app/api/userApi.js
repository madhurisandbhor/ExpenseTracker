import axios from 'axios';
import { defaultConfig } from './constants';

export const addUser = data => {
  const config = {
    ...defaultConfig,
    url: `/user`,
    method: 'post',
    data,
  };
  return axios.request(config);
};

export const userLogin = data => {
  const config = {
    ...defaultConfig,
    url: `/login`,
    method: 'post',
    data,
  };
  return axios.request(config);
};

export const getUserData = () => {
  const config = {
    ...defaultConfig,
    url: `/authUser`,
    method: 'get',
  };
  return axios.request(config);
};
