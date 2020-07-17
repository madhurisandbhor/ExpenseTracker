import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeTopContainer state domain
 */

const selectHomeTopContainerDomain = state =>
  state.homeTopContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeTopContainer
 */

const makeSelectHomeTopContainer = () =>
  createSelector(
    selectHomeTopContainerDomain,
    substate => substate,
  );

export default makeSelectHomeTopContainer;
export { selectHomeTopContainerDomain };
