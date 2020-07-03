/*
 *
 * ExpenseList actions
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

export const loadExpenseList = (page, limit, searchText) => ({
  type: LOAD_EXPENSE_LIST,
  params: { page, limit, searchText },
});

export const loadExpenseListSuccess = data => ({
  type: LOAD_EXPENSE_LIST_SUCCESS,
  payload: data,
});

export const loadExpenseListError = error => ({
  type: LOAD_EXPENSE_LIST_ERROR,
  error,
});

export const saveExpenseData = data => ({
  type: SAVE_EXPENSE_DATA,
  params: { data },
});

export const saveExpenseDataSuccess = message => ({
  type: SAVE_EXPENSE_DATA_SUCCESS,
  payload: { message },
});

export const saveExpenseDataError = error => ({
  type: SAVE_EXPENSE_DATA_ERROR,
  error,
});
