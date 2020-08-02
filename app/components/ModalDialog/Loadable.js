/**
 *
 * Asynchronously loads the component for ModalDialog
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
