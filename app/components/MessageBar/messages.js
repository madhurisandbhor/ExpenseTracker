/*
 * MessageBar Messages
 *
 * This contains all the text for the MessageBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MessageBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MessageBar component!',
  },
});
