/**
 *
 * Expense Per Day Widget
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import ExpenseBySelect from './ExpenseBySelect';
import NoDataMsg from './NoDataMsg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const options = {
  legend: {
    display: false,
  },
  layout: {
    padding: {
      left: 2,
      right: 5,
      top: 0,
      bottom: 0,
    },
  },
  animation: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          drawBorder: true,
          drawOnChartArea: false,
          display: true,
        },
        display: true,
        ticks: {
          beginAtZero: true,
          fontFamily: 'Josefin Sans, sans-serif',
        },
      },
    ],
    yAxes: [
      {
        display: true,
        gridLines: {
          drawBorder: true,
          drawOnChartArea: false,
          display: true,
        },
        ticks: {
          fontFamily: 'Josefin Sans, sans-serif',
        },
        scaleLabel: {
          display: true,
          labelString: 'Expense Amount',
          fontFamily: 'Josefin Sans, sans-serif',
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: tooltipItem => customTooltip(tooltipItem),
    },
    titleFontFamily: 'Josefin Sans, sans-serif',
    bodyFontFamily: 'Josefin Sans, sans-serif',
  },
};

export const customTooltip = tooltipItem => `expense - ${tooltipItem.yLabel}`;

const getLabels = data => Object.keys(data);

const getData = data => Object.values(data);

const ExpensePerDayWidget = ({
  theme,
  expenseData = [],
  expenseBy,
  setExpenseBy,
}) => {
  const newExpenseDataByYear = {};

  // convert data array into {year: amount} object
  if (expenseData.length > 0)
    expenseData.forEach(item => {
      newExpenseDataByYear[item.date] = item.totalAmount;
    });

  const data = {
    labels: newExpenseDataByYear
      ? getLabels(newExpenseDataByYear)
      : ['No data'],
    datasets: [
      {
        fill: true,
        lineTension: 0.1,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.dark,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: theme.palette.primary.main,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.primary.main,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: getData(newExpenseDataByYear),
      },
    ],
  };

  return (
    <Container>
      <ExpenseBySelect expenseBy={expenseBy} setExpenseBy={setExpenseBy} />
      {data.datasets[0].data.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <NoDataMsg> No data available</NoDataMsg>
      )}
    </Container>
  );
};

ExpensePerDayWidget.propTypes = {
  expenseData: PropTypes.array.isRequired,
  setExpenseBy: PropTypes.func.isRequired,
  expenseBy: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default (memo, withTheme)(ExpensePerDayWidget);
