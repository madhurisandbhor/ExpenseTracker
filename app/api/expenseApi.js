import axios from 'axios';
import { defaultConfig } from './constants';

export const getExpenseList = (params) => {
  // const params = new URLSearchParams();
  // params.append('search', searchText);

  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url:  `/expense?search=${params.searchText}&page=${params.page}&limit=${params.limit}`,
    method: 'get',
  };
  return axios.request(config);
};
