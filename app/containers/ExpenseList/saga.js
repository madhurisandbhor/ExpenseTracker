import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getExpenseList as getExpenseListAPI,
  saveExpenseData as saveExpenseDataAPI,
  updateExpenseData as updateExpenseDataAPT,
} from 'api';
import { LOAD_EXPENSE_LIST, SAVE_EXPENSE_DATA } from './constants';

import {
  loadExpenseListSuccess,
  loadExpenseListError,
  saveExpenseDataSuccess,
  saveExpenseDataError,
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

export function* updateExpenseData(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(updateExpenseDataAPT, params)
      : yield call(updateExpenseDataAPT);
    const { data } = result;
    yield put(saveExpenseDataSuccess(data));
  } catch (err) {
    yield put(saveExpenseDataError(err));
  }
}

export function* saveExpenseData(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(saveExpenseDataAPI, params)
      : yield call(saveExpenseDataAPI);
    const { data } = result;
    yield put(saveExpenseDataSuccess(data));
  } catch (err) {
    yield put(saveExpenseDataError(err));
  }
}

// Individual exports for testing
export default function* expenseListSaga() {
  yield takeLatest(LOAD_EXPENSE_LIST, getExpenseList);
  yield takeLatest(SAVE_EXPENSE_DATA, updateExpenseData);
}
