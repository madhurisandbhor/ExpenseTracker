import React from 'react';
// import PropTypes from 'prop-types';
import Header from 'components/Header';

// eslint-disable-next-line react/prop-types
const AuthHeader = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Header />;
  }
  return <div />;
};

export default AuthHeader;
