/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import Wrapper from './Wrapper';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { withStyles } from '@material-ui/core/styles';

const key = 'home';

const Section = styled.div`
  width: 20%;
  background: ${props => props.theme.palette.primary.main};
  color: #fff;
`;

const SectionItem = styled.div`
  display: flex;
  align-items:center;
  justify-content: space-between;
  padding: .8rem;
  &:hover {
    background: ${props => props.theme.palette.primary.light}; // #6298a6;
  }
`;

const Container = styled.div`
  color: ${props => props.theme.palette.primary.dark};
  padding: 2rem;
`;

const Info = styled.div`
  padding: .8rem;
`;

const IconButtonWrapper = withStyles(theme => ({
  root: {
    color: '#fff',
    '&:hover': {
      background: theme.palette.primary.dark, // '#48727d',
    }
  },
}))(IconButton);

export function HomePage({
  username, ...rest
}) {
  // let history = useHistory();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const onAddExpense = () => {
    rest.history.push('/addExpenses');
  }

  const onAddExpenseList = () => {
    rest.history.push('/addExpensesList');
  }

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Expense tracker application"
        />
      </Helmet>
      <Wrapper>
        <Section>
          <SectionItem>
            <span>Add Expense</span>
            <IconButtonWrapper aria-label="add expenses" onClick={onAddExpense}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButtonWrapper>
          </SectionItem>
          <SectionItem>
            <span>Add Expense List</span>
            <IconButtonWrapper aria-label="add expense list" onClick={onAddExpenseList}>
              <PlaylistAddIcon fontSize="large" />
            </IconButtonWrapper>
          </SectionItem>
        </Section>
        <Container>
          <Info>Your total expenses this year : €8900+ Rs.456 </Info>
          <Info>You owe Rs.67 to Prasad</Info>
          <Info>Prasad owes you €1560 </Info></Container>
      </Wrapper>
    </article >
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(HomePage);
