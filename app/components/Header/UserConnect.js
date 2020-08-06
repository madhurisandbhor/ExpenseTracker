import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import DraftsIcon from '@material-ui/icons/Drafts';
import UserContext from '../../utils/UserContext';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserWrapper = styled.div`
  margin-right: 1rem;
`;

const WelcomeText = styled.span`
  color: ${props => props.theme.tracker.white};
  margin-right: 1rem;
`;

const ButtonWrapper = withStyles(theme => ({
  root: {
    color: theme.tracker.white,
    padding: '.5rem',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}))(IconButton);

const IconWrapper = withStyles(() => ({
  root: {
    fontSize: '3.5rem',
  },
}))(AccountCircleIcon);

const UserConnect = ({ open, anchorEl, onClose, handleClickOpen, history }) => {
  const { localState, setLocalState } = useContext(UserContext);

  const onSignout = () => {
    setLocalState({ ...localState, isLoggedIn: false, username: '' });
    history.push('/');
  };

  return (
    <Wrapper>
      <WelcomeText>Hello, {localState.username}</WelcomeText>
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
        <List component="nav" aria-label="user profile">
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="sign out">
          <ListItem button onClick={onSignout}>
            <ListItemText style={{ textAlign: 'center' }} primary="Sign Out" />
          </ListItem>
        </List>
      </Popover>
    </Wrapper>
  );
};

UserConnect.propTypes = {
  handleClickOpen: PropTypes.func,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  history: PropTypes.object.isRequired,
};

export default withRouter(UserConnect);
