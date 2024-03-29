import axios from 'axios';
import { defaultConfig } from './constants';

export const getExpenseList = ({
  userId,
  searchText,
  currentPage,
  limit,
  fromDate,
  toDate,
  fromAmount,
  toAmount,
  categoriesToSend,
}) => {
  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: `/expense?userId=${userId}&search=${searchText}&page=${currentPage}&limit=${limit}
    &fromDate=${fromDate}&toDate=${toDate}&fromAmount=${fromAmount}&toAmount=${toAmount}&categories=${categoriesToSend}`,
    method: 'get',
  };
  return axios.request(config);
};

export const getLastestExpenseList = ({ currentPage, limit, userId }) => {
  const config = {
    ...defaultConfig, // get defaultConfig and override them.
    url: `/expense?page=${currentPage}&limit=${limit}&userId=${userId}`,
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

export const getTotalExpense = ({ userId }) => {
  const config = {
    ...defaultConfig,
    url: `/totalExpense?userId=${userId}`,
    method: 'get',
  };
  return axios.request(config);
};