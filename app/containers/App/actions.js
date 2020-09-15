import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from './constants';

export const getUserData = params => ({
  type: GET_USER_DATA,
  params,
});

export const getUserDataSuccess = data => ({
  type: GET_USER_DATA_SUCCESS,
  payload: data,
});

export const getUserDataError = error => ({
  type: GET_USER_DATA_ERROR,
  error,
});
