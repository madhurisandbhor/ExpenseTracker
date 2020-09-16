/*
 *
 * LatestExpenseList reducer
 *
 */
import {
  LOAD_EXPENSE_LIST,
  LOAD_EXPENSE_LIST_SUCCESS,
  LOAD_EXPENSE_LIST_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  list: [],
};

/* eslint-disable default-case, no-param-reassign */
const latestExpenseListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPENSE_LIST:
      return { ...state, loading: true, list: [] };
    case LOAD_EXPENSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.result,
      };
    case LOAD_EXPENSE_LIST_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default latestExpenseListReducer;
