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

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Register = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  return (
    <>
      <SignUpText>Register</SignUpText>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSignUp({ firstName, lastName, emailId, password });
        }}
      >
        <FieldWrapper>
          <Name>
            <TextFieldWrapper
              id="name"
              label="First Name"
              type="text"
              style={{ width: '20ch' }}
              required
              inputProps={{
                maxLength: 20,
              }}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextFieldWrapper
              id="lastname"
              label="Lastname"
              type="text"
              style={{ width: '20ch' }}
              inputProps={{
                min: 0,
                maxLength: 20,
              }}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Name>
          <TextFieldWrapper
            id="email"
            label="Email"
            type="email"
            fullWidth
            required
            inputProps={{
              maxLength: 40,
            }}
            value={emailId}
            onChange={e => setEmailId(e.target.value)}
          />

          <TextFieldWrapper
            id="password"
            label="Password"
            type="password"
            required
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
            <ButtonWrapper type="submit">Sign Up</ButtonWrapper>
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
