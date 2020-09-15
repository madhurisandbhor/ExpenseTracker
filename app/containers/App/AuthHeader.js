import React, { useContext } from 'react';
import Header from 'components/Header';
import { InfoContext } from './InfoContext';

const AuthHeader = () => {
  const { info } = useContext(InfoContext);

  if (window.location.pathname === '/connect' || info.isLoggedIn === false)
    return null;
  return <Header />;
};

export default AuthHeader;
