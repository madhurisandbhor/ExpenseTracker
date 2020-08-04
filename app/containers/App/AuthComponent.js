import React from 'react';
// import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const AuthComponent = ({ isLoggedIn, component: Component }) => {
  if (isLoggedIn) {
    return <Component />;
  }
  return null;
};

export default AuthComponent;
