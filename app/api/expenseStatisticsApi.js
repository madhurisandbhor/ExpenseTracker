import axios from 'axios';
import { defaultConfig } from './constants';

export const getStatisticData = ({ userId, expenseBy }) => {
  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: `/expenseStatistics?userId=${userId}&expenseBy=${expenseBy}`,
    method: 'get',
  };
  return axios.request(config);
};
