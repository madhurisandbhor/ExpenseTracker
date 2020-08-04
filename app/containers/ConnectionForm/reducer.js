/*
 *
 * ConnectionForm reducer
 *
 */
import { ADD_USER, ADD_USER_SUCCESS, ADD_USER_ERROR, CLEAR_DATA } from './constants';

export const initialState = {
  loading: false,
  error: '',
  list: [],
  message: '',
};

/* eslint-disable default-case, no-param-reassign */
const ConnectionFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, loading: true, searchText: action.params.searchText };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.response.data,
        message: initialState.message,
      };
    case CLEAR_DATA:
      return {
        ...state,
        loading: initialState.loading,
        error: initialState.error,
        list: initialState.list,
        message: initialState.message,
      };
    default:
      return state;
  }
};

export default ConnectionFormReducer;
