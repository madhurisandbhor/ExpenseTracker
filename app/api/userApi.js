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
