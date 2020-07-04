import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getExpenseList as getExpenseListAPI,
  saveExpenseData as saveExpenseDataAPI,
  updateExpenseData as updateExpenseDataAPI,
  deleteExpenseData as deleteExpenseDataAPI,
} from 'api';
import {
  LOAD_EXPENSE_LIST,
  SAVE_EXPENSE_DATA,
  UPDATE_EXPENSE_DATA,
  DELETE_EXPENSE_DATA,
} from './constants';

import {
  loadExpenseListSuccess,
  loadExpenseListError,
  saveExpenseDataSuccess,
  saveExpenseDataError,
  updateExpenseDataSuccess,
  updateExpenseDataError,
  deleteExpenseDataSuccess,
  deleteExpenseDataError,
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

export function* updateExpenseData(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(updateExpenseDataAPI, params)
      : yield call(updateExpenseDataAPI);
    const { data } = result;
    yield put(updateExpenseDataSuccess(data));
  } catch (err) {
    yield put(updateExpenseDataError(err));
  }
}

export function* deleteExpenseData(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(deleteExpenseDataAPI, params)
      : yield call(deleteExpenseDataAPI);
    const { data } = result;
    yield put(deleteExpenseDataSuccess(data));
  } catch (err) {
    yield put(deleteExpenseDataError(err));
  }
}

// Individual exports for testing
export default function* expenseListSaga() {
  yield takeLatest(LOAD_EXPENSE_LIST, getExpenseList);
  yield takeLatest(SAVE_EXPENSE_DATA, saveExpenseData);
  yield takeLatest(UPDATE_EXPENSE_DATA, updateExpenseData);
  yield takeLatest(DELETE_EXPENSE_DATA, deleteExpenseData);
}
