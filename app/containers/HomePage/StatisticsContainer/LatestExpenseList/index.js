/**
 *
 * LatestExpenseList
 *
 */

import React, { memo, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
import makeSelectLatestExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExpenseList as loadExpenseListAction } from './actions';
import { InfoContext } from '../../../App/InfoContext';
import NoDataMsg from '../NoDataMsg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

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
  const { info } = useContext(InfoContext);
  const { userId } = info;
  const currentPage = 1;
  const limit = 6;

  useEffect(() => {
    loadExpenseList({ currentPage, limit, userId });
  }, []);

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
      {latestExpenseList.list && latestExpenseList.list.length > 0 ? (
        <List
          style={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: '290px',
            maxWidth: '468px',
          }}
        >
          {latestExpenseList.list.map(item => (
            <ListItemWrapper
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              key={item.id}
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
          {latestExpenseList.list.length < limit ? null : (
            <ListItemWrapper
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: '2rem',
              }}
            >
              <Link to="/expensesList">...more</Link>
            </ListItemWrapper>
          )}
        </List>
      ) : (
        <Wrapper>
          <NoDataMsg> No data available</NoDataMsg>
        </Wrapper>
      )}
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
