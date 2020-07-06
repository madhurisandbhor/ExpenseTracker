/**
 *
 * Pagination
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const Wrapper = styled.div`
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
    color: theme.tracker.white,
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

const Pagination = ({ nextLink, prevLink, currentPage, pagesCount, onNavigationClick }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

Pagination.propTypes = {
  nextLink: PropTypes.string.isRequired,
  prevLink: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  onNavigationClick: PropTypes.func,
};

export default memo(Pagination);
