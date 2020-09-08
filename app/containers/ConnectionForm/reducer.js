/*
 *
 * ConnectionForm reducer
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

export const initialState = {
  loading: false,
  error: '',
  message: '',
  url: '',
  username: '',
  userId: '',
};

/* eslint-disable default-case, no-param-reassign */
const ConnectionFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        loading: true,
        message: initialState.message,
        error: initialState.error,
        url: initialState.url,
        userId: initialState.userId,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        url: '/user',
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.response.data,
        message: initialState.message,
        url: '/user',
      };
    case USER_LOGIN:
      return {
        ...state,
        loading: true,
        message: initialState.message,
        error: initialState.error,
        url: initialState.url,
        username: initialState.username,
        userId: initialState.userId,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        // message: action.payload.message,
        username: action.payload.username,
        url: '/login',
        userId: action.payload.userId,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.response.data,
        message: initialState.message,
        url: '/login',
      };
    case CLEAR_DATA:
      return { ...initialState };
    default:
      return state;
  }
};

export default ConnectionFormReducer;
