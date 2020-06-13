import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <div>
        <section>
          <FormattedMessage {...messages.aboutMessage} />
        </section>
        <section>
          <FormattedMessage {...messages.authorMessage} />
        </section>
      </div>
      <section>
        <LocaleToggle />
      </section>

    </Wrapper>
  );
}

export default Footer;
