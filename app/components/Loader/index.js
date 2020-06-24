/**
 *
 * Loader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';

const Loader = ({ children, loading, ...rest }) => (
  <div>
    {!loading && <div {...rest}>{children}</div>}
    {loading && <LoadingIndicator />}
  </div>
);

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default Loader;
