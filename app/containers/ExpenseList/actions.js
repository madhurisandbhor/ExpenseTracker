/*
 *
 * ExpenseList actions
 *
 */

import { LOAD_EXPENSE_LIST, LOAD_EXPENSE_LIST_SUCCESS, LOAD_EXPENSE_LIST_ERROR } from './constants';

export const loadExpenseList = (page, limit, searchText) => ({
  type: LOAD_EXPENSE_LIST,
  params: { page: page, limit: limit, searchText: searchText },
});

export const loadExpenseListSuccess = data => ({
  type: LOAD_EXPENSE_LIST_SUCCESS,
  payload: data,
});

export const loadExpenseListError = error => ({
  type: LOAD_EXPENSE_LIST_ERROR,
  error,
});