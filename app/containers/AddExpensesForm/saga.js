import { takeLatest, call, put } from 'redux-saga/effects';
import { getExpenseData as getExpenseDataAPI } from 'api';
import { LOAD_EXPENSE_DATA } from './constants';

import { loadExpenseDataSuccess, loadExpenseDataError } from './actions';

export function* getExpenseData(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(getExpenseDataAPI, params)
      : yield call(getExpenseDataAPI);
    const { data } = result;
    yield put(loadExpenseDataSuccess(data));
  } catch (err) {
    yield put(loadExpenseDataError(err));
  }
}

export default function* addExpensesFormSaga() {
  yield takeLatest(LOAD_EXPENSE_DATA, getExpenseData);
}
