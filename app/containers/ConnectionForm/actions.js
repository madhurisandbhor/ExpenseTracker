/*
 *
 * ConnectionForm actions
 *
 */

import { ADD_USER, ADD_USER_SUCCESS, ADD_USER_ERROR, CLEAR_DATA } from './constants';

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

export const clearData = () => ({
  type: CLEAR_DATA,
});