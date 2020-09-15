/*
 *
 * StatisticsContainer reducer
 *
 */
import {
  LOAD_STATISTICS_DATA,
  LOAD_STATISTICS_DATA_SUCCESS,
  LOAD_STATISTICS_DATA_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  expenseData: {
    dataByCategory: [],
    dataByDays: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const StatisticsContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STATISTICS_DATA:
      return { ...state, loading: true, data: initialState.data };
    case LOAD_STATISTICS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        expenseData: {
          ...state.expenseData,
          dataByCategory: action.payload.dataByCategory,
          dataByDays: action.payload.dataByDays,
        },
      };
    case LOAD_STATISTICS_DATA_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default StatisticsContainerReducer;
