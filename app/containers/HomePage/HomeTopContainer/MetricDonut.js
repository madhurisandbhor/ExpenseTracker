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
  labels: data.length > 0 ? getLabels(data) : ['No data'],
  data: data.length > 0 ? getData(data) : [1],
  colors:
    data.length > 0
      ? data.map(item => getColors(item.category, theme))
      : undefined,
});

const getData = data => data.map(item => item.aggrAmount);

const getLabels = data => data.map(item => item.category);

// const formatLabels=()=>{
//   const label = {
//     available: () => AVAILABILITY_TAB_LABELS.AVAILABLE,
//     notListed: () => AVAILABILITY_TAB_LABELS.NOT_LISTED,
//     outOfStock: () => AVAILABILITY_TAB_LABELS.OUT_OF_STOCK,
//     outsideAvailable: () => AVAILABILITY_TAB_LABELS.OUTSIDE_AVAILABLE,
//     default: undefined,
//   };
//   return (label[type] || label.default)();
// };

const getColors = (label, theme) => {
  const colors = {
    food: () => (theme.palette ? theme.palette.primary.main : undefined),
    clothing: () => (theme.palette ? theme.palette.primary.dark : undefined),
    bills: () => (theme.palette ? theme.palette.primary.light : undefined),
    others: () => (theme.palette ? theme.palette.secondary.light : undefined),
    none: () => undefined,
  };

  return colors[label]();
};

const MetricDonut = ({
  doughnutData = {},
  graphClickEvent,
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
  doughnutData: PropTypes.array.isRequired,
};

export default (memo, withTheme)(MetricDonut);
