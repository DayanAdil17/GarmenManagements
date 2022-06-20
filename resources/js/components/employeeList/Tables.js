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

class Tables extends Component {

    constructor(props){
        super(props);

        this.state = {
            employee: [],
        }
    }

    //Life cycle method.
    componentDidMount() {
        this.getEmployeeList();
    }

    // Get employee List
    getEmployeeList = () => {
        let self = this;
        axios.get('/get/employee/list').then(function(response){
            self.setState({
                employee: response.data
            });
        });
    }

    render(){
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Employee Id</TableCell>
                            <TableCell align="right">Employee Name</TableCell>
                            <TableCell align="right">Employee Salary</TableCell>
                            <TableCell align="right">Actions</TableCell>                                                        
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.employee.map(function(data, key) {
                                    return(
                                        <TableRow key={key} data={data} />
                                    )
                                })
                            }                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
          )
    }
}
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default Tables