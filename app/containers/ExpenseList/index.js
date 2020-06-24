/**
 *
 * ExpenseList
 *
 */

import React, { memo, useEffect, useState, forwardRef } from 'react';
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
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';

import {
  SortingState,
  IntegratedSorting,
  SearchState,
} from '@devexpress/dx-react-grid';
import { loadExpenseList as loadExpenseListAction } from './actions';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  font-size: 1.6rem;
`;

const HeaderCell = withStyles({
  cell: {
    padding: '1.6rem',
    '&:first-child': {
      paddingLeft: '1.6rem',
    },
  },
})(TableHeaderRow.Cell);

const CellWrapper = withStyles({
  cell: {
    padding: '1.6rem',
    '&:first-child': {
      paddingLeft: '1.6rem',
    },
  },
})(Table.Cell);

const IconButtonWrapper = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    order: 1,
    background: '#fff',
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
    },
    '&:hover + .add_text': {
      opacity: 1,
      visibility: 'visible',
    },
  },
}))(IconButton);

export const ExpenseList = ({ loadExpenseList, expenseList }) => {

  useInjectReducer({ key: 'expenseList', reducer });
  useInjectSaga({ key: 'expenseList', saga });

  const [columns] = useState([
    { name: 'expenseDate', title: 'Expense Date' },
    { name: 'description', title: 'Description' },
    { name: 'category', title: 'Category' },
    { name: 'amount', title: 'Amount' },
    { name: 'edit', title: 'Edit' },
    { name: 'delete', title: 'Delete' },
  ]);

  const [tableColumnExtensions] = useState([
    { columnName: 'amount', align: 'right' },
  ]);

  const defaultColumnWidths = [
    { columnName: 'expenseDate', width: 150 },
    { columnName: 'description', width: 380 },
    { columnName: 'category', width: 150 },
    { columnName: 'amount', width: 150 },
    { columnName: 'edit', width: 85 },
    { columnName: 'delete', width: 100 },
  ];

  const createData = item => ({
    id: item.id,
    expenseDate: item.expense_date,
    description: item.description,
    category: item.category ? item.category : '-',
    amount: item.amount,
  });

  const formatterRows = () => [...expenseList.list].map(item => createData(item));
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(expenseList.searchText);
  const [typingTimeout, setTypingTimeout] = useState(0);


  const onEditExpense = expenseId => {
    console.log('expense id:', expenseId);
    // rest.history.push('/addExpenses');
  }

  const onDeleteExpense = expenseId => {
    console.log('expense id:', expenseId);
    // rest.history.push('/addExpenses');
  }

  const Cell = forwardRef((props, ref) => {
    const { column, row } = props;

    if (column.name === 'edit') {
      return (
        <CellWrapper ref={ref}>
          <IconButtonWrapper aria-label="edit expense" onClick={() => onEditExpense(row.id)}>
            <EditIcon fontSize="medium" />
          </IconButtonWrapper>
        </CellWrapper>
      );
    }
    if (column.name === 'delete') {
      return (
        <CellWrapper ref={ref}>
          <IconButtonWrapper aria-label="delete expense" onClick={() => onDeleteExpense(row.id)}>
            <DeleteIcon fontSize="medium" />
          </IconButtonWrapper>
        </CellWrapper>
      );
    }
    return <CellWrapper ref={ref} {...props} />;
  });

  const clearAll = () => {
    console.log('expense list unmounted');
  }

  useEffect(() => {
    console.log('mounted');
    loadExpenseList();
    return clearAll();
  }, []);

  useEffect(() => {
    setRows(formatterRows());
    setLoading(expenseList.loading);
  }, [expenseList.loading]);

  useEffect(() => {
    if (typingTimeout)
      clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        searchText !== '' && loadExpenseList(searchText);
        searchText === '' && loadExpenseList();
      }, 500));
  }, [searchText]);

  return (
    <Container>
      <Paper style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
          noDataText='loading data'
        >
          <SearchState
            value={searchText}
            onValueChange={setSearchText}
          />
          <SortingState
            defaultSorting={[{ columnName: 'expenseDate', direction: 'desc' }]}
          />
          <IntegratedSorting />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow cellComponent={HeaderCell} showSortingControls/>
          <Toolbar />
          <SearchPanel />
        </Grid>
      </Paper>
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
