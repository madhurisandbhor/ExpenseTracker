import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the expenseList state domain
 */

const selectExpenseListDomain = state => state.expenseList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExpenseList
 */

const makeSelectExpenseList = () =>
  createSelector(
    selectExpenseListDomain,
    substate => substate,
  );

export default makeSelectExpenseList;
export { selectExpenseListDomain };
