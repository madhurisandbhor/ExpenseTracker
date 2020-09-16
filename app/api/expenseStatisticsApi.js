import axios from 'axios';
import { defaultConfig } from './constants';

export const getStatisticData = ({ userId, expenseBy }) => {
  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: `/expenseStatistics?userId=${userId}&type=${expenseBy.type}&year=${expenseBy.year}&weekStartDate=${expenseBy.weekStartDate}&weekEndDate=${expenseBy.weekEndDate}`,
    method: 'get',
  };
  return axios.request(config);
};
