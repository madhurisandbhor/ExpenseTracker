/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import ConnectionForm from 'containers/ConnectionForm/Loadable';
import ExpenseList from 'containers/ExpenseList/Loadable';
import AuthHeader from './AuthHeader';
import PrivateRoute from './PrivateRoute';
import theme from './Theme';
import GlobalStyle from '../../global-styles';
import { InfoProvider } from './InfoContext';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  width: 100%;
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
function App() {
  return (
    // Make sure the Material stylesheet is placed above your own
    // styles so you can overwrite them
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <InfoProvider>
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
              <AuthHeader />
              <AppContainer>
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute path="/expensesList" component={ExpenseList} />
                  <PrivateRoute path="/about" component={AboutPage} />
                  <Route path="/connect" component={ConnectionForm} />
                  <Route component={NotFoundPage} />
                </Switch>
              </AppContainer>
              <GlobalStyle />
            </AppWrapper>
          </InfoProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;
