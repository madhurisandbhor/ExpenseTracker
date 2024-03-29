import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';
import NavBar from './NavBar';
import NavItem from './NavItem';
import HeaderLink from './HeaderLink';
import UserConnect from './UserConnect';
import logo from '../../images/logo2.png';

const Header = () => {
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

  return (
    <Wrapper>
      <NavBar>
        <NavItem>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{
                width: '130px',
                margin: '0 2rem 0 1rem',
              }}
            />
          </Link>
        </NavItem>
        <NavItem>
          <HeaderLink exact to="/">
            Overview
          </HeaderLink>
        </NavItem>
        <NavItem>
          <HeaderLink to="/expensesList">Expense List</HeaderLink>
        </NavItem>
        <NavItem>
          <HeaderLink to="/about">About</HeaderLink>
        </NavItem>
      </NavBar>
      <UserConnect handleClickOpen={handleClickOpen} {...params} />
    </Wrapper>
  );
};

export default React.memo(Header);
