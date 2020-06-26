/**
 *
 * ExpenseList
 *
 */

import React, { memo, useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
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
  SearchState,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { loadExpenseList as loadExpenseListAction } from './actions';
import Loader from 'components/Loader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  font-size: 1.6rem;
`;

const Pagination = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  padding: 1rem;
`;

const Btn = withStyles(theme => ({
  root: {
    minWidth: '4rem',
    width: '4rem',
    height: '4rem',
    margin: '.8rem',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 0.5rem 1rem grey',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: "#fff",
    borderRadius: '50%',
    borderWidth: 0,
    textAlign: 'center',
    '&:hover': {
      transform: 'translateY(-0.2rem)',
      boxShadow: '0 1rem 2rem grey',
      backgroundColor: theme.palette.primary.dark,
    },
    '&:disabled': {
      opacity: '0.5',
    }
  }
}))(Button);

const HeaderCell = withStyles({
  cell: {
    padding: '1rem',
    '&:first-child': {
      paddingLeft: '1.6rem',
    },
    '&:nth-last-child(3)': {
      paddingLeft: '1.6rem',
      paddingRight: '1.6rem',
    },
    '&:nth-last-child(2)': {
      paddingLeft: '1rem',
      paddingRight: 0,
    }
  },
})(TableHeaderRow.Cell);

const CellWrapper = withStyles({
  cell: {
    padding: '0 1rem',
    '&:first-child': {
      paddingLeft: '1.6rem',
    },
    '&:nth-last-child(3)': {
      paddingLeft: '1.6rem',
      paddingRight: '1.6rem',
    },
    '&:nth-last-child(2)': {
      paddingLeft: '1.6rem',
      paddingRight: 0,
    }
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
    { columnName: 'delete', width: 82 },
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
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [nextLink, setNextLink] = useState(expenseList.info && expenseList.info.next ? expenseList.info.next : '');
  const [prevLink, setPrevLink] = useState(expenseList.info && expenseList.info.prev ? expenseList.info.prev : '');
  const [limit, setLimit] = useState(5);
  const [pagesCount, setPagesCount] = useState(expenseList.info.pages ? expenseList.info.pages : 1);
  const [currentPage, setCurrentPage] = useState(1);
  const searchTxt = expenseList.searchText ? expenseList.searchText : '';
  const [searchText, setSearchText] = useState(searchTxt);


  const onNavigationClick = (nextORPrev) => {
    const url = (nextORPrev === 'next') ? new URL(expenseList.info.next) : new URL(expenseList.info.prev);
    const urlParams = new URLSearchParams(url.search);
    const page = urlParams.get('page');
    setCurrentPage(page);
  }

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
            <EditIcon fontSize="small" />
          </IconButtonWrapper>
        </CellWrapper>
      );
    }
    if (column.name === 'delete') {
      return (
        <CellWrapper ref={ref}>
          <IconButtonWrapper aria-label="delete expense" onClick={() => onDeleteExpense(row.id)}>
            <DeleteIcon fontSize="small" />
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
    setRows(formatterRows());
    setLoading(expenseList.loading);
    setPagesCount(expenseList.info.pages);
    setNextLink(expenseList.info.next);
    setPrevLink(expenseList.info.prev);
  }, [expenseList.loading]);

  useEffect(() => {
    if (typingTimeout)
      clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        loadExpenseList(currentPage, limit, searchText);
      }, 500));
  }, [currentPage, searchText, limit]);

  useEffect(() => {
    setCurrentPage(1);
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
          // defaultSorting={[{ columnName: 'expenseDate', direction: 'desc' }]}
          />
          <IntegratedSorting />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow cellComponent={HeaderCell} showSortingControls />
          <Toolbar />
          <SearchPanel />
        </Grid>
        <Pagination>
          {pagesCount !== 0 &&
            <>
              <Btn
                size="large"
                onClick={() => onNavigationClick('prev')}
                disabled={prevLink === ''}
              >
                &#8249;
              </Btn>
              <span>{currentPage}/{pagesCount}</span>
              <Btn
                size="small"
                onClick={() => onNavigationClick('next')}
                disabled={nextLink === ''}
              >
                &#8250;
            </Btn>
            </>}
        </Pagination>
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
  loadExpenseList: (page, limit, searchText) =>
    dispatch(loadExpenseListAction(page, limit, searchText)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExpenseList);
