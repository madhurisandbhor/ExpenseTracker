import axios from 'axios';
import { defaultConfig } from './constants';

export const getExpenseList = ({
  searchText,
  page,
  limit,
  fromDate,
  toDate,
  fromAmount,
  toAmount,
}) => {
  // const params = new URLSearchParams();
  // params.append('search', searchText);

  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: `/expense?search=${searchText}&page=${page}&limit=${limit}
    &fromDate=${fromDate}&toDate=${toDate}&fromAmount=${fromAmount}&toAmount=${toAmount}`,
    method: 'get',
  };
  return axios.request(config);
};

export const getExpenseData = ({ id }) => {
  const config = {
    ...defaultConfig,
    url: `/expense/${id}`,
    method: 'get',
  };
  return axios.request(config);
};

export const saveExpenseData = ({ data }) => {
  const config = {
    ...defaultConfig,
    url: `/expense`,
    method: 'post',
    data,
  };
  return axios.request(config);
};

export const updateExpenseData = ({ data }) => {
  const config = {
    ...defaultConfig,
    url: `/expense/${data.id}`,
    method: 'put',
    data,
  };
  return axios.request(config);
};

export const deleteExpenseData = ({ id }) => {
  const config = {
    ...defaultConfig,
    url: `/expense/${id}`,
    method: 'delete',
  };
  return axios.request(config);
};
