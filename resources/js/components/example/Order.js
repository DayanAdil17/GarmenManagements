import React from 'react'
import { v4 as uuid } from 'uuid';
import ReactToPrint from "react-to-print";
import Example from './index';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CircleIcon from '@mui/icons-material/Circle';

var moment = require("moment");

let dataDet = [];
let render = 0;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#e4d96f",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,      
    },
}));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
const styles = styled(TableCell)(({ theme })=>({
    [`&.${tableCellClasses.head}`]: {
        fontWeight:"bolder",
    }
}))

// let orderDetail = [
//     {customerName : "", 
//     orderType : "", orderIngredient : "", totalItem : 0, totalPrice : 0, finishEstimation : "",
//     pricePerItem : "", dp1 : 0, dp2 : 0, paymentDue : 0}
// ]

function Order() {
    // =========== DETAIL ============
    const [openDetail, setOpenDetail] = React.useState(false)
    const [detailData, setDetailData] = React.useState([])
    // =============== ADD ==============
    const [openAdd, setOpenAdd] = React.useState(false)
    const [customerName, setCustomerName] = React.useState("")
    const [customerNumber, setCustomerNumber] = React.useState("")
    const [customerEmail, setCustomerEmail] = React.useState("")
    const [customerAddress, setCustomerAddress] = React.useState("")
    const [orderType, setOrderType] = React.useState("")
    const [orderIngredient, setOrderIngredient] = React.useState("")
    const [totalItem, setTotalItem] = React.useState(0)
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [finishEstimation, setFinishEstimation] = React.useState(new Date())
    const [orderDate, setOrderDate] = React.useState(new Date())
    const [pricePerItem, setPricePerItem] = React.useState(0)
    const [dp1, setDp1] = React.useState(0)
    const [dp2, setDp2] = React.useState(0)
    const [paymentDue, setPaymentDue]   = React.useState(0)
    // ============== CONFIRMATION ============
    const [openConfirmation, setOpenConfirmation] = React.useState(false)
    const [openEditConfirmation, setOpenEditConfirmation] = React.useState(false)
    const [pass, setPass] = React.useState(false)
    const [password, setPassword] = React.useState("")
    // ============ DP2 ==============
    const [openDp2, setOpenDp2] = React.useState(false)    
    // =========== EDIT ============
    const [openEdit, setOpenEdit] = React.useState(false)
    const [idd, setIdd] = React.useState("")
    const [idd2, setIdd2] = React.useState("")
    // =========== DELETE ============
    const [openDone, setOpenDone] = React.useState(false)        
    // =========== TABLE ============
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, orderList.length - page * rowsPerPage);
    // =========== SEARCH ============
    const [searchName, setSearchName] = React.useState("")
    const [searchOrder, setSearchOrder] = React.useState("")
    // =========== TABLE ============
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    function TablePaginationActions(props) {        
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;
        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };
    
        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };
    
        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };
    
        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
        
    
        return (
            <div style={{borderBottomLeftRadius:"1vw",borderBottomRightRadius:"1vw"}}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                    style={(()=>{
                        if(page == 0){
                            return {color:"#9e9e9e"}
                        }else{
                            return {color:"white"}
                        }
                    })()}
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton 
                    style={(()=>{
                        if(page == 0){
                            return {color:"#9e9e9e"}
                        }else{
                            return {color:"white"}
                        }
                    })()} 
                    onClick={handleBackButtonClick} 
                    disabled={page === 0} 
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    style={(()=>{
                        if(page >= Math.ceil(count / rowsPerPage) - 1){
                            return {color:"#9e9e9e"}
                        }else{
                            return {color:"white"}
                        }
                    })()}
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    style={(()=>{
                        if(page >= Math.ceil(count / rowsPerPage) - 1){
                            return {color:"#9e9e9e"}
                        }else{
                            return {color:"white"}
                        }
                    })()}
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
    // INITIATION
    if(render == 0){
        render = 1
    }
    // =========== DETAIL ============
    const handleOpenDetail = (data) => {
        dataDet = orderList.filter((val)=>val.order_id == data.order_id)     
        setDetailData(dataDet)   
        setOpenDetail(true)
    }

    const handleClose = () => {  
        dataDet = [];      
        setOpenDetail(false)
        setCustomerName("")
        setOrderType("")
        setOrderIngredient("")
        setTotalItem(0)
        setTotalPrice(0)
        setOrderDate(new Date())
        setPricePerItem(0)
        setDp1(0)
        setDp2(0)
        setPaymentDue(0)
    }
    // =========== EDIT ============
    const handleOpenEdit = () => {
        dataDet.map((data)=>{
            setCustomerName(data.order_csname)   
            setOrderType(data.order_ortype)
            setOrderIngredient(data.order_intype)
            setTotalItem(data.order_toitem)
            setTotalPrice(data.order_tprice)
            setOrderDate(data.order_ordate)
            setPricePerItem(data.order_iprice)
            setDp1(data.order_dp1)
            setDp2(data.order_dp2)
            setPaymentDue(data.order_dupay)            
        })
        setOpenEdit(true)
    }

    const handleCloseEdit = () => {        
        setOpenEdit(false)
        setPass(false)
        setPassword("")
    }
     // =========== DELETE ============
     const handleOpenDelete = () => {
        dataDet.map((data)=>{
            setIdd(data.order_id)          
        })
        setOpenDone(true)
    }

    const handleCloseDelete = () => {        
        setOpenDone(false)
        setIdd("")        
    }
    // =============== ADD ==============
    const handleOpenAdd = () => {
        setOpenAdd(true)
        setIdd(uuid().slice(0,8))
    }    

    const handleCloseAdd = () => {
        setOpenAdd(false)
    }
        // DATE
    const handleChange = (newValue) => {        
        setFinishEstimation(newValue);
    };
    // ============= CONFIRMATION ============
    const handleOpenConfirmation = () => {
        let totalp = 0
        let totald = 0
        totalp = parseInt(totalItem)*parseInt(pricePerItem)
        if(dp1 == 0 || dp1 == ""){
            totald = parseInt(totalItem)*parseInt(pricePerItem)-(parseInt(0)+parseInt(dp2))
            setDp1(0)
        }else if(dp2 == 0 || dp2 == ""){
            totald = parseInt(totalItem)*parseInt(pricePerItem)-(parseInt(dp1)+parseInt(0))
            setDp2(0)
        }else if(dp1 == 0 && dp2 == 0 || dp1 == "" && dp2 == ""){
            totald = parseInt(totalItem)*parseInt(pricePerItem)
            setDp1(0)
            setDp2(0)
        }else if(dp1 != "" && dp2 != ""){
            totald = parseInt(totalItem)*parseInt(pricePerItem)-(parseInt(dp1)+parseInt(dp2))
        }
        setTotalPrice(totalp)
        setPaymentDue(totald)
        setOpenConfirmation(true)
    }
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false)
    }
    const handleOpenEditConfirmation = () => {
        setOpenEditConfirmation(true)
    }
    const handleCloseEditConfirmation = () => {
        setOpenEditConfirmation(false)
    }
    const passwordValid = (event) => {
        if(event.target.value == "cmiiw"){
            setPass(true)
        }else{
            setPass(false)
        }        
    }
    // ============== DP2 ==============
    const handleOpenDp2 = () => {
        dataDet.map((data)=>{
            setDp1(data.order_dp1)
            setDp2(data.order_dp2)
            setPaymentDue(data.order_dupay)
        })
        setOpenDp2(true)
    }
    const handleCloseDp2 = () => {
        setOpenDp2(false)
    }

    // ADD
    const addOrder = (e) =>{
        e.preventDefault()       
        setTotalPrice(parseInt(totalItem)*parseInt(pricePerItem))
        setPaymentDue(parseInt(totalItem)*parseInt(pricePerItem)-(parseInt(dp1)+parseInt(dp2)))
        setIdd(uuid().slice(0,8))
        // if(dp2 == 0 || dp2 == "" || dp2 == null){
        //     setDp2(0)
        // }
        let data = {
            orderDate : moment(orderDate).format('MM-DD-YYYY'),
            order_orid : idd,
            customerName : customerName,
            customerNumber : customerNumber,
            customerEmail : customerEmail,
            customerAddress : customerAddress,
            orderType : orderType,
            orderIngredient : orderIngredient,
            totalItem : totalItem,
            totalPrice : totalPrice,
            finishEstimation : moment(finishEstimation).format('MM-DD-YYYY'),
            pricePerItem : pricePerItem,
            dp1 : dp1,
            dp2 : dp2,
            paymentDue : paymentDue
        }
        axios.post("/addOrder", data).then(()=>{
            handleCloseAdd();
            // saveAnimation = setInterval(() => {
            //     setProgress((prevProgress) => prevProgress >= 100 ? 101 : prevProgress + 10);              
            // }, 10);
            window.location.href = "/Order"
        })                        
    }
    // UPDATE DP2
    const calculationDp2 = (event) => {
        if(event.target.value == "" || event.target.value == 0){
            setPaymentDue(parseInt(totalPrice)-parseInt(dp1))
        }else if(dp1 == "" && event.target.value == ""){
            setPaymentDue(parseInt(totalPrice))
        }else{
            setPaymentDue(parseInt(totalPrice)-(parseInt(dp1)+parseInt(event.target.value)))
        }
    }
    const calculationDp1 = (event) => {
        if(event.target.value == "" || event.target.value == 0){
            setPaymentDue(parseInt(totalPrice)-parseInt(dp2))
        }else if(dp2 == "" && event.target.value == ""){
            setPaymentDue(parseInt(totalPrice))
        }else{
            setPaymentDue(parseInt(totalPrice)-(parseInt(dp2)+parseInt(event.target.value)))
        }
    }
    const calculationPriceperItem = (event) => {
        if(event.target.value == "" || event.target.value == 0){
            setTotalPrice(0)
        }else{
            setTotalPrice(parseInt(event.target.value) * parseInt(totalItem))
            setPaymentDue(parseInt(event.target.value)*parseInt(totalItem)-(parseInt(dp1)+parseInt(dp2)))
        }
    }
    const calculationTotalItem = (event) => {
        if(event.target.value == "" || event.target.value == 0){
            setTotalPrice(0)
        }else{
            setTotalPrice(parseInt(pricePerItem) * parseInt(event.target.value))
            setPaymentDue(parseInt(event.target.value)*parseInt(pricePerItem)-(parseInt(dp1)+parseInt(dp2)))
        }
    }
    const calculationTotalPrice = (event) => {
        if(event.target.value == "" || event.target.value == 0){
            setPaymentDue(0)
        }else{
            setPaymentDue(parseInt(event.target.value))
        }
    }    
    const updateDp2 = (e) =>{
        e.preventDefault()   
        let id = 0    
        let dueBefore = 0
        let dp1Before = 0
        let dp2Before = 0
        let total = 0
        dataDet.map((data)=>{
            dueBefore = data.order_tprice
            // setPaymentDue(parseInt(dueBefore)-(parseInt(dp1)+parseInt(dp2)))
            total = parseInt(dueBefore) - (parseInt(dp1) + parseInt(dp2))
            id = data.order_id        
        })       
        // if(dp2 == 0 || dp2 == "" || dp2 == null){
        //     setDp2(0)
        // }
        let data = {      
            id : id,  
            dp1 : dp1,    
            dp2 : dp2,
            paymentDue : total
        }
        axios.post("/updateDp2", data).then(()=>{
            handleCloseAdd();
            // saveAnimation = setInterval(() => {
            //     setProgress((prevProgress) => prevProgress >= 100 ? 101 : prevProgress + 10);              
            // }, 10);
            window.location.href = "/Order"
        })                        
    }
    // edit
    const editOrder = (e) =>{
        e.preventDefault()       
        let id = 0
        dataDet.map((data)=>{
            id = data.order_id
        })
        setTotalPrice(parseInt(totalItem)*parseInt(pricePerItem))
        setPaymentDue(parseInt(totalItem)*parseInt(pricePerItem)-(parseInt(dp1)+parseInt(dp2)))
        // if(dp2 == 0 || dp2 == "" || dp2 == null){
        //     setDp2(0)
        // }
        let data = {
            id : id,
            orderDate : moment(orderDate).format('MM-DD-YYYY'),
            customerName : customerName,
            customerNumber : customerNumber,
            customerEmail : customerEmail,
            customerAddress : customerAddress,
            orderType : orderType,
            orderIngredient : orderIngredient,
            totalItem : totalItem,
            totalPrice : totalPrice,
            finishEstimation : moment(finishEstimation).format('MM-DD-YYYY'),
            pricePerItem : pricePerItem,
            dp1 : dp1,
            dp2 : dp2,
            paymentDue : paymentDue
        }
        axios.post("/editOrder", data).then(()=>{
            handleCloseAdd();
            // saveAnimation = setInterval(() => {
            //     setProgress((prevProgress) => prevProgress >= 100 ? 101 : prevProgress + 10);              
            // }, 10);
            window.location.href = "/Order"
        })                        
    }
    // delete
    const deleteOrder = (e) =>{
        e.preventDefault()       
       
        let data = {
            id : idd,           
        }
        axios.post("/deleteOrder", data).then(()=>{
            handleCloseDelete();
            // saveAnimation = setInterval(() => {
            //     setProgress((prevProgress) => prevProgress >= 100 ? 101 : prevProgress + 10);              
            // }, 10);
            window.location.href = "/Order"
        })                        
    }
    function OrderItem(props){
        const data = props.data
        return(
            <div>
                <Grid container direction={'row'} alignItems="center" justifyContent={'center'} spacing = {2}>
                    <Grid item xs = {6}>
                        <Typography variant = "h3">ABI GARMENT PRODUCTIONS</Typography>
                    </Grid>
                    <Grid item xs = {6}>
                        <Typography variant = "h3" style = {{color:'#e4d96f'}}>INVOICE</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
    class ComponentToPrint extends React.Component {    
        render() {            
            // console.log(this.props.detailData)
          return (
            <div className='print-source'>
                <Grid container direction = 'row' alignItems={'center'} justifyContent={'center'} spacing = {1}>                    
                    <Grid item xs = {1}>
                        <Grid container direction='column' alignItems={'center'} justifyContent='center'>
                            <Grid item xs= {12} style = {{backgroundColor:'#e4d96f', height:'100%'}}>
                                <div style={{borderLeft:'8px solid gold', height: '1054px'}}></div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {11} style = {{margin:'auto', padding : '20px'}}>
                        <Grid container direction = 'row' alignItems="center" justifyContent={'center'} spacing = {1}>
                            <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>
                                <Typography variant = "h4" style={{fontWeight:'bolder'}}>
                                    ABI GARMENT PRODUCTIONS
                                </Typography>
                            </Grid>
                            <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>
                                <Typography variant = "h4" style = {{color:'#e4d96f', fontWeight:'bold'}}>
                                    INVOICE
                                </Typography>
                            </Grid>
                            <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>
                                <Grid container direction = 'row' alignItems={'center'} justifyContent = {'center'}>
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                                        {
                                            dataDet.map((data)=>(
                                                <div>
                                                    <Typography variant = 'h5' style = {{color:'#e4d96f', fontWeight:'bold'}}>
                                                        Total Due :  
                                                    </Typography>
                                                    <Typography variant = 'h5' style = {{color:'#e4d96f', fontWeight:'bold'}}>
                                                        Rp.{data.order_dupay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </Typography>
                                                </div>
                                            ))
                                        }
                                    </Grid>
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                              
                                        <Typography style = {{ marginTop:'20px', color:'#e4d96f'}}>
                                            Date : 
                                        </Typography>
                                        {
                                            dataDet.map((data)=>(
                                                <Typography style = {{marginBot:'10px', color:'#e4d96f'}} >
                                                    {moment(new Date()).format('MM-DD-YYYY')}
                                                </Typography>
                                            ))
                                        }                   
                                    </Grid>
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataDet.map((data)=>(
                                                <div>
                                                    <Typography style = {{color:'#e4d96f'}} >
                                                        Invoice No. : {data.order_orid}
                                                    </Typography> 
                                                    <Typography style = {{color:'#e4d96f'}} >
                                                        {data.order_orid}
                                                    </Typography> 
                                                </div>
                                            ))
                                        }                  
                                    </Grid>
                                </Grid>                               
                            </Grid>  
                            <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>
                                <Grid container direction = 'row' alignItems = {'center'} justifyContent = {'center'}>                                       
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                                        <Typography variant = 'h5' style = {{color:'#e4d96f', fontWeight:'bold'}}>
                                            Invoice to:
                                        </Typography>
                                        {
                                            dataDet.map((data)=>(
                                                <Typography variant = 'h5' style = {{marginBottom:'35px'}}>
                                                    {data.order_csname}
                                                </Typography>
                                            ))
                                        }
                                    </Grid>                                        
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataDet.map((data)=>(
                                                <Typography style = {{}} >
                                                    <CallRoundedIcon /> {data.order_csnumb}
                                                </Typography> 
                                            ))
                                        }                  
                                    </Grid>
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataDet.map((data)=>(
                                                <Typography >
                                                    <EmailOutlinedIcon /> {data.order_csemail}
                                                </Typography>
                                            ))
                                        }                   
                                    </Grid>  
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataDet.map((data)=>(
                                                <Typography >
                                                    <LocationOnOutlinedIcon /> {data.order_csaddr}
                                                </Typography> 
                                            ))
                                        }                  
                                    </Grid>   
                                </Grid>
                            </Grid>                                                                                                                                                                                                                         
                            <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                <TableContainer component={Paper} style={{marginTop:'20px', marginBottom:'15px'}}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <StyledTableRow style={{borderTopLeftRadius:"2vw",borderTopRightRadius:"2vw"}}>
                                                <StyledTableCell><Typography style={{fontWeight:'bold'}}>DESCRIPTION</Typography></StyledTableCell>
                                                <StyledTableCell align="center"><Typography style={{fontWeight:'bold'}}>QTY</Typography></StyledTableCell>
                                                <StyledTableCell align="center"><Typography style={{fontWeight:'bold'}}>PRICE</Typography></StyledTableCell>
                                                <StyledTableCell align="center"><Typography style={{fontWeight:'bold'}}>TOTAL</Typography></StyledTableCell>                                        
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                dataDet.map((data, key)=>(
                                                    <StyledTableRow 
                                                    key={key}
                                                    >
                                                    <StyledTableCell component="th" scope="row">
                                                        {data.order_ortype + ' with ' + data.order_intype }
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{data.order_toitem}</StyledTableCell>
                                                    <StyledTableCell align="center">{"Rp. " + data.order_iprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</StyledTableCell>
                                                    <StyledTableCell align="center">{"Rp. " + data.order_tprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</StyledTableCell>                                           
                                                    </StyledTableRow>
                                                
                                                ))
                                            }                                                                                               
                                        </TableBody>                                
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                <Typography style={{color:'#e4d96f'}} >
                                    Payment Method: 
                                </Typography>                   
                            </Grid>
                            <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>                                                                      
                                <Grid container direction = 'row' alignItems={'center'} justifyContent={'center'} spacing = {2}>
                                    <Grid item xs={12}>
                                        <Typography >
                                            BCA         : 8730606118
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography >
                                            Mandiri     : 1580003438736
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography >
                                            BSI         : 7174929739
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography >
                                            Bank Aceh   : 53802200010414
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{fontWeight:'bold'}} >
                                            MUHAMMAD HIBBAN
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{fontWeight:'bold', marginTop:'20px'}} >
                                            Thank You For Purchase!
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{fontWeight:'bold', marginTop:'15px'}} >
                                            Terms and Conditions : 
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{marginLeft:'5px'}} >
                                            <CircleIcon /> barang reject dapat dikembalikan
                                        </Typography> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{marginLeft:'5px'}} >
                                            <CircleIcon /> syarat dan ketentuan berlaku
                                        </Typography> 
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>
                                <Grid container direction = 'row' alignItems={'center'} justifyContent={'center'} spacing = {2}>
                                    {
                                        dataDet.map((data)=>(
                                            <TableContainer component={Paper}>
                                                <Table aria-label="simple table">
                                                    <TableRow style = {{backgroundColor:'#e0e0e0'}}>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >TOTAL       :</TableCell>
                                                        <TableCell align="center">{"Rp. " + data.order_tprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                    </TableRow>
                                                    <TableRow style = {{backgroundColor:'#e4d96f'}}>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DPI          :</TableCell>
                                                        <TableCell align="center">{"Rp. " + data.order_dp1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                    </TableRow>
                                                    <TableRow style = {{backgroundColor:'#e0e0e0'}}>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DPII         :</TableCell>
                                                        <TableCell align="center">{"Rp. " + data.order_dp2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                    </TableRow>
                                                    <TableRow style = {{backgroundColor : '#e4d96f'}}>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>TOTAL DUE    :</TableCell>
                                                        <TableCell align="center">{"Rp. " + data.order_dupay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                    </TableRow>                                    
                                                </Table>                                                
                                            </TableContainer>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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
    
    return (
        <div>
            <Paper style = {{padding:'15px', backgroundImage:"linear-gradient(#f7e98e, #bdbdbd)"}}>
                <Grid container direction = 'row' justifyContent={'center'} alignItems = {"center"} spacing = {2}>
                    <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>                    
                        <Typography variant = 'h3'>
                            ORDER
                        </Typography>  
                    </Grid>
                    <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>
                        <Button variant = "contained" startIcon = {<AddIcon/>} onClick={()=>{handleOpenAdd()}} style = {{float:'right', marginLeft:"15px"}}>
                            ADD
                        </Button>                                     
                    </Grid>
                    <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>                    
                        <TextField variant='outlined' fullWidth label = "SEARCH NAME" value = {searchName} onChange = {(event)=>{setSearchName(event.target.value)}} />
                    </Grid>
                    <Grid item xl = {6} lg = {6} md = {6} sm = {6} xs = {6}>                    
                        <TextField variant='outlined' fullWidth label = "SEARCH ORDER NUMBER" value = {searchOrder} onChange = {(event)=>{setSearchOrder(event.target.value)}} />
                    </Grid>                    
                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                        <TableContainer component={Paper} style = {{maxHeight:"400px"}}>
                            <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                <StyledTableRow style={{borderTopLeftRadius:"2vw",borderTopRightRadius:"2vw"}}>
                                    <StyledTableCell>Order Date</StyledTableCell>
                                    <StyledTableCell align="center">Customer Name</StyledTableCell>                                    
                                    <StyledTableCell align="center">Order Type</StyledTableCell>
                                    <StyledTableCell align="center">Order Ingredient</StyledTableCell>
                                    <StyledTableCell align="center">Total Item</StyledTableCell>                                    
                                    <StyledTableCell align="center">Total Price</StyledTableCell>
                                    <StyledTableCell align="center">Finish Estimation</StyledTableCell>                                
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? orderList.filter(data=>{
                                            if(searchName == "" && searchOrder == ""){
                                                return data
                                            }else if(data.order_csname.toLowerCase().includes(searchName.toLowerCase()) && data.order_orid.toLowerCase().includes(searchOrder.toLowerCase())){
                                                return data
                                            }else if(data.order_csname.toLowerCase().includes(searchName.toLowerCase()) && searchOrder == ""){
                                                return data
                                            }else if(searchName == "" && data.order_orid.toLowerCase().includes(searchOrder.toLowerCase())){
                                                return data
                                            }
                                        })
                                            : orderList
                                        ).map((data, key) => (                                          
                                                <StyledTableRow 
                                                key={key}
                                                >
                                                <StyledTableCell component="th" scope="row">
                                                    {data.order_ordate}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{data.order_csname}</StyledTableCell>
                                                <StyledTableCell align="center">{data.order_ortype}</StyledTableCell>
                                                <StyledTableCell align="center">{data.order_intype}</StyledTableCell>
                                                <StyledTableCell align="center">{data.order_toitem}</StyledTableCell>                                    
                                                <StyledTableCell align="center">{"Rp. " + data.order_tprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</StyledTableCell>
                                                <StyledTableCell align="center">{data.order_finest}</StyledTableCell>                                    
                                                <StyledTableCell align="center"><Button 
                                                variant = "contained" 
                                                onClick={()=>{handleOpenDetail(data)}}>
                                                    Open Detail
                                                </Button></StyledTableCell>
                                                </StyledTableRow>
                                           
                                            ))}
                                    {/* {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                        </TableRow>
                                    )}                                                                          */}
                                </TableBody>
                                {/* <TableFooter style={{color:"white", align:"flex-start", margin:'auto'}}>
                                    <TableRow style={{backgroundColor:"#212121"}}>
                                        <TablePagination
                                        style={{color:"white", align:"flex-start", margin:'auto', flex:'100%'}}
                                        rowsPerPageOptions={[]}                                
                                        colSpan={9}
                                        count={orderList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}  
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}                                                            
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        // ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter> */}
                            </Table>
                        </TableContainer>
                    </Grid>                
                </Grid>
            </Paper>
            {/* ============== DIALOG DETAIL ============== */}
            <Dialog
            open={openDetail}
            onClose={handleClose}
            maxWidth = "lg"
            fullWidth = {true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Detail Order</DialogTitle>
                <DialogContent>
                    <Accordion expanded = {true}>
                        {
                            dataDet.map((data)=>(
                                <AccordionSummary>
                                    Item : {data.order_csname}
                                </AccordionSummary>
                            ))
                        }
                        <Divider />
                        <AccordionDetails>
                            {
                                dataDet.map((data)=>(
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Order Number</TableCell>
                                                <TableCell align="center">{data.order_orid}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Number</TableCell>
                                                <TableCell align="center">{data.order_csnumb}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Email</TableCell>
                                                <TableCell align="center">{data.order_csemail}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Address</TableCell>
                                                <TableCell align="center">{data.order_csaddr}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Price/Item</TableCell>
                                                <TableCell align="center">{"Rp. " + data.order_iprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DP1</TableCell>
                                                <TableCell align="center">{"Rp. " + data.order_dp1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DP2</TableCell>
                                                <TableCell align="center">{"Rp. " + data.order_dp2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Payment Due</TableCell>
                                                <TableCell align="center">{"Rp. " + data.order_dupay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>                                    
                                        </Table>                                                
                                    </TableContainer>
                                ))
                            }                    
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                    <Button variant = "contained" onClick={handleClose} style={{backgroundColor:'#f50057'}}>
                        CLOSE
                    </Button>
                    {
                        dataDet.map((data)=>{
                            if(data.order_dp2 == 0){
                                return(
                                    <div>
                                        <Button variant = "contained" style = {{marginLeft:'10px'}} onClick = {()=>{handleOpenDp2(data)}}>
                                            ADD DP
                                        </Button>                                      
                                    </div>
                                )
                            }
                        })
                    }
                    <Button variant = "contained" color = 'secondary' onClick={()=>{handleOpenEditConfirmation()}}>
                        EDIT
                    </Button>
                    <Button variant = "contained" color = 'secondary' style={{marginRight:'-5px'}} onClick={()=>{handleOpenDelete()}}>
                        DONE
                    </Button>
                    <Example detailData = {detailData} />
                </DialogActions>
            </Dialog>
            {/* ============== DIALOG ADD ORDER ============= */}
            <Dialog
            open={openAdd}
            onClose={handleCloseAdd}
            maxWidth = "lg"
            fullWidth = {true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    ADD ORDER
                </DialogTitle>
                <DialogContent>
                    <Accordion expanded = {true}>
                        <AccordionSummary>
                            DETAIL ORDER
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction='row' justifyContent = 'center' alignItems='center' spacing = {2}>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Name" onInput={(event)=>{setCustomerName(event.target.value)}} />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Phone Number" onInput={(event)=>{setCustomerNumber(event.target.value)}} />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Email" onInput={(event)=>{setCustomerEmail(event.target.value)}} />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Address" onInput={(event)=>{setCustomerAddress(event.target.value)}} />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Order Type" onInput={(event)=>{setOrderType(event.target.value)}} />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Order Ingredient" onInput={(event)=>{setOrderIngredient(event.target.value)}} />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Total Item" onInput={(event)=>{setTotalItem(event.target.value)}} type="number" />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}  style = {{width:"100%"}}>
                                        <DesktopDatePicker
                                        label="Finish Estimation"
                                        inputFormat="MM/dd/yyyy"
                                        value={finishEstimation}
                                        sx={{ width: "100%" }}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider> */}
                                    <TextField
                                        id="date"
                                        label="Finish Estimation"
                                        type="date"
                                        defaultValue={new Date()}
                                        onChange = {(event)=>{setFinishEstimation(event.target.value)}}
                                        // sx={{ width: "100%" }}
                                        fullWidth
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />                                                                                
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "Price/Item" onInput={(event)=>{setPricePerItem(event.target.value)}} type="number" />
                                </Grid>                                
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "DP 1" onInput={(event)=>{setDp1(event.target.value)}} type="number" />
                                </Grid>
                                <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                    <TextField style = {{width : '100%'}} variant = "outlined" label = "DP 2" onInput={(event)=>{setDp2(event.target.value)}} type="number" />
                                </Grid>                               
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                    <Button variant = "contained" color='primary' onClick={handleOpenConfirmation}>
                        PREVIEW ORDER
                    </Button>
                    <Button variant = "contained" onClick={handleCloseAdd} style = {{marginLeft:'10px', backgroundColor:'#f50057'}}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>            
            {/* ============== DIALOG CONFIRMATION ============= */}
            <Dialog
            open={openConfirmation}
            onClose={handleCloseConfirmation}
            maxWidth = "lg"
            fullWidth = {true}
            aria-lablelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Order Confirmation
                </DialogTitle>
                <DialogContent>
                    <Grid container direction = 'row' alignItems={'center'} justifyContent={'center'} spacing={2}>
                        <Grid item xl = {6} lg = {6} md = {6} sm = {12} xs = {12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableRow>
                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Name</TableCell>
                                    <TableCell align="center">{customerName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Order Date</TableCell>
                                    <TableCell align="center">{moment(orderDate).format('MM-DD-YYYY')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Order Type</TableCell>
                                    <TableCell align="center">{orderType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Order Ingredient</TableCell>
                                    <TableCell align="center">{orderIngredient}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Total Item</TableCell>
                                    <TableCell align="center">{totalItem}</TableCell>
                                </TableRow>    
                                <TableRow>
                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Finish Estimation</TableCell>
                                    <TableCell align="center">{moment(finishEstimation).format('MM-DD-YYYY')}</TableCell>
                                </TableRow>                                                     
                            </Table>                                                
                        </TableContainer> 
                        </Grid>
                        <Grid item xl = {6} lg = {6} md = {6} sm = {12} xs = {12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Price/Item</TableCell>
                                        <TableCell align="center">{pricePerItem}</TableCell>
                                    </TableRow>              
                                    <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Total Price</TableCell>
                                        <TableCell align="center">{totalPrice}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Total Item</TableCell>
                                        <TableCell align="center">{totalItem}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DP 1</TableCell>
                                        <TableCell align="center">{dp1}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DP 2</TableCell>
                                        <TableCell align="center">{dp2}</TableCell>
                                    </TableRow>  
                                    {/* <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Payment Due</TableCell>
                                        <TableCell align="center">{parseInt(totalItem)*parseInt(pricePerItem)-(parseInt(dp1)+parseInt(dp2))}</TableCell>
                                    </TableRow>                                                   */}
                                    <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Payment Due</TableCell>
                                        <TableCell align="center">{paymentDue}</TableCell>
                                    </TableRow>    
                                </Table>                                                
                            </TableContainer> 
                        </Grid>
                    </Grid>                    
                </DialogContent>
                <DialogActions>
                    {(()=>{
                        if(totalItem != 0 && pricePerItem != 0){
                            return(
                                <form method='post' onSubmit={addOrder}>
                                    <Button variant = "contained" type='post' color = "primary">
                                        SAVE
                                    </Button>
                                </form>
                           )
                        }else{
                            return(
                                <form method='post' onSubmit={addOrder}>
                                    <Button variant = "contained" disabled type='submit' color = "primary">
                                        SAVE
                                    </Button>
                                </form>
                            )
                        }
                    })()}
                    <Button variant = 'contained' onClick={handleCloseConfirmation} style = {{marginLeft:'10px', backgroundColor:'#f50057'}}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ============== DIALOG DP ============= */}
            <Dialog
            open={openDp2}
            onClose={handleCloseDp2}
            maxWidth = "lg"
            fullWidth = {true}
            aria-lablelledby = 'alert-dialog-title'
            aria-describedby = 'alert-dialog-description'
            >
                <DialogTitle>
                    DP
                </DialogTitle>
                <DialogContent>
                    <TextField value = {dp1} fullWidth label="DP 1" onChange = {(event)=>{setDp1(event.target.value)}} type="number" style = {{marginTop:'15px'}} />
                </DialogContent>
                <DialogContent>
                    <TextField value = {dp2} fullWidth label="DP 2" onChange = {(event)=>{setDp2(event.target.value)}} type="number" />
                </DialogContent>               
                <DialogActions>                    
                    <Button variant = "contained" style={{backgroundColor:'#f50057'}} onClick={()=>{handleCloseDp2()}}>
                        CLOSE
                    </Button>
                    <form method='post' onSubmit={updateDp2}>
                        <Button variant = "contained" type='post' color = "primary" style = {{marginLeft:'10px'}}>
                            SAVE
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
            {/* ============== EDIT PASSWORD ============= */}
            <Dialog
            open={openEditConfirmation}
            onClose={handleCloseEditConfirmation}
            maxWidth = "lg"
            fullWidth = {true}
            aria-lablelledby = 'alert-dialog-title'
            aria-describedby = 'alert-dialog-description'
            >
                <DialogTitle>
                    Please Input Password
                </DialogTitle>
                <DialogContent>
                    <TextField type={'password'} label = "Password" 
                    value = {password} fullWidth 
                    onChange = {(event)=>{setPassword(event.target.value);passwordValid(event)}} 
                    style={{marginTop:'15px'}} />
                </DialogContent>
                <DialogActions>
                    {(()=>{
                        if(pass == true){
                            return(
                                <Button variant = "contained" type='post' color = "primary" onClick={()=>{handleOpenEdit()}}>
                                NEXT
                            </Button>
                            )
                        }else{
                            return(
                                <Button variant = "contained" type='post' color = "primary" disabled>
                                EDIT
                            </Button>
                            )
                        }
                    })()}
                    <Button variant = 'contained' onClick={handleCloseEditConfirmation} style = {{marginLeft:'10px', backgroundColor:'#f50057'}}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ============== EDIT ============== */}
            <Dialog
            open={openEdit}
            onClose={handleCloseEdit}
            maxWidth = "lg"
            fullWidth = {true}
            aria-lablelledby = 'alert-dialog-title'
            aria-describedby = 'alert-dialog-description'
            >
                <DialogTitle>
                    EDIT DATA
                </DialogTitle>
                <DialogContent>
                <Accordion expanded = {true}>
                    <AccordionSummary>
                        DETAIL ORDER
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction='row' justifyContent = 'center' alignItems='center' spacing = {2}>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}  style = {{width:"100%"}}>
                                    <DesktopDatePicker
                                    label="Finish Estimation"
                                    inputFormat="MM/dd/yyyy"
                                    value={finishEstimation}
                                    sx={{ width: "100%" }}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider> */}
                                <TextField
                                    id="date"
                                    label="Finish Estimation"
                                    type="date"
                                    defaultValue={moment(orderDate).format('MM/DD/YYYY')}
                                    value={orderDate}
                                    onChange = {(event)=>{setOrderDate(event.target.value)}}
                                    // sx={{ width: "100%" }}
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                

                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Name" value = {customerName} onChange={(event)=>{setCustomerName(event.target.value)}} />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Number" value = {customerNumber} onChange={(event)=>{setCustomerNumber(event.target.value)}} />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Email" value = {customerEmail} onChange={(event)=>{setCustomerEmail(event.target.value)}} />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Customer Address" value = {customerAddress} onChange={(event)=>{setCustomerAddress(event.target.value)}} />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Order Type" value={orderType} onChange={(event)=>{setOrderType(event.target.value)}} />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Order Ingredient" value = {orderIngredient} onChange={(event)=>{setOrderIngredient(event.target.value)}} />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Total Item" value = {totalItem} onChange={(event)=>{setTotalItem(event.target.value); calculationTotalItem(event)}} type="number" />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}  style = {{width:"100%"}}>
                                    <DesktopDatePicker
                                    label="Finish Estimation"
                                    inputFormat="MM/dd/yyyy"
                                    value={finishEstimation}
                                    sx={{ width: "100%" }}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider> */}
                                <TextField
                                    id="date"
                                    label="Finish Estimation"
                                    type="date"
                                    defaultValue={moment(finishEstimation).format('MM/DD/YYYY')}
                                    value={finishEstimation}
                                    onChange = {(event)=>{setFinishEstimation(event.target.value)}}
                                    // sx={{ width: "100%" }}
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                

                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Price/Item" value = {pricePerItem} onChange={(event)=>{setPricePerItem(event.target.value); calculationPriceperItem(event)}} type="number" />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Total Price" disabled value = {totalPrice} onChange={(event)=>{setTotalPrice(event.target.value);calculationTotalPrice(event)}} type="number" />
                            </Grid>                                
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "DP 1" value = {dp1} onChange={(event)=>{setDp1(event.target.value);calculationDp1(event)}} type="number" />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "DP 2" value = {dp2} onChange={(event)=>{setDp2(event.target.value);calculationDp2(event)}} type="number" />
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField style = {{width : '100%'}} variant = "outlined" label = "Payment Due" disabled value = {paymentDue} onChange={(event)=>{setPaymentDue(event.target.value)}} type="number" />
                            </Grid>                               
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                </DialogContent>
                <DialogActions>
                    <form type = 'post' onSubmit={editOrder}>
                        <Button type = 'submit' variant = 'contained'>
                            SAVE
                        </Button>
                    </form>
                    <Button variant = 'contained' onClick={handleCloseEdit} style = {{marginLeft:'10px', backgroundColor:'#f50057'}}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ============== DELETE ============== */}
            <Dialog
            open={openDone}
            onClose={handleCloseDelete}
            maxWidth = "lg"
            fullWidth = {true}
            aria-lablelledby = 'alert-dialog-title'
            aria-describedby = 'alert-dialog-description'
            >
                {
                    dataDet.map((data)=>(
                        <DialogTitle>
                            Delete this order {data.order_orid}
                        </DialogTitle>
                    ))
                }
                <DialogContent>
                    <Typography>
                        Are your sure you want to finish this order? Make sure you have saved this order
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant = 'outlined' style = {{marginRight:'10px'}}>
                        CLOSE
                    </Button>
                    <form type = 'post' onSubmit={deleteOrder}>
                        <Button type = 'submit' variant = 'contained'>
                            DELETE
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Order