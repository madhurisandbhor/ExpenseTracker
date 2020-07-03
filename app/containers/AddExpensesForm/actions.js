/*
 *
 * AddExpensesForm actions
 *
 */

import {
  LOAD_EXPENSE_DATA,
  LOAD_EXPENSE_DATA_SUCCESS,
  LOAD_EXPENSE_DATA_ERROR,
  CLEAR_DATA,
} from './constants';

export const loadExpenseData = id => ({
  type: LOAD_EXPENSE_DATA,
  params: { id },
});

export const loadExpenseDataSuccess = data => ({
  type: LOAD_EXPENSE_DATA_SUCCESS,
  payload: { data },
});

export const loadExpenseDataError = error => ({
  type: LOAD_EXPENSE_DATA_ERROR,
  error,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});
