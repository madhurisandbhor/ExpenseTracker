import axios from 'axios';
import { defaultConfig } from './constants';

export const getCatgeoryStatisticData = () => {
  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: `/expenseStatistics/categories`,
    method: 'get',
  };
  return axios.request(config);
};