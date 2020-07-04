/**
 *
 * ExpenseList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import makeSelectExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadExpenseList as loadExpenseListAction,
  saveExpenseData as saveExpenseDataAction,
  updateExpenseData as updateExpenseDataAction,
  deleteExpenseData as deleteExpenseDataAction,
} from './actions';

const Container = styled.div`
  width: 90%;
  margin: 2rem auto;
  font-size: 1.6rem;
`;

export const ExpenseList = ({
  loadExpenseList,
  expenseList,
  saveExpenseData,
  updateExpenseData,
  deleteExpenseData,
  theme,
}) => {
  useInjectReducer({ key: 'expenseList', reducer });
  useInjectSaga({ key: 'expenseList', saga });

  const searchTxt = expenseList.searchText ? expenseList.searchText : '';
  const [searchText, setSearchText] = useState(searchTxt);
  const [loading, setLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      field: 'expense_date',
      title: 'Expense Date',
      width: 120,
      render: rowData => (
        <TextField
          id="date"
          type="date"
          value={rowData.expense_date}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
        />
      ),
      editComponent: props => (
        <TextField
          id="date"
          type="date"
          // eslint-disable-next-line react/prop-types
          value={props.value}
          // eslint-disable-next-line react/prop-types
          onChange={e => props.onChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
    { field: 'description', title: 'Description', width: 300 },
    { field: 'category', title: 'Category', width: 150 },
    { field: 'amount', title: 'Amount', width: 150 },
  ];

  const createData = item => ({
    id: item.id,
    expense_date: item.expense_date,
    description: item.description,
    category: item.category ? item.category : '-',
    amount: item.amount,
  });

  const formatterRows = () =>
    [...expenseList.list].map(item => createData(item));

  const [rows, setRows] = useState([]);

  const Pagination = prop => (
    <TablePagination
      {...prop}
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

  const onAdd = newData =>
    new Promise(resolve => {
      setTimeout(() => {
        const dataUpdate = [...rows];
        dataUpdate.push(newData);
        setRows([...dataUpdate]);
        saveExpenseData(newData);
        resolve();
      }, 600);
    });

  const onDelete = oldData =>
    new Promise(resolve => {
      setTimeout(() => {
        const dataUpdate = [...rows];
        dataUpdate.splice(dataUpdate.indexOf(oldData), 1);
        setRows([...dataUpdate]);
        deleteExpenseData(oldData.id);
        resolve();
      }, 600);
    });

  const onUpdate = (newData, oldData) =>
    new Promise(resolve => {
      setTimeout(() => {
        const dataUpdate = [...rows];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setRows([...dataUpdate]);
        updateExpenseData(newData);
        resolve();
      }, 1000);
    });

  const onSearchChange = search => {
    setLoading(true);
    setSearchText(search);
  };

  useEffect(() => {
    setRows(formatterRows());
    setLoading(expenseList.loading);
    setTotalCount(expenseList.info.totalCount);
  }, [expenseList.loading]);

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        setLoading(true);
        loadExpenseList(currentPage, limit, searchText);
      }, 500),
    );
  }, [currentPage, searchText, limit]);

  useEffect(() => {
    setCurrentPage(1); // whenever search text changes, set current page to 1, and show records from start
  }, [searchText]);

  return (
    <Container>
      <Paper style={{ position: 'relative' }}>
        <MaterialTable
          title=""
          columns={columns}
          data={rows}
          rowsPerPageOptions={[5, 10, 15, 20]}
          isLoading={loading}
          onSearchChange={onSearchChange}
          components={{
            Pagination: prop => (
              <TablePagination
                {...prop}
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
            ),
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
          }}
          localization={{
            body: {
              emptyDataSourceMessage: '',
            },
          }}
          editable={{
            onRowAdd: onAdd,
            onRowUpdate: onUpdate,
            onRowDelete: onDelete,
          }}
        />
      </Paper>
    </Container>
  );
};

ExpenseList.propTypes = {
  expenseList: PropTypes.object.isRequired,
  loadExpenseList: PropTypes.func.isRequired,
  saveExpenseData: PropTypes.func.isRequired,
  updateExpenseData: PropTypes.func.isRequired,
  deleteExpenseData: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenseList(),
});

const mapDispatchToProps = dispatch => ({
  loadExpenseList: (page, limit, searchText) =>
    dispatch(loadExpenseListAction(page, limit, searchText)),
  saveExpenseData: data => dispatch(saveExpenseDataAction(data)),
  updateExpenseData: data => dispatch(updateExpenseDataAction(data)),
  deleteExpenseData: data => dispatch(deleteExpenseDataAction(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withTheme,
)(ExpenseList);
