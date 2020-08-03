import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginText = styled.div`
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

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <LoginText>Login</LoginText>
      <form onSubmit={onLogin}>
        <FieldWrapper>
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
            <ButtonWrapper type="submit" onClick={onLogin}>
              Login
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

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
