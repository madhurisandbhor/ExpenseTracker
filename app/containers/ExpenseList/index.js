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
import makeSelectExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import Paper from '@material-ui/core/Paper';
import { SearchState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { loadExpenseList as loadExpenseListAction } from './actions';
import LoadingIndicator from 'components/LoadingIndicator';


const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  font-size: 1.6rem;
`;

export const ExpenseList = ({ loadExpenseList, expenseList }) => {

  useInjectReducer({ key: 'expenseList', reducer });
  useInjectSaga({ key: 'expenseList', saga });

  const [columns] = useState([
    { name: 'expenseDate', title: 'Expense Date' },
    { name: 'description', title: 'Description' },
    { name: 'category', title: 'category' },
    { name: 'amount', title: 'Amount' },
  ]);

  const [tableColumnExtensions] = useState([
    { columnName: 'amount', align: 'right' },
  ]);

  const createData = item => ({
    id: item.id,
    expenseDate: item.expense_date,
    description: item.description,
    category: item.category ? item.category : '-',
    amount: item.amount,
  });

  const formatterRows = () => [...expenseList.list].map(item => createData(item));
  const rows = formatterRows();

  // const [rows] = useState(formatterRows());
  // const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(expenseList.searchText);

  const clearAll = () => {
    console.log('expense list unmounted');
  }

  useEffect(() => {
    console.log('mounted');
    searchText === '' && expenseList.list.length == 0 && loadExpenseList();
    return clearAll();
  }, []);

  useEffect(() => {
    console.log('search call');
    searchText !== '' && loadExpenseList(searchText);
    searchText === '' && loadExpenseList();
  }, [searchText]);

  return (
    <Container>
      {expenseList.loading && <LoadingIndicator />}
      {!expenseList.loading && <Paper style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SearchState
            value={searchText}
            onValueChange={setSearchText}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
          <Toolbar />
          <SearchPanel />
        </Grid>
      </Paper>}
      {expenseList.loading && <LoadingIndicator />}
    </Container>
  );
}

ExpenseList.propTypes = {
  expenseList: PropTypes.object.isRequired,
  loadExpenseList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenseList(),
});

const mapDispatchToProps = dispatch => ({
  loadExpenseList: params =>
    dispatch(loadExpenseListAction(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExpenseList);
