/**
 *
 * DoughnutWidget
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';

const options = {
  legend: {
    display: false,
    position: 'bottom',
  },
  labels: {
    fontSize: '8px',
  },
  elements: {
    center: {
      text: 'default', // to replace with plugin
    },
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        // replace nodata label to 0 when total is 0.
        const percentageValue =
          data.labels[tooltipItem.index] === 'No data'
            ? 0
            : data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return `${data.labels[tooltipItem.index]}: ${percentageValue}%`;
      },
    },
  },
};

export const getDoughnutData = (data, labels, colors, dataType) => ({
  labels,
  datasets: [
    {
      data,
      stack: '1',
      backgroundColor: colors || undefined,
      borderWidth: 1,
    },
  ],
  dataType,
});

const DoughnutWidget = ({
  doughnutData = {
    labels: '',
    data: '',
    colors: '',
    dataType: '',
  },
  graphClickEvent,
  dataType,
  cutoutPercentage,
  withLegends,
  legendPosition,
  canvasHeight = 180,
  chartId,
  plugin,
  ...rest
}) => {
  const { data, labels, colors } = doughnutData;
  const dataSet = getDoughnutData(data, labels, colors, dataType);
  options.cutoutPercentage = cutoutPercentage;
  options.legend.display = withLegends;
  options.legend.position = legendPosition;
  return (
    <div style={{ paddingBottom: '5px' }} {...rest}>
      <Doughnut
        id={chartId}
        data={dataSet}
        options={options}
        height={canvasHeight}
        onElementsClick={graphClickEvent}
        plugins={plugin ? [plugin] : []}
      />
    </div>
  );
};

DoughnutWidget.propTypes = {};

export default memo(DoughnutWidget);
