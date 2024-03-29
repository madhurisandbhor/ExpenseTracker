/**
 *
 * ExpenseList
 *
 */

import React, { memo, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CustomMaterialTable from './CustomMaterialTable';
import makeSelectExpenseList from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadExpenseList as loadExpenseListAction,
  saveExpenseData as saveExpenseDataAction,
  updateExpenseData as updateExpenseDataAction,
  deleteExpenseData as deleteExpenseDataAction,
  clearData as clearDataAction,
} from './actions';
import { InfoContext } from '../App/InfoContext';

const categories = [
  { title: 'Bills', value: 'bills' },
  { title: 'Food', value: 'food' },
  { title: 'Clothing', value: 'clothing' },
  { title: 'Others', value: 'others' },
];

export const ExpenseList = ({
  loadExpenseList,
  expenseList,
  saveExpenseData,
  updateExpenseData,
  deleteExpenseData,
  clearData,
}) => {
  useInjectReducer({ key: 'expenseList', reducer });
  useInjectSaga({ key: 'expenseList', saga });

  const searchTxt = expenseList.searchText ? expenseList.searchText : '';
  const [searchText, setSearchText] = useState(searchTxt);
  const [loading, setLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [limit, setLimit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('info');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [categoriesToSend, setCategoriesToSend] = useState([]);
  const [emptyDataSrcMsg, setEmptyDataSrcMsg] = useState('');
  const { info } = useContext(InfoContext);
  const { userId } = info;
  const loadExpenseListProps = {
    userId,
    currentPage,
    limit,
    searchText,
    fromDate,
    toDate,
    fromAmount,
    toAmount,
    categoriesToSend,
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const columns = [
    {
      field: 'expense_date',
      title: 'Expense Date',
      width: 120,
      cellStyle: {
        fontSize: '1.4rem',
      },
      render: rowData => (
        <TextField
          id="date"
          type="date"
          value={rowData.expense_date}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
        />
      ),
      // eslint-disable-next-line react/prop-types
      editComponent: ({ value = '', ...props }) => (
        <TextField
          id="date"
          type="date"
          // eslint-disable-next-line react/prop-types
          value={value}
          // eslint-disable-next-line react/prop-types
          onChange={e => props.onChange(e.target.value)}
        />
      ),
    },
    {
      field: 'description',
      title: 'Description',
      width: 300,
      cellStyle: {
        fontSize: '1.4rem',
      },
      // eslint-disable-next-line react/prop-types
      editComponent: ({ value = '', ...props }) => (
        <TextField
          id="description"
          fullWidth
          multiline
          // eslint-disable-next-line react/prop-types
          value={value}
          // eslint-disable-next-line react/prop-types
          onChange={e => props.onChange(e.target.value)}
        />
      ),
    },
    {
      field: 'category',
      title: 'Category',
      width: 150,
      cellStyle: {
        fontSize: '1.4rem',
      },
      render: rowData => (
        <Select
          id="category"
          value={rowData.category}
          style={{ width: '20ch' }}
          inputProps={{
            readOnly: true,
          }}
        >
          {categories.map(item => (
            <MenuItem key={item.title} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      ),
      // eslint-disable-next-line react/prop-types
      editComponent: ({ value = 'others', ...props }) => (
        <Select
          id="category"
          style={{ width: '20ch' }}
          // eslint-disable-next-line react/prop-types
          value={value}
          // eslint-disable-next-line react/prop-types
          onChange={e => props.onChange(e.target.value)}
        >
          {categories.map(item => (
            <MenuItem key={item.title} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: 'amount',
      title: 'Amount',
      width: 150,
      cellStyle: {
        fontSize: '1.4rem',
      },
      // eslint-disable-next-line no-unused-vars
      editComponent: ({ value = '', ...props }) => (
        <TextField
          value={value}
          // eslint-disable-next-line react/prop-types
          onChange={e => props.onChange(e.target.value)}
          // eslint-disable-next-line react/prop-types
          inputProps={{ maxLength: 8 }}
        />
      ),
    },
  ];

  const createData = item => ({
    id: item.id,
    expense_date: item.expense_date,
    description: item.description,
    category: item.category,
    amount: item.amount,
  });

  const formatterRows = () =>
    [...expenseList.list].map(item => createData(item));

  const [rows, setRows] = useState([]);

  const clear = () => {
    setMessage('');
    setOpen(false);
    clearData();
  };

  const validate = newData => {
    const msg = [];
    if (!newData.amount || parseInt(newData.amount, 10) === 0)
      msg.push('amount');
    if (!newData.description) msg.push('description');
    if (!newData.expense_date) msg.push('expense_date');
    if (msg.length !== 0) {
      msg.unshift('Invalid');
      return msg.join(' ');
    }
    if (new Date(newData.expense_date) > new Date())
      msg.push('expense date should not be future date');
    return msg;
  };

  const onAdd = newData =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const msg = validate(newData);
        const data = {
          ...newData,
          category: newData.category ? newData.category : 'others',
          user_id: userId,
        };
        if (msg.length !== 0) {
          setMessage(msg);
          setOpen(true);
          setSeverity('error');
          return reject();
        }
        const dataUpdate = [...rows];
        dataUpdate.push(data);
        setRows([...dataUpdate]);
        saveExpenseData(data);
        return resolve();
      }, 600);
    }).then(() => {
      loadExpenseList(loadExpenseListProps);
    });

  const onDelete = oldData =>
    new Promise(resolve => {
      setTimeout(() => {
        const dataUpdate = [...rows];
        dataUpdate.splice(dataUpdate.indexOf(oldData), 1);
        setRows([...dataUpdate]);
        deleteExpenseData(oldData.id);
        resolve();
      }, 600);
    }).then(() => {
      loadExpenseList(loadExpenseListProps);
    });

  const onUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const msg = validate(newData);
        if (msg.length !== 0) {
          setMessage(msg);
          setOpen(true);
          setSeverity('error');
          return reject();
        }
        const dataUpdate = [...rows];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setRows([...dataUpdate]);
        updateExpenseData(newData);
        return resolve();
      }, 600);
    }).then(() => {
      loadExpenseList(loadExpenseListProps);
    });

  const onChangeFilter = (
    ipFromDate,
    ipToDate,
    ipFromAmount,
    ipToAmount,
    ipCategoriesSelected,
  ) => {
    setLoading(true);
    setCategoriesSelected(ipCategoriesSelected);
    const categoriestoSend = ipCategoriesSelected.map(item => item.value);
    setCategoriesToSend(categoriestoSend);
    setFromDate(ipFromDate);
    setToDate(ipToDate);
    setFromAmount(ipFromAmount);
    setToAmount(ipToAmount);
  };

  const onSearch = value => {
    setSearchText(value);
  };

  useEffect(() => {
    if (!expenseList.loading) {
      setRows(formatterRows());
      setLoading(expenseList.loading);
      setTotalCount(expenseList.info.totalCount);
      const emptyDataMsg =
        !searchText &&
        !fromDate &&
        !toDate &&
        fromAmount === 0 &&
        toAmount === 0 &&
        categoriesToSend.length === 0 &&
        expenseList.list.length !== 0
          ? ''
          : 'No records to display';
      setEmptyDataSrcMsg(emptyDataMsg);
    }
  }, [expenseList.list]);

  useEffect(() => {
    if (expenseList.error || expenseList.message) {
      const msg = expenseList.error ? expenseList.error : expenseList.message;
      const alertType = expenseList.error ? 'error' : 'success';
      setMessage(msg);
      setOpen(true);
      setSeverity(alertType);
    } else {
      setMessage('');
      setOpen(false);
    }
  }, [expenseList.error, expenseList.message]);

  useEffect(() => {
    setCurrentPage(1); // whenever search text changes, set current page to 1, and show records from start
  }, [searchText]);

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        setLoading(true);
        loadExpenseList(loadExpenseListProps);
      }, 500),
    );
  }, [
    userId,
    currentPage,
    searchText,
    limit,
    fromDate,
    toDate,
    fromAmount,
    toAmount,
    categoriesToSend,
  ]);

  useEffect(() => {
    setLoading(true);
    return clear();
  }, []);

  const filterParams = {
    categoriesSelected,
    fromDate,
    toDate,
    fromAmount,
    toAmount,
    onChangeFilter,
  };

  const MatTableParams = {
    columns,
    rows,
    loading,
    onSearch,
    emptyDataSrcMsg,
    onAdd,
    onUpdate,
    onDelete,
    open,
    handleClose,
    severity,
    message,
    filterParams,
    totalCount,
    currentPage,
    limit,
    setCurrentPage,
    setLimit,
  };

  return <CustomMaterialTable {...MatTableParams} />;
};

ExpenseList.propTypes = {
  expenseList: PropTypes.object.isRequired,
  loadExpenseList: PropTypes.func.isRequired,
  saveExpenseData: PropTypes.func.isRequired,
  updateExpenseData: PropTypes.func.isRequired,
  deleteExpenseData: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenseList(),
});

const mapDispatchToProps = dispatch => ({
  loadExpenseList: params => dispatch(loadExpenseListAction(params)),
  saveExpenseData: data => dispatch(saveExpenseDataAction(data)),
  updateExpenseData: data => dispatch(updateExpenseDataAction(data)),
  deleteExpenseData: data => dispatch(deleteExpenseDataAction(data)),
  clearData: () => dispatch(clearDataAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExpenseList);
