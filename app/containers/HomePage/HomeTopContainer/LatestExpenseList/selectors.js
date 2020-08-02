import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the latestExpenseList state domain
 */

const selectLatestExpenseListDomain = state =>
  state.latestExpenseList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LatestExpenseList
 */

const makeSelectLatestExpenseList = () =>
  createSelector(
    selectLatestExpenseListDomain,
    substate => substate,
  );

export default makeSelectLatestExpenseList;
export { selectLatestExpenseListDomain };
