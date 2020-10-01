/**
 *
 * StatisticsContainer
 *
 */

import React, {
  memo,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
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
import makeSelectStatisticsContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import MetricDonut from './MetricDonut';
import ExpensePerDayWidget from './ExpensePerDayWidget';
import LatestExpenseList from './LatestExpenseList/Loadable';
import { loadStatisticsData as loadStatisticsDataAction } from './actions';
import { InfoContext } from '../../App/InfoContext';

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
  color: ${props=>props.theme.tracker.lightTextColor};
`;

const WidgetCard = withStyles(theme => ({
  root: {
    position: 'relative',
    padding: '25px 20px 8px 20px',
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

const StatisticsContainer = ({ statisticsContainer, loadStatisticsData }) => {
  useInjectReducer({ key: 'statisticsContainer', reducer });
  useInjectSaga({ key: 'statisticsContainer', saga });
  const [loading, setLoading] = useState(true);
  const [doughnutData, setDoughnutData] = useState([]);
  const [perDayWidgetData, setPerDayWidgetData] = useState([]);
  const [expenseBy, setExpenseBy] = useState({
    type: 'yearly',
    year: '',
    weekStartDate: '',
    weekEndDate: '',
  });
  const { info } = useContext(InfoContext);
  const { userId } = info;
  const { dataByCategory, dataByDays } = statisticsContainer.expenseData;

  const updateExpenseByValue = useCallback(args => {
    setExpenseBy({
      ...expenseBy,
      type: args.type,
      year: args.year,
      weekStartDate: args.weekStartDate,
      weekEndDate: args.weekEndDate,
    });
  }, []);

  useEffect(() => {
    if (userId) loadStatisticsData({ userId, expenseBy });
  }, [userId, expenseBy]);

  useEffect(() => {
    setDoughnutData(dataByCategory);
    setPerDayWidgetData(dataByDays);
    setLoading(statisticsContainer.loading);
  }, [dataByCategory, dataByDays]);

  return (
    <TopWidgetsContainer>
      <WidgetCard>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <ExpensePerDayWidget
            expenseData={perDayWidgetData}
            expenseBy={expenseBy}
            setExpenseBy={updateExpenseByValue}
          />
        )}
        <BlockTitle>Expenses Distribution</BlockTitle>
      </WidgetCard>
      <WidgetCard>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <MetricDonut doughnutData={doughnutData} />
        )}
        <BlockTitle>Category Distribution</BlockTitle>
      </WidgetCard>
      <WidgetCard>
        {loading ? <LoadingIndicator /> : <LatestExpenseList />}
        <BlockTitle>Latest Expenses</BlockTitle>
      </WidgetCard>
    </TopWidgetsContainer>
  );
};

StatisticsContainer.propTypes = {
  statisticsContainer: PropTypes.object.isRequired,
  loadStatisticsData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  statisticsContainer: makeSelectStatisticsContainer(),
});

const mapDispatchToProps = dispatch => ({
  loadStatisticsData: params => dispatch(loadStatisticsDataAction(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StatisticsContainer);
