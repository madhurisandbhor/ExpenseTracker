import React from 'react';
import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper';
import NavBar from './NavBar';
import NavItem from './NavItem';
import HeaderLink from './HeaderLink';
import messages from './messages';

function Header() {
  return (
    <Wrapper>
      <NavBar>
        <NavItem>
          <HeaderLink exact to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
        </NavItem>
        {/* <NavItem>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
        </NavItem> */}
        <NavItem>
          <HeaderLink to="/about">
            <FormattedMessage {...messages.about} />
          </HeaderLink>
        </NavItem>
      </NavBar>
    </Wrapper>
  );
}

export default Header;
