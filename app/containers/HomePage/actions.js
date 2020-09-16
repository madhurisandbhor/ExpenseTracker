/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_TOTAL_EXPENSE,
  LOAD_TOTAL_EXPENSE_SUCCESS,
  LOAD_TOTAL_EXPENSE_ERROR,
} from './constants';

export const loadTotalExpense = userId => ({
  type: LOAD_TOTAL_EXPENSE,
  params: { userId },
});

export const loadTotalExpenseSuccess = data => ({
  type: LOAD_TOTAL_EXPENSE_SUCCESS,
  payload: data,
});

export const loadTotalExpenseError = error => ({
  type: LOAD_TOTAL_EXPENSE_ERROR,
  error,
});
