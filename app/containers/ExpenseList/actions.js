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
  DELETE_EXPENSE_DATA,
  DELETE_EXPENSE_DATA_SUCCESS,
  DELETE_EXPENSE_DATA_ERROR,
  UPDATE_EXPENSE_DATA,
  UPDATE_EXPENSE_DATA_SUCCESS,
  UPDATE_EXPENSE_DATA_ERROR,
  CLEAR_DATA,
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

export const updateExpenseData = data => ({
  type: UPDATE_EXPENSE_DATA,
  params: { data },
});

export const updateExpenseDataSuccess = message => ({
  type: UPDATE_EXPENSE_DATA_SUCCESS,
  payload: { message },
});

export const updateExpenseDataError = error => ({
  type: UPDATE_EXPENSE_DATA_ERROR,
  error,
});

export const deleteExpenseData = id => ({
  type: DELETE_EXPENSE_DATA,
  params: { id },
});

export const deleteExpenseDataSuccess = message => ({
  type: DELETE_EXPENSE_DATA_SUCCESS,
  payload: { message },
});

export const deleteExpenseDataError = error => ({
  type: DELETE_EXPENSE_DATA_ERROR,
  error,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});