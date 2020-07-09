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

const Filter = ({
  categoriesSelected,
  fromDate,
  toDate,
  fromAmount,
  toAmount,
  onChangeFilter,
}) => {
  const [ipFromDate, setIpFromDate] = useState(fromDate);
  const [ipToDate, setIpToDate] = useState(toDate);
  const [ipFromAmount, setIpFromAmount] = useState(fromAmount);
  const [ipToAmount, setIpToAmount] = useState(toAmount);
  const [ipCategoriesSelected, setIpCategoriesSelected] = useState(
    categoriesSelected,
  );

  const onApply = () => {
    onChangeFilter(
      ipFromDate,
      ipToDate,
      ipFromAmount,
      ipToAmount,
      ipCategoriesSelected,
    );
  };

  const onClear = () => {
    setIpCategoriesSelected([]);
    setIpFromDate('');
    setIpToDate('');
    setIpFromAmount(0);
    setIpToAmount(0);
    onChangeFilter('', '', 0, 0, []);
  };

  return (
    <Wrapper>
      {/* <FilterLabel>Filters</FilterLabel> */}
      <MuiAutocomplete
        multiple
        limitTags={1}
        size="small"
        id="category-filter"
        options={categories}
        getOptionLabel={option => option.title}
        value={ipCategoriesSelected}
        onChange={(event, value) => setIpCategoriesSelected(value)}
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
        value={ipFromDate}
        onChange={e => setIpFromDate(e.target.value)}
      />
      <TxtField
        id="toDate"
        type="date"
        label="To"
        InputLabelProps={{
          shrink: true,
        }}
        value={ipToDate}
        onChange={e => setIpToDate(e.target.value)}
      />
      <TxtField
        id="amountFrom"
        label="Amount from"
        type="number"
        value={ipFromAmount}
        onChange={e => setIpFromAmount(e.target.value)}
      />
      <TxtField
        id="amountTo"
        label="Amount To"
        type="number"
        value={ipToAmount}
        onChange={e => setIpToAmount(e.target.value)}
      />
      <Button variant="outlined" onClick={onApply}>
        Apply
      </Button>
      <Button variant="outlined" onClick={onClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

Filter.propTypes = {
  categoriesSelected: PropTypes.array,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  fromAmount: PropTypes.number,
  toAmount: PropTypes.number,
  onChangeFilter: PropTypes.func.isRequired,
};

export default memo(Filter);
