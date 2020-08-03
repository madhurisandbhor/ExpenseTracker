/**
 *
 * ConnectionForm
 *
 */

import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectConnectionForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import UserContext from '../../utils/UserContext';
import logo from '../../images/logo2.png';
import Register from './Register';
import Login from './Login';

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

export function ConnectionForm(props) {
  useInjectReducer({ key: 'ConnectionForm', reducer });
  useInjectSaga({ key: 'ConnectionForm', saga });

  const { localState, setLocalState } = useContext(UserContext);
  const [isRegister, setIsRegister] = useState(false);

  const onSignUp = () => {
  };

  const onLogin = () => {
    setLocalState({ ...localState, isLoggedIn: true });
    props.history.push('/overview');
  };

  useEffect(() => {
    setLocalState({ ...localState, isLoggedIn: false });
  }, []);

  const onLoginLink = () => {
    setIsRegister(false);
  };
  const onRegisterLink = () => {
    setIsRegister(true);
  };

  return (
    <>
      <AppHeader isLoggedIn={!localState.isLoggedIn}>
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
    </>
  );
}

ConnectionForm.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ConnectionForm: makeSelectConnectionForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(ConnectionForm);
