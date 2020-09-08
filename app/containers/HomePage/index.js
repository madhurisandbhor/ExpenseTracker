/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Paper from '@material-ui/core/Paper';
import Footer from 'components/Footer';
import Wrapper from './Wrapper';
import reducer from './reducer';
import saga from './saga';
import StatisticsContainer from './StatisticsContainer/Loadable';

const key = 'home';

const TopContainer = styled.div`
  color: ${props => props.theme.palette.primary.dark};
  // padding: 2rem;
  height: 40%;
  margin-bottom: 1rem;
`;

const BottomContainer = styled.div`
  height: 60%;
`;

const Info = styled.div`
  padding: 0.8rem;
`;

export function HomePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Expense tracker application" />
      </Helmet>
      <Wrapper>
        <TopContainer>
          <Paper>
            <Info>Your total expenses this year : €1900 </Info>
            <Info>You owe €67 to Prasad</Info>
            <Info>Prasad owes you €160 </Info>
            <Info>click here to... </Info>
          </Paper>
        </TopContainer>
        <BottomContainer>
          <StatisticsContainer />
        </BottomContainer>
      </Wrapper>
      <Footer />
    </>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(HomePage);
