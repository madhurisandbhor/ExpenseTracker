/**
 *
 * ExpenseList
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable, { MTableToolbar } from 'material-table';
import { TablePagination } from '@material-ui/core';

import Filter from 'components/Filter';
import MessageBar from 'components/MessageBar';

export const CustomMaterialTable = ({
  columns = [],
  rows = [],
  loading,
  onSearch,
  emptyDataSrcMsg,
  onAdd,
  onUpdate,
  onDelete,
  open,
  handleClose,
  severity,
  message,
  filterParams,
  totalCount,
  currentPage,
  limit,
  setCurrentPage,
  setLimit,
}) => {
  const CustomFilter = props => (
    <div>
      <MTableToolbar {...props} />
      <Filter {...filterParams} />
    </div>
  );

  const CustomPagination = props => (
    <TablePagination
      {...props}
      count={totalCount}
      page={currentPage - 1}
      rowsPerPage={limit}
      onChangePage={(e, page) => {
        setCurrentPage(page + 1);
      }}
      onChangeRowsPerPage={event => {
        setLimit(parseInt(event.target.value, 10));
      }}
    />
  );

  return (
    <>
      <Paper style={{ position: 'relative' }}>
        <MaterialTable
          title=""
          columns={columns}
          data={rows}
          rowsPerPageOptions={[5, 10, 15, 20]}
          isLoading={loading}
          onSearchChange={onSearch}
          components={{
            Pagination: props => <CustomPagination {...props} />,
            Toolbar: props => <CustomFilter {...props} />,
          }}
          options={{
            emptyRowsWhenPaging: false,
            pageSize: 20,
            actionsColumnIndex: -1,
            actionsCellStyle: {
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            },
            addRowPosition: 'first',
            searchAutoFocus: true,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: emptyDataSrcMsg,
            },
          }}
          editable={{
            onRowAdd: onAdd,
            onRowUpdate: onUpdate,
            onRowDelete: onDelete,
          }}
        />
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MessageBar onClose={handleClose} severity={severity}>
          {message}
        </MessageBar>
      </Snackbar>
    </>
  );
};

CustomMaterialTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  emptyDataSrcMsg: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  message: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setLimit: PropTypes.func.isRequired,
  filterParams: PropTypes.object.isRequired,
};

export default memo(CustomMaterialTable);
