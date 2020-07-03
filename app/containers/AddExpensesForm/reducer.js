/*
 *
 * AddExpensesForm reducer
 *
 */
import {
  LOAD_EXPENSE_DATA,
  LOAD_EXPENSE_DATA_SUCCESS,
  LOAD_EXPENSE_DATA_ERROR,
  CLEAR_DATA,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  data: '',
  message: '',
};

/* eslint-disable default-case, no-param-reassign */
const addExpensesFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPENSE_DATA:
      return { ...state, loading: true };
    case LOAD_EXPENSE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case LOAD_EXPENSE_DATA_ERROR:
      return { ...state, loading: false, error: action.error };
    case CLEAR_DATA:
      return {
        ...state,
        loading: initialState.loading,
        error: initialState.error,
        data: initialState.data,
        message: initialState.message,
      };
    default:
      return state;
  }
};

export default addExpensesFormReducer;
