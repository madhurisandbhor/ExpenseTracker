import React from 'react';
import Header from 'components/Header';

const AuthHeader = () => {
  if (window.location.pathname === '/') return null;
  return <Header />;
};

export default AuthHeader;
