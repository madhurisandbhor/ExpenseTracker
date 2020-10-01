/**
 *
 * MessageBar
 *
 */

import React, { memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

const MuiAlertWrapper = withStyles(theme => ({
  root: {
    fontSize: '1.4rem',
    color: theme.tracker.white,
  },
  action: {
    '& .MuiIconButton-colorInherit': {
      color: theme.tracker.white,
    },
  },
}))(MuiAlert);

const MessageBar = props => (
  <MuiAlertWrapper elevation={6} variant="filled" {...props} />
);

MessageBar.propTypes = {};

export default memo(MessageBar);
