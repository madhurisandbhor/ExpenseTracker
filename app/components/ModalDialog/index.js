/**
 *
 * ModalDialog
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { withStyles } from '@material-ui/core/styles';
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

// In parent container
// const [open, setOpen] = React.useState(false);

// const handleClickOpen = () => {
//   console.log('click  open');
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };

// const params = {
//   onClose: handleClose,
//   open,
//   dialogTitle: '',
// };

// call modal dialog
// const UserModal = props => (
//   <ModalDialog {...props}>
//     <div style={{ width: '250px', height: '300px' }}>Modal</div>
//   </ModalDialog>
// );

ModalDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  dialogTitle: PropTypes.string.isRequired,
};

export default memo(ModalDialog);
