/**
 *
 * RegisterPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  width: 40%;
  background-color: #fff;
  border-radius: 0.4rem;
`;

const SignUpText = styled.div`
  text-align: center;
`;

const FieldWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = withStyles(theme => ({
  root: {
    width: '20ch',
    color: '#fff',
    background: theme.palette.primary.main,
    margin: '.8rem',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}))(Button);

export function RegisterPage() {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSignup = () => { };
  const onCancel = () => { };

  return (
    <Wrapper>
      <SignUpText>Sign Up</SignUpText>
      <FieldWrapper>
        <TextField
          id="name"
          label="Full Name"
          type="text"
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            maxLength: 80,
          }}
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            maxLength: 80,
          }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="username"
          label="Username"
          type="text"
          required
          style={{ width: '15ch' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 0,
            maxLength: 12,
          }}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          style={{ width: '15ch' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 0,
            maxLength: 12,
          }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div
          style={{
            alignSelf: 'center',
          }}
        >
          <ButtonWrapper type="button" onClick={onSignup}>
            Sign Up
          </ButtonWrapper>
          <ButtonWrapper type="button" onClick={onCancel}>
            Cancel
          </ButtonWrapper>
        </div>
        <div
          style={{
            alignSelf: 'center',
          }}
        >
          <span>Already user?</span>
          <Link to="/login"> Login </Link>
        </div>
      </FieldWrapper>
    </Wrapper>
  );
}

RegisterPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
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
)(RegisterPage);
