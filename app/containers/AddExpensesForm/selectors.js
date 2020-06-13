import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addExpensesForm state domain
 */

const selectAddExpensesFormDomain = state =>
  state.addExpensesForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddExpensesForm
 */

const makeSelectAddExpensesForm = () =>
  createSelector(
    selectAddExpensesFormDomain,
    substate => substate,
  );

export default makeSelectAddExpensesForm;
export { selectAddExpensesFormDomain };
