/**
 *
 * ModalDialog
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function ModalDialog({ onClose, open, children, dialogTitle }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="dialog-title">{dialogTitle}</DialogTitle>
      {children}
    </Dialog>
  );
}

ModalDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  dialogTitle: PropTypes.string.isRequired,
};

export default memo(ModalDialog);
