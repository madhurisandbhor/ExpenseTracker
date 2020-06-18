import { takeLatest, call, put } from 'redux-saga/effects';
import { getExpenseList as getExpenseListAPI } from 'api';
import { LOAD_EXPENSE_LIST } from './constants';

import {
  loadExpenseListSuccess,
  loadExpenseListError,
} from './actions';

export function* getExpenseList(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(getExpenseListAPI, params)
      : yield call(getExpenseListAPI);
    const { data } = result;
    yield put(loadExpenseListSuccess(data));
  } catch (err) {
    yield put(loadExpenseListError(err));
  }
}

// Individual exports for testing
export default function* expenseListSaga() {
  yield takeLatest(
    LOAD_EXPENSE_LIST,
    getExpenseList,
  );
}
