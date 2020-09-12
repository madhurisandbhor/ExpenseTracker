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
// import { EXPENSE_LABELS } from '../constants';

const Container = styled.div`
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
        },
        scaleLabel: {
          display: false,
          labelString: 'Month',
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

        scaleLabel: {
          display: true,
          labelString: 'Expense Amount',
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: tooltipItem => customTooltip(tooltipItem),
      // hide the title,
      // title: () => '',
    },
  },
};

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
  expenseData.forEach(item => {
    newExpenseDataByYear[item.year] = item.totalAmount;
  });

  const expenseByData = () => {
    if (expenseBy === 'yearly') return newExpenseDataByYear;
    if (expenseBy === 'monthly') return expenseDataPerMonth;
    return expenseDataPerWeek;
  };

  const data = {
    labels: expenseByData() ? getLabels(expenseByData()) : ['No data'],
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
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
        data: getData(expenseByData()),
      },
    ],
  };

  return (
    <Container>
      <ExpenseBySelect expenseBy={expenseBy} setExpenseBy={setExpenseBy} />
      <Line data={data} options={options} />
    </Container>
  );
};

ExpensePerDayWidget.propTypes = {
  expenseData: PropTypes.array.isRequired,
  setExpenseBy: PropTypes.func.isRequired,
  expenseBy: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default (memo, withTheme)(ExpensePerDayWidget);
