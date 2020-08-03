import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const TextFieldWrapper = withStyles(() => ({
  root: {
    marginBottom: '1rem',
  },
}))(TextField);

const Register = ({ onSignUp }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    <>
      <SignUpText>Register</SignUpText>
      <form onSubmit={onSignUp}>
        <FieldWrapper>
          <TextFieldWrapper
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            required
            inputProps={{
              maxLength: 80,
            }}
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <TextFieldWrapper
            id="email"
            label="Email"
            type="email"
            fullWidth
            required
            inputProps={{
              maxLength: 80,
            }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextFieldWrapper
            id="username"
            label="Username"
            type="text"
            required
            inputProps={{
              min: 0,
              maxLength: 12,
            }}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextFieldWrapper
            id="password"
            label="Password"
            type="password"
            required
            // style={{ width: '15ch' }}
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
            <ButtonWrapper type="submit" onClick={onSignUp}>
              Sign Up
            </ButtonWrapper>
            {/* <ButtonWrapper type="button" onClick={onCancel}>
              Cancel
            </ButtonWrapper> */}
          </div>
        </FieldWrapper>
      </form>
    </>
  );
};

Register.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default Register;
