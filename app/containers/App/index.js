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
import TestPage from 'containers/TestPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import ExpenseList from 'containers/ExpenseList/Loadable';
import Header from 'components/Header';
import theme from './Theme';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const AppContainer = styled.div`
  margin: 0.8rem;
  width: 99%;
  height: 100%;
  margin-top: 6.5rem;
`;

export default function App() {
  return (
    // Make sure the Material stylesheet is placed above your own
    // styles so you can overwrite them
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Helmet
              titleTemplate="%s - Expense Tracker"
              defaultTitle="Expense Tracker"
            >
              <meta name="description" content="Expense tracker application" />
            </Helmet>
            <Header />
            <AppContainer>
              <Switch>
                <Route path="/overview" component={HomePage} />
                <Route path="/expensesList" component={ExpenseList} />
                <Route path="/about" component={TestPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/" component={RegisterPage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </AppContainer>
            <GlobalStyle />
          </AppWrapper>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
