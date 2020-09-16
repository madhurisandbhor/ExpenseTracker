/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Footer from 'components/Footer';
import LoadingIndicator from 'components/LoadingIndicator';
import Wrapper from './Wrapper';
import reducer from './reducer';
import saga from './saga';
import { loadTotalExpense as loadTotalExpenseAction } from './actions';
import StatisticsContainer from './StatisticsContainer/Loadable';
import { makeSelectHome } from './selectors';
import { InfoContext } from '../App/InfoContext';

const key = 'home';

const TopContainer = styled.div`
  color: ${props => props.theme.palette.primary.dark};
  height: 40%;
  margin-bottom: 1rem;
`;

const BottomContainer = styled.div`
  height: 60%;
`;

const InfoContainer = styled.div`
  background: ${props => props.theme.tracker.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  align-items: center;
`;

const Text = styled.div`
  font-size: 1.4rem;
  padding: 0.5rem;
  border-bottom: 0.1rem solid ${props => props.theme.tracker.grey};
`;

const TotalAmount = styled.span`
  font-size: 2rem;
`;

export function HomePage({ loadTotalExpense, expenseData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { info } = useContext(InfoContext);
  const { userId } = info;
  const { currYear, currMonth, loading } = expenseData;

  useEffect(() => {
    if (userId) loadTotalExpense(userId);
  }, [userId]);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Expense tracker application" />
      </Helmet>
      <Wrapper>
        <TopContainer>
          <InfoContainer>
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Info>
                  <Text>Total Expenses this year</Text>
                  <TotalAmount>{currYear}€</TotalAmount>
                </Info>
                <Info>
                  <Text>Total Expenses this month</Text>
                  <TotalAmount>{currMonth}€</TotalAmount>
                </Info>
              </>
            )}
          </InfoContainer>
        </TopContainer>
        <BottomContainer>
          <StatisticsContainer />
        </BottomContainer>
      </Wrapper>
      <Footer />
    </>
  );
}

HomePage.propTypes = {
  loadTotalExpense: PropTypes.func.isRequired,
  expenseData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expenseData: makeSelectHome(),
});
const mapDispatchToProps = dispatch => ({
  loadTotalExpense: params => dispatch(loadTotalExpenseAction(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(HomePage);
