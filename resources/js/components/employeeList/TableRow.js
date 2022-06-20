import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

class Table extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(            
                <TableRow
                key={this.props.data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {this.props.data.id}
                </TableCell>
                <TableCell align="right">{this.props.data.employee_name}</TableCell>
                <TableCell align="right">{this.props.data.salary}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                </TableRow>           
        )
    }
}

export default TableRow;