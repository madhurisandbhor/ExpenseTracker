/**
 *
 * ExpenseGrid
 *
 */

import React, { useState, memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';
import {
    SearchState,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const HeaderCell = withStyles({
    cell: {
        padding: '1rem',
        '&:first-child': {
            paddingLeft: '1.6rem',
        },
        '&:nth-last-child(3)': {
            paddingLeft: '1.6rem',
            paddingRight: '1.6rem',
        },
        '&:nth-last-child(2)': {
            paddingLeft: '1rem',
            paddingRight: 0,
        }
    },
})(TableHeaderRow.Cell);

const CellWrapper = withStyles({
    cell: {
        padding: '0 1rem',
        '&:first-child': {
            paddingLeft: '1.6rem',
        },
        '&:nth-last-child(3)': {
            paddingLeft: '1.6rem',
            paddingRight: '1.6rem',
        },
        '&:nth-last-child(2)': {
            paddingLeft: '1.6rem',
            paddingRight: 0,
        }
    },
})(Table.Cell);

const IconButtonWrapper = withStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
        order: 1,
        background: '#fff',
        '&:hover': {
            background: theme.palette.primary.main,
            color: '#fff',
        },
        '&:hover + .add_text': {
            opacity: 1,
            visibility: 'visible',
        },
    },
}))(IconButton);

export const ExpenseGrid = ({ rows, searchText, setSearchText, onEditExpense, onDeleteExpense }) => {

    const [columns] = useState([
        { name: 'expenseDate', title: 'Expense Date' },
        { name: 'description', title: 'Description' },
        { name: 'category', title: 'Category' },
        { name: 'amount', title: 'Amount' },
        { name: 'edit', title: 'Edit' },
        { name: 'delete', title: 'Delete' },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'amount', align: 'right' },
    ]);

    const defaultColumnWidths = [
        { columnName: 'expenseDate', width: 150 },
        { columnName: 'description', width: 380 },
        { columnName: 'category', width: 150 },
        { columnName: 'amount', width: 150 },
        { columnName: 'edit', width: 85 },
        { columnName: 'delete', width: 82 },
    ];

    const Cell = forwardRef((props, ref) => {
        const { column, row } = props;

        if (column.name === 'edit') {
            return (
                <CellWrapper ref={ref}>
                    <IconButtonWrapper aria-label="edit expense" onClick={() => onEditExpense(row.id)}>
                        <EditIcon fontSize="small" />
                    </IconButtonWrapper>
                </CellWrapper>
            );
        }
        if (column.name === 'delete') {
            return (
                <CellWrapper ref={ref}>
                    <IconButtonWrapper aria-label="delete expense" onClick={() => onDeleteExpense(row.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButtonWrapper>
                </CellWrapper>
            );
        }
        return <CellWrapper ref={ref} {...props} />;
    });


    return (
        <Grid
            rows={rows}
            columns={columns}
            noDataText='loading data'
        >
            <SearchState
                value={searchText}
                onValueChange={setSearchText}
            />
            <SortingState
            // defaultSorting={[{ columnName: 'expenseDate', direction: 'desc' }]}
            />
            <IntegratedSorting />
            <Table
                columnExtensions={tableColumnExtensions}
                cellComponent={Cell}
            />
            <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
            <TableHeaderRow cellComponent={HeaderCell} showSortingControls />
            <Toolbar />
            <SearchPanel />
        </Grid>
    )
};

ExpenseGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    searchText: PropTypes.string,
    setSearchText: PropTypes.func,
    onEditExpense: PropTypes.func,
    onDeleteExpense: PropTypes.func,
};

export default memo(ExpenseGrid);