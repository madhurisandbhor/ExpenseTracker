import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ConnectionForm state domain
 */

const selectConnectionFormDomain = state => state.ConnectionForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConnectionForm
 */

const makeSelectConnectionForm = () =>
  createSelector(
    selectConnectionFormDomain,
    substate => substate,
  );

export default makeSelectConnectionForm;
export { selectConnectionFormDomain };
