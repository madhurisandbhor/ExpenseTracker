/**
 *
 * DoughnutWidget
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const options = {
  cutoutPercentage: 70,
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

export const getDoughnutData = (data, labels, colors) => ({
  labels,
  datasets: [
    {
      data,
      stack: '1',
      backgroundColor: colors || undefined,
      borderWidth: 1,
    },
  ],
});

const DoughnutWidget = ({ doughnutData }) => {
  const { data, labels, colors } = doughnutData;
  const dataSet = getDoughnutData(data, labels, colors);
  return (
    <div style={{ paddingBottom: '5px' }}>
      <Doughnut data={dataSet} options={options} height={180} />
    </div>
  );
};

DoughnutWidget.propTypes = {
  doughnutData: PropTypes.object.isRequired,
};

export default memo(DoughnutWidget);
