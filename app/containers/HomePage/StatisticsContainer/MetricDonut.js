/**
 *
 * MetricDonut
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import DoughnutWidget from 'components/DoughnutWidget';
import styled from 'styled-components';

const MetricDonutContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

const DonutTitleContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 38%;
  top: 37%;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
`;

export const getAvailabilityDoughnutData = (data, theme) => ({
  labels: data.length > 0 ? getLabels(data) : ['No data'],
  data: data.length > 0 ? getData(data) : [1],
  colors:
    data.length > 0
      ? data.map(item => getColors(item.category, theme))
      : undefined,
});

const getData = data => data.map(item => item.percentage);

const getLabels = data =>
  data.map(item => item.category[0].toUpperCase() + item.category.substr(1));

const getColors = (label, theme) => {
  const colors = {
    food: () => (theme.tracker ? theme.tracker.category.yellow : undefined),
    clothing: () => (theme.tracker ? theme.tracker.category.red : undefined),
    bills: () => (theme.tracker ? theme.tracker.category.blue : undefined),
    others: () => (theme.tracker ? theme.tracker.category.green : undefined),
    none: () => undefined,
  };

  return colors[label]();
};

const MetricDonut = ({ doughnutData = {}, theme }) => (
  <MetricDonutContainer>
    <DonutTitleContainer>
      <div>Expense by</div>
      <div>CATEGORY</div>
    </DonutTitleContainer>
    <DoughnutWidget
      doughnutData={getAvailabilityDoughnutData(doughnutData, theme)}
    />
  </MetricDonutContainer>
);

MetricDonut.propTypes = {
  theme: PropTypes.object.isRequired,
  doughnutData: PropTypes.array.isRequired,
};

export default (memo, withTheme)(MetricDonut);
