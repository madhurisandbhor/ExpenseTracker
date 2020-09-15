/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.App || initialState;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData,
  );

export default makeSelectCurrentUser;
