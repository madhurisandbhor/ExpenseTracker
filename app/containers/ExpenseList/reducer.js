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
  UPDATE_EXPENSE_DATA,
  UPDATE_EXPENSE_DATA_SUCCESS,
  UPDATE_EXPENSE_DATA_ERROR,
  DELETE_EXPENSE_DATA,
  DELETE_EXPENSE_DATA_SUCCESS,
  DELETE_EXPENSE_DATA_ERROR,
  CLEAR_DATA,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  list: [],
  searchText: '',
  message: '',
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
      return {
        ...state,
        message: initialState.message,
        error: initialState.error,
      };
    case SAVE_EXPENSE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case SAVE_EXPENSE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.response.data,
        message: initialState.message,
      };
    case UPDATE_EXPENSE_DATA:
      return {
        ...state,
        loading: true,
        message: initialState.message,
        error: initialState.error,
      };
    case UPDATE_EXPENSE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case UPDATE_EXPENSE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.response.data,
        message: initialState.message,
      };
    case DELETE_EXPENSE_DATA:
      return {
        ...state,
        loading: true,
        message: initialState.message,
        error: initialState.error,
      };
    case DELETE_EXPENSE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case DELETE_EXPENSE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        message: initialState.message,
      };
    case CLEAR_DATA:
      return {
        ...state,
        loading: initialState.loading,
        error: initialState.error,
        list: initialState.list,
        message: initialState.message,
      };
    default:
      return state;
  }
};

export default expenseListReducer;
