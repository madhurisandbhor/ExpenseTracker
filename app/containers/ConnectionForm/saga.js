import { takeLatest, call, put } from 'redux-saga/effects';
import { addUser as addUserAPI } from 'api';
import { ADD_USER } from './constants';

import { addUserSuccess, addUserError } from './actions';

export function* addUser(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(addUserAPI, params)
      : yield call(addUserAPI);
    const { data } = result;
    yield put(addUserSuccess(data));
  } catch (err) {
    yield put(addUserError(err));
  }
}

export default function* ConnectionFormSaga() {
  yield takeLatest(ADD_USER, addUser);
}
