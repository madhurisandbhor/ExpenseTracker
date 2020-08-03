/**
 *
 * LatestExpenseList
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import PublicIcon from '@material-ui/icons/Public';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { toLength } from 'lodash';
import makeSelectLatestExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExpenseList as loadExpenseListAction } from './actions';

const ListItemWrapper = withStyles(() => ({
  root: {
    padding: '.5rem',
    fontSize: '1.4rem',
  },
}))(ListItem);

export function LatestExpenseList({
  loadExpenseList,
  latestExpenseList,
  theme,
}) {
  useInjectReducer({ key: 'latestExpenseList', reducer });
  useInjectSaga({ key: 'latestExpenseList', saga });
  const currentPage = 1;
  const limit = 10;

  useEffect(() => {
    loadExpenseList({ currentPage, limit });
  }, []);

  console.log(latestExpenseList.list);

  const categoryIcon = category => {
    let icon = <DeviceUnknownIcon />;
    if (category === 'food')
      icon = <FastfoodIcon style={{ color: theme.tracker.category.yellow }} />;
    if (category === 'clothing')
      icon = <ShoppingCartIcon style={{ color: theme.tracker.category.red }} />;
    if (category === 'bills')
      icon = <ReceiptIcon style={{ color: theme.tracker.category.blue }} />;
    if (category === 'others')
      icon = <PublicIcon style={{ color: theme.tracker.category.green }} />;
    return <Tooltip title={category}>{icon}</Tooltip>;
  };
  return (
    <>
      <List
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          maxHeight: '290px',
          maxWidth: '468px',
        }}
      >
        {latestExpenseList.list &&
          latestExpenseList.list.map(item => (
            <ListItemWrapper
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <ListItemIcon>{categoryIcon(item.category)}</ListItemIcon>
              <ListItemText
                style={{ width: '200px' }}
                primary={item.description}
                secondary={item.expense_date}
              />
              <ListItemText
                primary={`${item.amount} €`}
                style={{ alignSelf: 'right' }}
              />
            </ListItemWrapper>
          ))}
        <ListItemWrapper
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '2rem',
          }}
        >
          <Link to="/expensesList">...more</Link>
        </ListItemWrapper>
      </List>
    </>
  );
}

LatestExpenseList.propTypes = {
  loadExpenseList: PropTypes.func.isRequired,
  latestExpenseList: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  latestExpenseList: makeSelectLatestExpenseList(),
});

const mapDispatchToProps = dispatch => ({
  loadExpenseList: params => dispatch(loadExpenseListAction(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withTheme,
)(LatestExpenseList);
