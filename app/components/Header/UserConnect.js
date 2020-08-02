import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

const UserWrapper = styled.div`
  margin-right: 1rem;
`;

const ButtonWrapper = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    padding: '.5rem',
  },
}))(IconButton);

const IconWrapper = withStyles(() => ({
  root: {
    fontSize: '3.5rem',
  },
}))(AccountCircleIcon);

const UserConnect = ({ open, anchorEl, onClose, handleClickOpen }) => (
  <>
    <UserWrapper onClick={handleClickOpen}>
      <ButtonWrapper aria-label="UserIcon">
        <IconWrapper />
      </ButtonWrapper>
    </UserWrapper>
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div
        style={{
          width: '250px',
          height: '70px',
          fontSize: '14px',
          margin: '2rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Button variant="outlined">Sign In</Button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '.8rem' }}>
          <span>New user ? </span>
          <Link to="/">Register here</Link>
        </div>
      </div>
    </Popover>
  </>
);

UserConnect.propTypes = {
  handleClickOpen: PropTypes.func,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.number,
  onClose: PropTypes.func,
};

export default UserConnect;
