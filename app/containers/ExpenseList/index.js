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
import MaterialTable, { MTableToolbar } from 'material-table';
import { TablePagination } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

import MessageBar from 'components/MessageBar';
import Filter from 'components/Filter';
import { setDate } from 'date-fns/esm';
import makeSelectExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadExpenseList as loadExpenseListAction,
  saveExpenseData as saveExpenseDataAction,
  updateExpenseData as updateExpenseDataAction,
  deleteExpenseData as deleteExpenseDataAction,
  clearData as clearDataAction,
} from './actions';

const Container = styled.div`
  width: 90%;
  margin: 2rem auto;
  font-size: 1.6rem;
`;

const ReadOnlySelect = withStyles(() => ({
  icon: {
    // display: 'none',
  },
}))(Select);

export const ExpenseList = ({
  loadExpenseList,
  expenseList,
  saveExpenseData,
  updateExpenseData,
  deleteExpenseData,
  clearData,
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
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('info');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
        />
      ),
      // eslint-disable-next-line react/prop-types
      editComponent: ({ value = '', ...props }) => (
        <TextField
          id="date"
          type="date"
          // eslint-disable-next-line react/prop-types
          value={value}
          // eslint-disable-next-line react/prop-types
          onChange={e => props.onChange(e.target.value)}
        />
      ),
    },
    { field: 'description', title: 'Description', width: 300 },
    {
      field: 'category',
      title: 'Category',
      width: 150,
      render: rowData => (
        <ReadOnlySelect
          id="category"
          value={rowData.category}
          style={{ width: '20ch' }}
          inputProps={{
            readOnly: true,
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          <MenuItem value="bills">Bills</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </ReadOnlySelect>
      ),
      // eslint-disable-next-line react/prop-types
      editComponent: ({ value = '', ...props }) => (
        <Select
          id="category"
          style={{ width: '20ch' }}
          // eslint-disable-next-line react/prop-types
          value={value}
          // eslint-disable-next-line react/prop-types
          onChange={e => props.onChange(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          <MenuItem value="bills">Bills</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </Select>
      ),
    },
    { field: 'amount', title: 'Amount', width: 150 },
  ];

  const createData = item => ({
    id: item.id,
    expense_date: item.expense_date,
    description: item.description,
    category: item.category,
    amount: item.amount,
  });

  const formatterRows = () =>
    [...expenseList.list].map(item => createData(item));

  const [rows, setRows] = useState([]);

  const clear = () => {
    setMessage('');
    setOpen(false);
    clearData();
  };

  const validate = newData => {
    const msg = [];
    if (!newData.amount) msg.push('amount');
    if (!newData.description) msg.push('description');
    if (!newData.expense_date) msg.push('expense_date');
    if (msg.length !== 0) {
      msg.unshift('Invalid');
      return msg.join(' ');
    }
    return msg;
  };

  const onAdd = newData =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const msg = validate(newData);
        if (msg.length !== 0) {
          setMessage(msg);
          setOpen(true);
          setSeverity('error');
          return reject();
        }
        const dataUpdate = [...rows];
        dataUpdate.push(newData);
        setRows([...dataUpdate]);
        saveExpenseData(newData);
        return resolve();
      }, 600);
    }).then(() => {
      loadExpenseList(currentPage, limit, searchText);
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
    }).then(() => {
      loadExpenseList(currentPage, limit, searchText);
    });

  const onUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const msg = validate(newData);
        if (msg.length !== 0) {
          setMessage(msg);
          setOpen(true);
          setSeverity('error');
          return reject();
        }
        const dataUpdate = [...rows];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setRows([...dataUpdate]);
        updateExpenseData(newData);
        return resolve();
      }, 600);
    }).then(() => {
      loadExpenseList(currentPage, limit, searchText);
    });

  const onSearchChange = search => {
    setLoading(true);
    setSearchText(search);
  };

  const onChangeFilter = (
    ipFromDate,
    ipToDate,
    ipFromAmount,
    ipToAmount,
    ipCategoriesSelected,
  ) => {
    setCategoriesSelected(ipCategoriesSelected);
    setFromDate(ipFromDate);
    setToDate(ipToDate);
    setFromAmount(ipFromAmount);
    setToAmount(ipToAmount);
  };

  const CustomFilter = props => {
    const params = {
      categoriesSelected,
      fromDate,
      toDate,
      fromAmount,
      toAmount,
      onChangeFilter,
    };

    return (
      <div>
        <MTableToolbar {...props} />
        <Filter {...params} />
      </div>
    );
  };

  useEffect(() => {
    if (!expenseList.loading) {
      setRows(formatterRows());
      setLoading(expenseList.loading);
      setTotalCount(expenseList.info.totalCount);
    }
  }, [expenseList.list]);

  useEffect(() => {
    if (expenseList.error || expenseList.message) {
      const msg = expenseList.error ? expenseList.error : expenseList.message;
      const alertType = expenseList.error ? 'error' : 'success';
      setMessage(msg);
      setOpen(true);
      setSeverity(alertType);
    } else {
      setMessage('');
      setOpen(false);
    }
  }, [expenseList.error, expenseList.message]);

  useEffect(() => {
    setCurrentPage(1); // whenever search text changes, set current page to 1, and show records from start
  }, [searchText]);

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        loadExpenseList(
          currentPage,
          limit,
          searchText,
          fromDate,
          toDate,
          fromAmount,
          toAmount,
        );
      }, 500),
    );
  }, [currentPage, searchText, limit, fromDate, toDate, fromAmount, toAmount]);

  useEffect(() => {
    setLoading(true);
    return clear();
  }, []);

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
          }}
          localization={{
            body: {
              emptyDataSourceMessage:
                !searchText && !fromDate && !toDate && !fromAmount && !toAmount
                  ? ''
                  : 'No records to display',
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
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MessageBar onClose={handleClose} severity={severity}>
          {message}
        </MessageBar>
      </Snackbar>
    </Container>
  );
};

ExpenseList.propTypes = {
  expenseList: PropTypes.object.isRequired,
  loadExpenseList: PropTypes.func.isRequired,
  saveExpenseData: PropTypes.func.isRequired,
  updateExpenseData: PropTypes.func.isRequired,
  deleteExpenseData: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenseList(),
});

const mapDispatchToProps = dispatch => ({
  loadExpenseList: (
    page,
    limit,
    searchText,
    fromDate,
    toDate,
    fromAmount,
    toAmount,
  ) =>
    dispatch(
      loadExpenseListAction(
        page,
        limit,
        searchText,
        fromDate,
        toDate,
        fromAmount,
        toAmount,
      ),
    ),
  saveExpenseData: data => dispatch(saveExpenseDataAction(data)),
  updateExpenseData: data => dispatch(updateExpenseDataAction(data)),
  deleteExpenseData: data => dispatch(deleteExpenseDataAction(data)),
  clearData: () => dispatch(clearDataAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExpenseList);
