/**
 *
 * Asynchronously loads the component for ExpenseList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
