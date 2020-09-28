/**
 *
 * AddExpensesForm
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddExpensesForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import CenteredSection from 'Components/CenteredSection';
import { withStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Wrapper = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  width: 50%;
  background-color: #fff;
  border-radius: .4rem;
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
    color: '#fff',
    background: theme.palette.primary.main,
    margin: '.8rem',
    '&:hover': {
      background: theme.palette.primary.dark,
    }
  },
}))(Button);

export function AddExpensesForm(props) {
  useInjectReducer({ key: 'addExpensesForm', reducer });
  useInjectSaga({ key: 'addExpensesForm', saga });
  const [expenseDate, setexpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);


  const onSave = async () => {
    // e.preventDefault();
    const data = {
      'expense_date': expenseDate,
      category: category,
      description: description,
      amount: amount
    }
    const response = await fetch('api/expense', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    response.text().then(text => alert(text));
  }

  const onCancel = () => {
    props.history.push('/');
  }

  return (
    <Wrapper>
      <Section>
        Add Expense
      </Section>
      <form onSubmit={onSave} >
        <FieldWrapper>
          <TextField
            id='description'
            label='Description'
            type='text'
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 80,
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl>
            <InputLabel shrink id='category-label'>
              Category
            </InputLabel>
            <Select
              labelId='category-label'
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              style={{ width: '30ch' }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value='food'>Food</MenuItem>
              <MenuItem value='clothing'>Clothing</MenuItem>
              <MenuItem value='bills'>Bills</MenuItem>
              <MenuItem value='others'>Others</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='amount'
            label='Amount'
            type='number'
            required
            style={{ width: '15ch' }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 0,
              maxLength: 8,
            }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
            }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            id='date'
            label='Expense Date'
            type='date'
            style={{ width: '20ch' }}
            value={expenseDate}
            onChange={(e) => setexpenseDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div style={{
            alignSelf: 'center',
          }}>
            <ButtonWrapper
              type='submit'
            >
              Save
          </ButtonWrapper>
            <ButtonWrapper
              type='button'
              onClick={onCancel}
            >
              Cancel
          </ButtonWrapper></div>
        </FieldWrapper>
      </form>
    </Wrapper>
  );
}

AddExpensesForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addExpensesForm: makeSelectAddExpensesForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

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