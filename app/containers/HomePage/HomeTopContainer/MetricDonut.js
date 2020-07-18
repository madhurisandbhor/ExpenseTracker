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
// import { round2decimals } from 'utils/calculations';
// import { AVAILABILITY_TAB_LABELS } from '../constants';

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
  left: 36%;
  top: 35%;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
`;

export const getAvailabilityDoughnutData = (data, theme) => ({
  labels: ['Food', 'Shopping', 'Others'],
  // calculateTotal(data) > 0 ? getLabels(data) : ['No data'],
  data: [10, 20, 30],
  // calculateTotal(data) > 0 ? getData(data) : [1],
  colors: [
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ],
});

const getData = data => Object.values(data).map(item => round2decimals(item));

const calculateTotal = data =>
  Object.values(data).reduce((pv, cv) => pv + cv, 0);

const getLabels = data => {
  const labels = Object.keys(data);
  const newLabels = labels.map(item => formatLabels(item));
  return newLabels;
};

const formatLabels = type => {
  const label = {
    available: () => AVAILABILITY_TAB_LABELS.AVAILABLE,
    notListed: () => AVAILABILITY_TAB_LABELS.NOT_LISTED,
    outOfStock: () => AVAILABILITY_TAB_LABELS.OUT_OF_STOCK,
    outsideAvailable: () => AVAILABILITY_TAB_LABELS.OUTSIDE_AVAILABLE,
    default: undefined,
  };
  return (label[type] || label.default)();
};

const getColors = (label, theme) => {
  const colors = {
    // eslint-disable-next-line prettier/prettier
    Available: () => (theme.palette ? theme.palette.primary.main : undefined),
    'Not Listed': () => (theme.workIT ? theme.workIT.cautionColor : undefined),
    'Out Of Stock': () => (theme.workIT ? theme.workIT.badColor : undefined),
    'Outside Available': () =>
      theme.workIT ? theme.workIT.warningColor : undefined,
    default: undefined,
  };
  return (colors[label] || colors.default)();
};

const MetricDonut = ({
  doughnutData = {},
  graphClickEvent,
  dataType,
  theme,
  ...rest
}) => (
  <MetricDonutContainer>
    <DonutTitleContainer>
      <div>Monthly</div>
      <div>DISTRIBUTION</div>
    </DonutTitleContainer>
    <DoughnutWidget
      {...rest}
      doughnutData={getAvailabilityDoughnutData(doughnutData, theme)}
      graphClickEvent={graphClickEvent}
      dataType={dataType}
      cutoutPercentage={78}
      withLegends
      legendPosition="bottom"
      canvasHeight={210}
    />
  </MetricDonutContainer>
);

MetricDonut.propTypes = {
  // graphClickEvent: PropTypes.func.isRequired,
  // dataType: PropTypes.string.isRequired,
  // doughnutData: PropTypes.object.isRequired,
};

export default (memo, withTheme)(MetricDonut);
