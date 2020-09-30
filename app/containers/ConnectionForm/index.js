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
import Snackbar from '@material-ui/core/Snackbar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MessageBar from 'components/MessageBar/Loadable';
import makeSelectConnectionForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import { InfoContext } from '../App/InfoContext';
// import logo from '../../images/ExpenseTrackerLogo.png';
import Register from './Register';
import Login from './Login';
import {
  addUser as addUserAction,
  userLogin as userLoginAction,
  clearData as clearDataAction,
} from './actions';

const LogoWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgb(243,73,37);
  background: linear-gradient(180deg, rgba(243,73,37,1) 0%, rgba(105,48,109,1) 100%);
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;

const Image = styled.img`
  width: 230rem;
`;

const Title = styled.span`
  margin-left: 1rem;
  line-height: 1.6rem;
  font-size: 2.8rem;
  color: ${props => props.theme.tracker.white};
  font-weight: 500;
  font-weight: bold;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  top: 0;
  margin-top: 6rem;
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
  position: relative;
  margin: 3.5rem auto;
  padding: 2rem 6.5rem;
  width: 40%;
  background-color: ${props=>props.theme.tracker.white};
  border-radius: 0.4rem;
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
  const { info, setInfo } = useContext(InfoContext);
  const [isRegister, setIsRegister] = useState(info.isRegister);
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
    if (!params.emailId && !params.password) {
      setMessage('Please enter valid email id and password');
      setOpen(true);
      setSeverity('error');
    } else {
      userLogin(params);
    }
  }, []);

  const onLoginLink = () => {
    setIsRegister(false);
    setInfo({ ...info, isRegister: false });
  };

  const onRegisterLink = () => {
    setIsRegister(true);
    setInfo({ ...info, isRegister: true });
  };

  useEffect(() => {
    setInfo({ ...info, isLoggedIn: false });
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
      setInfo({
        isRegister: false,
        isLoggedIn: true,
        username: connectionData.username,
        userId: connectionData.userId,
      });
      clear();
      history.push('/');
    }
    if (connectionData.url === '/register' && !connectionData.error) {
      onLoginLink();
    }
  }, [connectionData.url]);

  return (
    <>
      <LogoWrapper>
        <Logo>
          {/* <Image src={logo} alt="logo" /> */}
          <Title>Expense Tracker</Title>
        </Logo>
      </LogoWrapper>
      <Wrapper>
        <Form>
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
        </Form>
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
