/*
 *
 * HomeTopContainer reducer
 *
 */
import {
  LOAD_CATEGORY_STATISTICS,
  LOAD_CATEGORY_STATISTICS_SUCCESS,
  LOAD_CATEGORY_STATISTICS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeTopContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORY_STATISTICS:
      return { ...state, loading: true };
    case LOAD_CATEGORY_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case LOAD_CATEGORY_STATISTICS_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default homeTopContainerReducer;
