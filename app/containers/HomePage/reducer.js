/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import {
  LOAD_TOTAL_EXPENSE,
  LOAD_TOTAL_EXPENSE_SUCCESS,
  LOAD_TOTAL_EXPENSE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  currYear: 0,
  currMonth: 0,
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOTAL_EXPENSE:
      return { ...state, loading: true };
    case LOAD_TOTAL_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        currYear: action.payload.currYear,
        currMonth: action.payload.currMonth,
      };
    case LOAD_TOTAL_EXPENSE_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default homeReducer;
