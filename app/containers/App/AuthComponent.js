import React from 'react';
// import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const AuthComponent = ({ isLoggedIn, component: Component, props }) => {
  if (isLoggedIn) {
    return <Component {...props} />;
  }
  return null;
};

export default AuthComponent;
