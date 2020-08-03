/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TestPage from 'containers/TestPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ConnectionForm from 'containers/ConnectionForm/Loadable';
import ExpenseList from 'containers/ExpenseList/Loadable';
import AuthHeader from './AuthHeader';
import theme from './Theme';
import GlobalStyle from '../../global-styles';
import UserContext from '../../utils/UserContext';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  position: relative;
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 6.5rem;
  z-index: 2;
`;
// eslint-disable-next-line react/prop-types

export default function App() {
  const initState = {
    isLoggedIn: false,
  };
  const [localState, setLocalState] = useState(initState);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );

  return (
    // Make sure the Material stylesheet is placed above your own
    // styles so you can overwrite them
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ localState, setLocalState }}>
            <AppWrapper>
              <Helmet
                titleTemplate="%s - Expense Tracker"
                defaultTitle="Expense Tracker"
              >
                <meta
                  name="description"
                  content="Expense tracker application"
                />
              </Helmet>
              <AuthHeader isLoggedIn={localState.isLoggedIn} />
              <AppContainer>
                <Switch>
                  <PrivateRoute path="/overview" component={HomePage} />
                  <PrivateRoute path="/expensesList" component={ExpenseList} />
                  <PrivateRoute path="/about" component={TestPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/" component={ConnectionForm} />
                  <Route path="" component={NotFoundPage} />
                </Switch>
              </AppContainer>
              <GlobalStyle />
            </AppWrapper>
          </UserContext.Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
