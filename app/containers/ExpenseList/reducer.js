/*
 *
 * ExpenseList reducer
 *
 */
import { LOAD_EXPENSE_LIST, LOAD_EXPENSE_LIST_SUCCESS, LOAD_EXPENSE_LIST_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: '',
  list: [],
  searchText: '',
};

/* eslint-disable default-case, no-param-reassign */
const expenseListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPENSE_LIST:
      return { ...state, loading: true, searchText: action.params };
    case LOAD_EXPENSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case LOAD_EXPENSE_LIST_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default expenseListReducer;