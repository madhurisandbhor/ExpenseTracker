/* eslint-disable object-shorthand */
/**
 *
 * AddExpensesForm
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { withStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import CenteredSection from 'components/CenteredSection';
import makeSelectAddExpensesForm from './selectors';
import saga from './saga';
import reducer from './reducer';
import messages from './messages';
import {
  loadExpenseData as loadExpenseDataAction,
  clearData as clearDataAction,
} from './actions';

const Wrapper = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  width: 50%;
  background-color: ${props => props.theme.tracker.white};
  border-radius: 0.4rem;
`;

const FieldWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Section = styled(CenteredSection)`
  color: ${props => props.theme.palette.primary.dark};
  font-weight: bold;
`;

const ButtonWrapper = withStyles(theme => ({
  root: {
    width: '20ch',
    color: theme.tracker.white,
    background: theme.palette.primary.main,
    margin: '.8rem',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}))(Button);

export function AddExpensesForm({
  loadExpenseData,
  addExpensesForm,
  clearData,
  location,
  history,
}) {
  useInjectReducer({ key: 'addExpensesForm', reducer });
  useInjectSaga({ key: 'addExpensesForm', saga });
  const [expenseDate, setexpenseDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const { formType } = location.params;
  const { expenseId } = location.params;
  const [open, setOpen] = React.useState(false);
  let targetBtn = '';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = event => {
    event.preventDefault();
    const data = {
      expense_date: expenseDate,
      category: category,
      description: description,
      amount: amount,
    };
    if (targetBtn !== 'update') {
      // saveExpenseData(data);
      // eslint-disable-next-line no-console
    } else console.log('updated');
  };

  const onUpdate = () => {
    targetBtn = 'update';
  };

  const onCancel = () => {
    clearData();
    history.push('/');
  };

  const clear = () => {
    setexpenseDate(new Date().toISOString().split('T')[0]);
    setCategory('');
    setDescription('');
    setAmount(0);
    clearData();
  };

  useEffect(() => {
    loadExpenseData(expenseId);
    return clear();
  }, []);

  useEffect(() => {
    if (addExpensesForm.data !== '') {
      setexpenseDate(addExpensesForm.data.expense_date);
      setCategory(addExpensesForm.data.category);
      setDescription(addExpensesForm.data.description);
      setAmount(addExpensesForm.data.amount);
    }
  }, [addExpensesForm.data]);

  useEffect(() => {
    if (addExpensesForm.message) setOpen(true);
  }, [addExpensesForm.message]);

  return (
    <>
      <Wrapper>
        <Section>
          <FormattedMessage {...messages.addHeader} />
        </Section>
        <form onSubmit={onSubmit}>
          <FieldWrapper>
            <TextField
              id="description"
              label="Description"
              type="text"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 80,
              }}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <FormControl>
              <InputLabel shrink id="category-label">
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                displayEmpty
                style={{ width: '30ch' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="bills">Bills</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="amount"
              label="Amount"
              type="number"
              required
              style={{ width: '15ch' }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 0,
                maxLength: 12,
              }}
              onInput={e => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10))
                  .toString()
                  .slice(0, 12);
              }}
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <TextField
              id="date"
              label="Expense Date"
              type="date"
              style={{ width: '20ch' }}
              value={expenseDate}
              onChange={e => setexpenseDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div
              style={{
                alignSelf: 'center',
              }}
            >
              <ButtonWrapper type="button" onClick={onCancel} tabIndex="1">
                Cancel
              </ButtonWrapper>
              {formType === 'add' && (
                <ButtonWrapper name="save" type="submit" tabIndex="0">
                  Save
                </ButtonWrapper>
              )}
              {formType !== 'add' && (
                <ButtonWrapper
                  name="update"
                  type="submit"
                  tabIndex="0"
                  onClick={onUpdate}
                >
                  Update
                </ButtonWrapper>
              )}
            </div>
          </FieldWrapper>
        </form>
      </Wrapper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {addExpensesForm.message}
        </Alert>
      </Snackbar>
    </>
  );
}

AddExpensesForm.propTypes = {
  addExpensesForm: PropTypes.object.isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
  loadExpenseData: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addExpensesForm: makeSelectAddExpensesForm(),
});

const mapDispatchToProps = dispatch => ({
  loadExpenseData: (page, limit, searchText) =>
    dispatch(loadExpenseDataAction(page, limit, searchText)),
  clearData: () => dispatch(clearDataAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withTheme,
  withRouter,
)(AddExpensesForm);
