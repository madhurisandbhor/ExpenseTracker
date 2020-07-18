/**
 *
 * HomeTopContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card/Card';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingIndicator from 'components/LoadingIndicator';
import makeSelectHomeTopContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import MetricDonut from './MetricDonut';
import ExpensePerDayWidget from './ExpensePerDayWidget';
import ExpenseBySelect from './ExpenseBySelect';

const TopWidgetsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;
`;

const MetricDonutTitle = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
`;

const WidgetCard = withStyles(theme => ({
  root: {
    position: 'relative',
    padding: '30px 20px 20px 20px',
    height: '300px',
    width: '468px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
}))(Card);

const HomeTopContainer = () => {
  useInjectReducer({ key: 'homeTopContainer', reducer });
  useInjectSaga({ key: 'homeTopContainer', saga });
  // const { profileId, loadAvailabilityDistribution } = this.props;

  useEffect(() => {
    // loadAvailabilityDistribution(profileId);
  }, []);

  const percentage = [10, 20, 30];
  const [expenseBy, setExpenseBy] = useState('yearly');

  const expenseDataPerYear = {
    2020: 10000,
    2019: 2000,
    2018: 26000,
    2017: 5000,
    2016: 5600,
  };

  const expenseDataPerMonth = {
    Jan: 1000,
    Feb: 200,
    Mar: 260,
    Apr: 5000,
    May: 100,
    Jun: 10,
    Jul: 1000,
    Aug: 0,
    Sep: 960,
    Oct: 100,
    Nov: 790,
    Dec: 10,
  };

  const expenseDataPerWeek = {
    Sun: 500,
    Mon: 20,
    Tue: 260,
    Wed: 50,
    Thu: 67,
    Fri: 0,
    Sat: 99,
  };

  const expenseByData = () => {
    if (expenseBy === 'yearly') return expenseDataPerYear;
    if (expenseBy === 'monthly') return expenseDataPerMonth;
    return expenseDataPerWeek;
  };

  return (
    <TopWidgetsContainer>
      <WidgetCard>
        {/* {loading ? (
          <LoadingIndicator />
        ) : ( */}
        <ExpenseBySelect expenseBy={expenseBy} setExpenseBy={setExpenseBy} />
        <ExpensePerDayWidget expenseData={expenseByData()} />
        <MetricDonutTitle>Expenses Distribution</MetricDonutTitle>
      </WidgetCard>
      <WidgetCard
        style={{
          paddingTop: '22px',
          width: '300px',
        }}
      >
        {/* {loading ? (
          <LoadingIndicator />
        ) : ( */}
        <MetricDonut
          doughnutData={percentage}
          // graphClickEvent={graphClickEvent}
          dataType="MonthlyExpense"
        />
        <MetricDonutTitle>Category Distribution</MetricDonutTitle>
        {/* )} */}
      </WidgetCard>
      <WidgetCard />
    </TopWidgetsContainer>
  );
};

HomeTopContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeTopContainer: makeSelectHomeTopContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomeTopContainer);
