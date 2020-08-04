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
import LatestExpenseList from './LatestExpenseList/Loadable';
import { loadCategoryStatistics as loadCategoryStatisticsAction } from './actions';

const TopWidgetsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const BlockTitle = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
`;

const WidgetCard = withStyles(theme => ({
  root: {
    position: 'relative',
    padding: '8px 20px 8px 20px',
    height: '300px',
    width: '468px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    '&:nth-child(2)': {
      paddingTop: '22px',
      width: '290px',
    },
  },
}))(Card);

const HomeTopContainer = ({ homeTopContainer, loadCategoryStatistics }) => {
  useInjectReducer({ key: 'homeTopContainer', reducer });
  useInjectSaga({ key: 'homeTopContainer', saga });
  // const { profileId, loadAvailabilityDistribution } = this.props;
  const [loading, setLoading] = useState(true);
  const [doughnutData, setDoughnutData] = useState({});

  useEffect(() => {
    loadCategoryStatistics();
  }, []);

  useEffect(() => {
    setDoughnutData(homeTopContainer.data);
    setLoading(homeTopContainer.loading);
  }, [homeTopContainer.data]);

  return (
    <TopWidgetsContainer>
      <WidgetCard>
        <ExpensePerDayWidget />
        <BlockTitle>Expenses Distribution</BlockTitle>
      </WidgetCard>
      <WidgetCard>
        {loading ? (
          <LoadingIndicator />
        ) : (
            <MetricDonut
              doughnutData={doughnutData}
            // graphClickEvent={graphClickEvent}
            // dataType="TotalCategoriesAggrAmount"
            />
          )}
        <BlockTitle>Category Distribution</BlockTitle>
      </WidgetCard>
      <WidgetCard>
        <LatestExpenseList />
      </WidgetCard>
    </TopWidgetsContainer>
  );
};

HomeTopContainer.propTypes = {
  homeTopContainer: PropTypes.object.isRequired,
  loadCategoryStatistics: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeTopContainer: makeSelectHomeTopContainer(),
});

const mapDispatchToProps = dispatch => ({
  loadCategoryStatistics: params =>
    dispatch(loadCategoryStatisticsAction(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomeTopContainer);
