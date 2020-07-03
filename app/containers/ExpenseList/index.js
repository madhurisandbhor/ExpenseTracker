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
import makeSelectExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadExpenseList as loadExpenseListAction,
  saveExpenseData as saveExpenseDataAction,
} from './actions';

const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  font-size: 1.6rem;
`;

export const ExpenseList = ({
  loadExpenseList,
  expenseList,
  saveExpenseData,
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
    { field: 'expense_date', title: 'Expense Date' },
    { field: 'description', title: 'Description' },
    { field: 'category', title: 'Category' },
    { field: 'amount', title: 'Amount' },
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

  // const onEditExpense = useCallback(expenseId => {
  //   console.log('expense id:', expenseId);
  //   props.history.push({
  //     pathname: '/addExpenses',
  //     params: {
  //       formType: 'update',
  //       expenseId,
  //     },
  //   });
  // }, []);

  // const onDeleteExpense = useCallback(expenseId => {
  //   console.log('expense id:', expenseId);
  //   // rest.history.push('/addExpenses');
  // }, []);

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

  const onSearchChange = search => {
    setLoading(true);
    setSearchText(search);
  };
  const onUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...rows];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setRows([...dataUpdate]);
        saveExpenseData(newData);
        resolve();
      }, 1000);
    });

  return (
    <Container>
      <Paper style={{ position: 'relative' }}>
        <MaterialTable
          title=""
          columns={columns}
          data={rows}
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
          }}
          localization={{
            body: {
              emptyDataSourceMessage: '',
            },
          }}
          editable={{
            // onRowAdd: newData =>
            //   new Promise(resolve => {
            //     setTimeout(() => {
            //       resolve();
            //       setState(prevState => {
            //         const data = [...prevState.data];
            //         data.push(newData);
            //         return { ...prevState, data };
            //       });
            //     }, 600);
            //   }),
            onRowUpdate: onUpdate,
            // onRowDelete: oldData =>
            //   new Promise(resolve => {
            //     setTimeout(() => {
            //       resolve();
            //       setState(prevState => {
            //         const data = [...prevState.data];
            //         data.splice(data.indexOf(oldData), 1);
            //         return { ...prevState, data };
            //       });
            //     }, 600);
            //   }),
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
};

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenseList(),
});

const mapDispatchToProps = dispatch => ({
  loadExpenseList: (page, limit, searchText) =>
    dispatch(loadExpenseListAction(page, limit, searchText)),
  saveExpenseData: data => dispatch(saveExpenseDataAction(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExpenseList);
