import axios from 'axios';
import { defaultConfig } from './constants';

export const getCatgeoryStatisticData = ({ userId }) => {
  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: `/expenseStatistics/categories?userId=${userId}`,
    method: 'get',
  };
  return axios.request(config);
};
