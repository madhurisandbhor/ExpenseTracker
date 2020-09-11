/**
 *
 * ConnectionForm
 *
 */

import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MessageBar from 'components/MessageBar';
import makeSelectConnectionForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import UserContext from '../../utils/UserContext';
import logo from '../../images/logo2.png';
import Register from './Register';
import Login from './Login';
import {
  addUser as addUserAction,
  userLogin as userLoginAction,
  clearData as clearDataAction,
} from './actions';

const AppHeader = styled.div`
  width: 100%;
  min-height: 450px;
  background: #f34925;
  z-index: 1;
  position: absolute;
  top: 0;
  clip-path: polygon(100% 0, 100% 37%, 0 89%, 0 0);
`;

const Image = styled.img`
  position: absolute;
  top: 19%;
  left: 49%;
  transform: translate(-50%, -99%);
  width: 230px;
`;

const Wrapper = styled.div`
  margin: 3.5rem auto;
  padding: 2rem 6.5rem;
  width: 40%;
  background-color: #fff;
  border-radius: 0.4rem;
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Links = styled.div`
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const LinkText = styled.span`
  color: red;
  margin-left: 0.8rem;
`;

export function ConnectionForm({
  addUser,
  userLogin,
  history,
  connectionData,
  clearData,
}) {
  useInjectReducer({ key: 'ConnectionForm', reducer });
  useInjectSaga({ key: 'ConnectionForm', saga });

  const { localState, setLocalState } = useContext(UserContext);
  const [isRegister, setIsRegister] = useState(localState.isRegister);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('info');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const clear = () => {
    setMessage('');
    setOpen(false);
    clearData();
  };

  const validate = newData => {
    const msg = [];
    if (!newData.firstName) msg.push('first name');
    if (!newData.password) msg.push('password');
    if (!newData.emailId) msg.push('email id');
    if (msg.length !== 0) {
      msg.unshift('Invalid');
      return msg.join(' ');
    }
    return msg;
  };

  const onSignUp = useCallback(params => {
    const msg = validate(params);
    if (msg.length !== 0) {
      setMessage(msg);
      setOpen(true);
      setSeverity('error');
    } else {
      addUser(params);
    }
  }, []);

  const onLogin = useCallback(params => {
    if (!params.username && !params.password) {
      setMessage('Please enter valid email id and password');
      setOpen(true);
      setSeverity('error');
    } else {
      userLogin(params);
    }
  }, []);

  const onLoginLink = () => {
    setIsRegister(false);
    setLocalState({ ...localState, isRegister: false });
  };

  const onRegisterLink = () => {
    setIsRegister(true);
    setLocalState({ ...localState, isRegister: true });
  };

  useEffect(() => {
    setLocalState({ ...localState, isLoggedIn: false });
  }, []);

  useEffect(() => {
    if (connectionData.error || connectionData.message) {
      const msg = connectionData.error
        ? connectionData.error
        : connectionData.message;
      const alertType = connectionData.error ? 'error' : 'success';
      setMessage(msg);
      setOpen(true);
      setSeverity(alertType);
    } else {
      setMessage('');
      setOpen(false);
    }
  }, [connectionData.message, connectionData.error]);

  useEffect(() => {
    if (connectionData.url === '/login' && !connectionData.error) {
      setLocalState({
        isRegister: false,
        isLoggedIn: true,
        username: connectionData.username,
        userId: connectionData.userId,
      });
      clear();
      history.push('/overview');
    }
    if (connectionData.url === '/register' && !connectionData.error) {
      onLoginLink();
    }
  }, [connectionData.url]);

  return (
    <>
      <AppHeader>
        <Image src={logo} alt="logo" />
      </AppHeader>
      <Wrapper>
        {isRegister && <Register onSignUp={onSignUp} />}
        {!isRegister && <Login onLogin={onLogin} />}
        {isRegister && (
          <LinksWrapper>
            <span>Already a user?</span>
            <Links
              onClick={onLoginLink}
              onKeyPress={onLoginLink}
              role="link"
              tabIndex={0}
            >
              <LinkText>Login</LinkText>
            </Links>
          </LinksWrapper>
        )}
        {!isRegister && (
          <LinksWrapper>
            <span>New user?</span>
            <Links
              onClick={onRegisterLink}
              onKeyPress={onRegisterLink}
              role="link"
              tabIndex={0}
            >
              <LinkText>Create an account</LinkText>
            </Links>
          </LinksWrapper>
        )}
      </Wrapper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MessageBar onClose={handleClose} severity={severity}>
          {message}
        </MessageBar>
      </Snackbar>
    </>
  );
}

ConnectionForm.propTypes = {
  history: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
  connectionData: PropTypes.object.isRequired,
  clearData: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  connectionData: makeSelectConnectionForm(),
});

const mapDispatchToProps = dispatch => ({
  addUser: params => dispatch(addUserAction(params)),
  userLogin: params => dispatch(userLoginAction(params)),
  clearData: () => dispatch(clearDataAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(ConnectionForm);
