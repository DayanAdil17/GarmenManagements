import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Order from './Order'

class ComponentToPrint extends React.Component {    
  render() {            
      console.log(this.props.detailData)
    return (
      <div className='print-source'>
          Test
      </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <Button variant = "contained" color='primary' style = {{marginLeft : '10px'}}>Print</Button>}
          content={() => this.componentRef}
        />
            <div style = {{display : "none"}}>
                <ComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
      </div>
    );
  }
}

export default Example;
