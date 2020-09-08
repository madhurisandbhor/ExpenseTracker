import { takeLatest, call, put } from 'redux-saga/effects';
import { getLastestExpenseList as getLastestExpenseListAPI } from 'api';
import { LOAD_EXPENSE_LIST } from './constants';

import { loadExpenseListSuccess, loadExpenseListError } from './actions';

export function* getExpenseList(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(getLastestExpenseListAPI, params)
      : yield call(getLastestExpenseListAPI);
    const { data } = result;
    yield put(loadExpenseListSuccess(data));
  } catch (err) {
    yield put(loadExpenseListError(err));
  }
}

export default function* latestExpenseListSaga() {
  yield takeLatest(LOAD_EXPENSE_LIST, getExpenseList);
}
