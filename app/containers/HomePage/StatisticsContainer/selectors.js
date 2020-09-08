import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the StatisticsContainer state domain
 */

const selectStatisticsContainerDomain = state =>
  state.statisticsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StatisticsContainer
 */

const makeSelectStatisticsContainer = () =>
  createSelector(
    selectStatisticsContainerDomain,
    substate => substate,
  );

export default makeSelectStatisticsContainer;
export { selectStatisticsContainerDomain };
