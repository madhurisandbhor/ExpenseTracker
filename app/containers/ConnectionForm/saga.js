import { takeLatest, call, put } from 'redux-saga/effects';
import { addUser as addUserAPI, userLogin as userLoginAPI } from 'api';
import { ADD_USER, USER_LOGIN } from './constants';

import {
  addUserSuccess,
  addUserError,
  userLoginSuccess,
  userLoginError,
} from './actions';

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

export function* userLogin(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(userLoginAPI, params)
      : yield call(userLoginAPI);
    const { data } = result;
    yield put(userLoginSuccess(data));
  } catch (err) {
    yield put(userLoginError(err));
  }
}
export default function* ConnectionFormSaga() {
  yield takeLatest(ADD_USER, addUser);
  yield takeLatest(USER_LOGIN, userLogin);
}
