/**
 *
 * Filter
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Wrapper = styled.div`
  min-height: 6.4rem;
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
  margin-bottom: 0.8rem;
`;

const FilterLabel = styled.span`
  margin-right: 2rem;
  color: ${props => props.theme.palette.primary.dark};
`;

const TxtField = withStyles(() => ({
  root: {
    margin: '0 1rem',
    '&:nth-child(3)': {
      marginLeft: '2rem',
    },
    '&:last-child': {
      marginRight: '2rem',
    },
  },
}))(TextField);

const MuiAutocomplete = withStyles(() => ({
  root: {
    width: '210px',
  },
  listbox: {
    fontSize: '1.2rem',
  },
}))(Autocomplete);

const categories = [
  { title: 'Bills', value: 'bills' },
  { title: 'Food', value: 'food' },
  { title: 'Clothing', value: 'clothing' },
  { title: 'Others', value: 'others' },
];

const Filter = ({ onChangeFilter }) => {
  const [categoriesSelected, setCategoriesSelected] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  // useEffect(() => {
  //   onChangeFilter(categoriesSelected, fromDate, toDate, fromAmount, toAmount);
  // }, [categoriesSelected, fromDate, toDate, fromAmount, toAmount]);

  const onApply = () => {
    onChangeFilter(categoriesSelected, fromDate, toDate, fromAmount, toAmount);
  };

  return (
    <Wrapper>
      <FilterLabel>Filters</FilterLabel>
      <MuiAutocomplete
        multiple
        limitTags={1}
        size="small"
        id="category-filter"
        options={categories}
        getOptionLabel={option => option.title}
        onChange={(event, value) => setCategoriesSelected(value)}
        renderInput={params => (
          <TextField {...params} variant="outlined" label="Category" />
        )}
      />
      <TxtField
        id="fromDate"
        type="date"
        label="From"
        InputLabelProps={{
          shrink: true,
        }}
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
      />
      <TxtField
        id="toDate"
        type="date"
        label="To"
        InputLabelProps={{
          shrink: true,
        }}
        value={toDate}
        onChange={e => setToDate(e.target.value)}
      />
      <TxtField
        id="amountFrom"
        label="Amount from"
        type="number"
        value={fromAmount}
        onChange={e => setFromAmount(e.target.value)}
      />
      <TxtField
        id="amountTo"
        label="Amount To"
        type="number"
        value={toAmount}
        onChange={e => setToAmount(e.target.value)}
      />
      <Button variant="outlined" onClick={onApply}>Apply</Button>
    </Wrapper>
  );
};

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};

export default memo(Filter);
