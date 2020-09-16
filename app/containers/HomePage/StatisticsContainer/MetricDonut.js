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
import NoDataMsg from './NoDataMsg';

const MetricDonutContainer = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
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

const MetricDonut = ({ doughnutData = [], theme }) => (
  <MetricDonutContainer>
    {doughnutData.length > 0 ? (
      <>
        <DonutTitleContainer>
          <div>Expense by</div>
          <div>CATEGORY</div>
        </DonutTitleContainer>
        <DoughnutWidget
          doughnutData={getAvailabilityDoughnutData(doughnutData, theme)}
        />
      </>
    ) : (
      <NoDataMsg> No data available</NoDataMsg>
    )}
  </MetricDonutContainer>
);

MetricDonut.propTypes = {
  theme: PropTypes.object.isRequired,
  doughnutData: PropTypes.array.isRequired,
};

export default (memo, withTheme)(MetricDonut);
