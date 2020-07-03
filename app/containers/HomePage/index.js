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
import AddIcon from '@material-ui/icons/Add';
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

const AddBtnWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 5rem;
  display:flex;
  align-items: center;
`;

const AddText = styled.span`
  // color: ${props => props.theme.palette.secondary.dark};
  color: #fff;
  margin-right: 1.5rem;
  order:0;
  opacity:0;
  visibility: hidden;
  transition: visibility 0s, opacity 0.5s linear;
`;

const IconButtonWrapper = withStyles(theme => ({
  root: {
    color: '#fff',
    order: 1,
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
    '&:hover + .add_text': {
      opacity: 1,
      visibility: 'visible',
    },
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
    rest.history.push({
      pathname: '/addExpenses',
      params: {
        formType: 'add',
      }
    });
  }

  const onShowAllExpenses = () => {
    rest.history.push('/expensesList');
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
        <AddBtnWrapper>
          <IconButtonWrapper aria-label="add expenses" onClick={onAddExpense}>
            <AddIcon fontSize="large" />
          </IconButtonWrapper>
          <AddText className='add_text'>Add New Expense</AddText>
        </AddBtnWrapper>
        <Container>
          <Info>Your total expenses this year : €8900+ Rs.456 </Info>
          <Info>You owe Rs.67 to Prasad</Info>
          <Info>Prasad owes you €1560 </Info>
        </Container>
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
