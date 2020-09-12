/*
 *
 * StatisticsContainer actions
 *
 */

import {
  LOAD_STATISTICS_DATA,
  LOAD_STATISTICS_DATA_SUCCESS,
  LOAD_STATISTICS_DATA_ERROR,
} from './constants';

export const loadStatisticsData = ({ userId, expenseBy }) => ({
  type: LOAD_STATISTICS_DATA,
  params: { userId, expenseBy },
});

export const loadStatisticsDataSuccess = data => ({
  type: LOAD_STATISTICS_DATA_SUCCESS,
  payload: data,
});

export const loadStatisticsDataError = error => ({
  type: LOAD_STATISTICS_DATA_ERROR,
  error,
});