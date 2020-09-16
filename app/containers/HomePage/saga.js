/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { getTotalExpense as getTotalExpenseAPI } from 'api';
import { loadTotalExpenseSuccess, loadTotalExpenseError } from './actions';
import { LOAD_TOTAL_EXPENSE } from './constants';

export function* getTotalExpense(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(getTotalExpenseAPI, params)
      : yield call(getTotalExpenseAPI);
    const { data } = result;
    yield put(loadTotalExpenseSuccess(data));
  } catch (err) {
    yield put(loadTotalExpenseError(err));
  }
}

export default function* githubData() {
  yield takeLatest(LOAD_TOTAL_EXPENSE, getTotalExpense);
}
