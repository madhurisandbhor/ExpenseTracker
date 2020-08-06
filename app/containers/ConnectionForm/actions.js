/*
 *
 * ConnectionForm actions
 *
 */

import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  CLEAR_DATA,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
} from './constants';

export const addUser = params => ({
  type: ADD_USER,
  params,
});

export const addUserSuccess = data => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});

export const addUserError = error => ({
  type: ADD_USER_ERROR,
  error,
});

export const userLogin = params => ({
  type: USER_LOGIN,
  params,
});

export const userLoginSuccess = data => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
});

export const userLoginError = error => ({
  type: USER_LOGIN_ERROR,
  error,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});
