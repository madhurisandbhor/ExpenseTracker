import React from 'react';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import Img from 'components/Img';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Wrapper from './Wrapper';
import NavBar from './NavBar';
import NavItem from './NavItem';
import HeaderLink from './HeaderLink';
import messages from './messages';
import UserConnect from './UserConnect';
import logo from '../../images/expense_tracker_logo2.png';

const Header = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const params = {
    onClose: handleClose,
    open,
    anchorEl,
    dialogTitle: '',
  };

  // const redirectHome = () => {
  //   props.history.push('/');
  // };

  return (
    <Wrapper>
      <NavBar>
        <NavItem>
          <span
            style={{
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '2rem',
              margin: '0 1.6rem',
            }}
            // role="button"
            // tabIndex="0"
            // onClick={() => { }}
            // onKeyPress={redirectHome}
          >
            <AccountBalanceIcon
              style={{
                fontWeight: 'bold',
                fontSize: '3rem',
                marginRight: '.8rem',
              }}
            />
            Expense Tracker
          </span>
        </NavItem>
        <NavItem>
          <HeaderLink to="/overview">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
        </NavItem>
        <NavItem>
          <HeaderLink to="/expensesList">
            <FormattedMessage {...messages.expenseList} />
          </HeaderLink>
        </NavItem>
        <NavItem>
          <HeaderLink to="/about">
            <FormattedMessage {...messages.about} />
          </HeaderLink>
        </NavItem>
      </NavBar>
      <UserConnect handleClickOpen={handleClickOpen} {...params} />
    </Wrapper>
  );
};

export default React.memo(Header);
