/**
 *
 * Expense By Select
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const ExpenseByWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const WeekDash = styled.span`
  margin: 0 1rem;
`;
const Btn = withStyles(() => ({
  root: {
    minWidth: '2rem',
    height: '2rem',
    margin: '0 .2rem .2rem .2rem',
    fontSize: '2rem',
  },
}))(Button);

const Links = styled.span`
  margin: 0 1rem;
`;

const ExpenseBySelect = ({ expenseBy, setExpenseBy }) => {
  const [weekStartDate, setWeekStartDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [weekEndDate, setWeekEndDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const [prevLinkDisabled, setPrevLinkDisabled] = useState(false);
  const [nextLinkDisabled, setNextLinkDisabled] = useState(false);
  const [expenseByYear, setExpenseByYear] = useState(new Date().getFullYear());

  const onSelectionChange = event => {
    setExpenseBy(event.target.value);

    const currDate = new Date();
    const first = currDate.getDate() - currDate.getDay();
    const last = first + 6;
    const firstDay = new Date(currDate.setDate(first))
      .toISOString()
      .split('T')[0];
    const lastDay = new Date(currDate.setDate(last))
      .toISOString()
      .split('T')[0];

    setWeekStartDate(firstDay);
    setWeekEndDate(lastDay);
    setNextLinkDisabled(true);
  };

  const onNavigationClick = link => {
    const startDate = new Date(weekStartDate);
    const endDate = new Date(weekEndDate);
    const currDate = new Date();

    if (expenseBy === 'weekly') {
      if (link === 'prev') {
        startDate.setDate(startDate.getDate() - 7);
        endDate.setDate(endDate.getDate() - 7);
      } else {
        startDate.setDate(startDate.getDate() + 7);
        endDate.setDate(endDate.getDate() + 7);
      }
      setWeekStartDate(startDate.toISOString().split('T')[0]);
      setWeekEndDate(endDate.toISOString().split('T')[0]);

      if (
        endDate.getDate() >= currDate.getDate() &&
        endDate.getMonth() >= currDate.getMonth() &&
        endDate.getFullYear() >= currDate.getFullYear()
      )
        setNextLinkDisabled(true);
      else setNextLinkDisabled(false);
      // setPrevLinkDisabled - TODO: disable conditionally
    }

    if (expenseBy === 'monthly') {
      let year = 0;
      if (link === 'prev') year = expenseByYear - 1;
      else year = expenseByYear + 1;
      setExpenseByYear(year);

      if (year >= currDate.getFullYear()) setNextLinkDisabled(true);
      else setNextLinkDisabled(false);
    }
  };

  return (
    <ExpenseByWrapper>
      {expenseBy !== 'yearly' && (
        <Links>
          <Tooltip title="Previous">
            <span>
              <Btn
                onClick={() => onNavigationClick('prev')}
                disabled={prevLinkDisabled}
              >
                &#8249;
              </Btn>
            </span>
          </Tooltip>
          {expenseBy === 'weekly' && (
            <>
              <TextField
                type="date"
                value={weekStartDate}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
                style={{
                  marginRight: '-6.5rem',
                }}
              />
              <WeekDash>-</WeekDash>
              <TextField
                type="date"
                value={weekEndDate}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
                style={{
                  marginRight: '-6.5rem',
                }}
              />
            </>
          )}
          {expenseBy === 'monthly' && (
            <TextField
              type="text"
              value={expenseByYear}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
              style={{
                width: '3.3rem',
              }}
            />
          )}
          <Tooltip title="Next">
            <span>
              <Btn
                onClick={() => onNavigationClick('next')}
                disabled={nextLinkDisabled}
              >
                &#8250;
              </Btn>
            </span>
          </Tooltip>
        </Links>
      )}

      <Select
        id="expense_distribution"
        value={expenseBy}
        style={{ width: '10ch' }}
        onChange={event => onSelectionChange(event)}
      >
        <MenuItem value="yearly">Yearly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
      </Select>
    </ExpenseByWrapper>
  );
};

ExpenseBySelect.propTypes = {
  setExpenseBy: PropTypes.func.isRequired,
  expenseBy: PropTypes.string.isRequired,
};

export default memo(ExpenseBySelect);
