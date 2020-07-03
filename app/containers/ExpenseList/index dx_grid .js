/**
 *
 * ExpenseList
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Paper from '@material-ui/core/Paper';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination/Loadable';
import makeSelectExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExpenseList as loadExpenseListAction } from './actions';
import ExpenseGrid from './ExpenseGrid';

const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  font-size: 1.6rem;
`;

export const ExpenseList = ({ loadExpenseList, expenseList, history }) => {
  useInjectReducer({ key: 'expenseList', reducer });
  useInjectSaga({ key: 'expenseList', saga });

  const createData = item => ({
    id: item.id,
    expenseDate: item.expense_date,
    description: item.description,
    category: item.category ? item.category : '-',
    amount: item.amount,
  });

  const formatterRows = () =>
    [...expenseList.list].map(item => createData(item));

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [nextLink, setNextLink] = useState(
    expenseList.info && expenseList.info.next ? expenseList.info.next : '',
  );
  const [prevLink, setPrevLink] = useState(
    expenseList.info && expenseList.info.prev ? expenseList.info.prev : '',
  );
  const [limit, setLimit] = useState(5);
  const [pagesCount, setPagesCount] = useState(
    expenseList.info.pages ? expenseList.info.pages : 1,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const searchTxt = expenseList.searchText ? expenseList.searchText : '';
  const [searchText, setSearchText] = useState(searchTxt);

  const onNavigationClick = useCallback(
    nextORPrev => {
      const url =
        nextORPrev === 'next'
          ? new URL(expenseList.info.next)
          : new URL(expenseList.info.prev);
      const urlParams = new URLSearchParams(url.search);
      const page = urlParams.get('page');
      setCurrentPage(page);
    },
    [expenseList.info.next, expenseList.info.prev],
  );

  const onEditExpense = useCallback(expenseId => {
    history.push({
      pathname: '/addExpenses',
      params: {
        formType: 'update',
        expenseId,
      },
    });
  }, []);

  const onDeleteExpense = useCallback(expenseId => {
    console.log('expense id:', expenseId);
    // rest.history.push('/addExpenses');
  }, []);

  useEffect(() => {
    setRows(formatterRows());
    setLoading(expenseList.loading);
    setPagesCount(expenseList.info.pages);
    setNextLink(expenseList.info.next);
    setPrevLink(expenseList.info.prev);
  }, [expenseList.loading]);

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
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
        {loading && <Loader />}
        <ExpenseGrid
          rows={rows}
          searchText={searchText}
          setSearchText={setSearchText}
          onEditExpense={onEditExpense}
          onDeleteExpense={onDeleteExpense}
        />
        {pagesCount !== 0 && (
          <Pagination
            nextLink={nextLink}
            prevLink={prevLink}
            currentPage={currentPage}
            pagesCount={pagesCount}
            onNavigationClick={onNavigationClick}
          />
        )}
      </Paper>
    </Container>
  );
};

ExpenseList.propTypes = {
  expenseList: PropTypes.object.isRequired,
  loadExpenseList: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
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
