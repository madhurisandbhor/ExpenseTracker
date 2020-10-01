import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Header from 'components/Header';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  z-index: 2;
`;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authUser = () => {
    const token = Cookies.get('jwt');
    let isAuth;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.id) isAuth = true;
      else isAuth = false;
    } else {
      // console.log('jwt cookie not available');
      isAuth = false;
    }
    return isAuth;
  };

  return (
    <Route
      {...rest}
      render={props => {
        const isUserAuth = authUser();
        if (!isUserAuth) {
          return <Redirect to={{ pathname: '/connect' }} />;
        }
        return (
          <>
            <Header />
            <AppContainer>
              <Component {...props} />
            </AppContainer>
          </>
        );
      }}
    />
  );
};

export default PrivateRoute;
