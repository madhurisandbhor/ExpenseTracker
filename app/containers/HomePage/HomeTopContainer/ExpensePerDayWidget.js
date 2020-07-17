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

export const customTooltip = tooltipItem => `expense - ${tooltipItem.yLabel}`;

const getLabels = data => Object.keys(data);

const getData = data => Object.values(data);

const ExpensePerDayWidget = ({ expenseData, theme }) => {
  const data = {
    labels: expenseData ? getLabels(expenseData) : ['No data'],
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
        data: getData(expenseData),
      },
    ],
  };

  return (
    <Container>
      <Line data={data} options={options} />
    </Container>
  );
};

ExpensePerDayWidget.propTypes = {
  // graphClickEvent: PropTypes.func.isRequired,
  // dataType: PropTypes.string.isRequired,
  expenseData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default (memo, withTheme)(ExpensePerDayWidget);
