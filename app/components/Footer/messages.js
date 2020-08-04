/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Footer';

export default defineMessages({
  aboutMessage: {
    id: `${scope}.about.message`,
    
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `By Madhuri.`,
  },
});
