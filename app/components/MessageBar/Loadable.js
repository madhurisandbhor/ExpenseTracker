/**
 *
 * Asynchronously loads the component for MessageBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
