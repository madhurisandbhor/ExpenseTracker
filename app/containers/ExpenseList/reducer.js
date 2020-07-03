/*
 *
 * ExpenseList reducer
 *
 */
import {
  LOAD_EXPENSE_LIST,
  LOAD_EXPENSE_LIST_SUCCESS,
  LOAD_EXPENSE_LIST_ERROR,
  SAVE_EXPENSE_DATA,
  SAVE_EXPENSE_DATA_SUCCESS,
  SAVE_EXPENSE_DATA_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  list: [],
  searchText: '',
  info: {
    totalCount: 0,
    pages: 1,
    next: '',
    prev: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const expenseListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPENSE_LIST:
      return { ...state, loading: true, searchText: action.params.searchText };
    case LOAD_EXPENSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.result,
        info: action.payload.info,
      };
    case LOAD_EXPENSE_LIST_ERROR:
      return { ...state, loading: false, error: action.error };
    case SAVE_EXPENSE_DATA:
      return state;
    case SAVE_EXPENSE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case SAVE_EXPENSE_DATA_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default expenseListReducer;
