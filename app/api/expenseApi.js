import axios from 'axios';
import { defaultConfig } from './constants';

export const getExpenseList = searchText => {
  // const params = new URLSearchParams();
  // params.append('search', searchText);

  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: searchText ? `/expense?search=${searchText}` : `/expense`,
    method: 'get',
  };
  return axios.request(config);
};
