/*
 *
 * StatisticsContainer actions
 *
 */

import {
  LOAD_CATEGORY_STATISTICS,
  LOAD_CATEGORY_STATISTICS_SUCCESS,
  LOAD_CATEGORY_STATISTICS_ERROR,
} from './constants';

export const loadCategoryStatistics = userId => ({
  type: LOAD_CATEGORY_STATISTICS,
  params: { userId },
});

export const loadCategoryStatisticsSuccess = data => ({
  type: LOAD_CATEGORY_STATISTICS_SUCCESS,
  payload: data,
});

export const loadCategoryStatisticsError = error => ({
  type: LOAD_CATEGORY_STATISTICS_ERROR,
  error,
});