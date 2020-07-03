/*
 * AddExpensesForm Messages
 *
 * This contains all the text for the AddExpensesForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddExpensesForm';

export default defineMessages({
  addHeader: {
    id: `${scope}.addHeader`,
    defaultMessage: 'Add Expense',
  },
  updateHeader: {
    id: `${scope}.updateHeader`,
    defaultMessage: 'Update Expense',
  },
});
