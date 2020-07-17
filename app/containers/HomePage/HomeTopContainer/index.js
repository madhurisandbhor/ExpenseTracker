/**
 *
 * HomeTopContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

const ExpenseByWrapper = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const WidgetCard = withStyles(theme => ({
  root: {
    position: 'relative',
    padding: '30px 20px 20px 20px',
    height: '250px',
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
  const [expenseBy, setExpenseBy] = useState('monthly');

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
        {/* <HelpButton /> */}
        {/* <ExpandButton /> */}
        {/* {loading ? (
          <LoadingIndicator />
        ) : ( */}
        <ExpenseByWrapper>
          <Select
            id="expense_distribution"
            value={expenseBy}
            style={{ width: '10ch' }}
            inputProps={{}}
            onChange={event => setExpenseBy(event.target.value)}
          >
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </ExpenseByWrapper>
        <ExpensePerDayWidget expenseData={expenseByData()} />
        {/* )}
        {!loading && (
          <MetricDonutTitle>Out of Stock Distribution</MetricDonutTitle>
        )} */}
      </WidgetCard>
      <WidgetCard
        style={{
          paddingTop: '22px',
          width: '300px',
        }}
      >
        {/* <HelpButton /> */}
        {/* <ExpandButton /> */}
        {/* {loading ? (
          <LoadingIndicator />
        ) : ( */}
        <MetricDonut
          doughnutData={percentage}
          // graphClickEvent={graphClickEvent}
          dataType="MonthlyExpense"
        />
        {/* )} */}
      </WidgetCard>
      <WidgetCard>
        {/* <HelpButton /> */}
        {/* <ExpandButton /> */}
        {/* {loading ? (
          <LoadingIndicator />
        ) : (
          <AvailabilityDistributionWidget
            availabilityDistribution={nbOffersByNbDays}
            graphClickEvent={graphClickEvent}
            widgetType={WIDGET_TYPE.AVAILABILITY_DISTRIBUTION}
          />
        )}
        {!loading && (
          <MetricDonutTitle>Availability Distribution</MetricDonutTitle>
        )} */}
      </WidgetCard>
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
