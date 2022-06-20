import React from 'react'
import { v4 as uuid } from 'uuid';
import ReactToPrint from "react-to-print";


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
let dataCust = [];
let render = 0;
let indexOrder = 0;
let orderDetail = [
    {order_orid:"", order_ordate:"", order_ortype:"", order_intype:"", order_toitem:0, order_iprice:0, order_subtotal:0, order_tprice:0, 
    order_finest:"", order_dp1:0, order_dp2:0, order_dupay:0, status:"used"}
]

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

function order() {
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
    const [newDp1, setNewDp1] = React.useState(0)
    const [newDp2, setNewDp2] = React.useState(0)
    const [paymentDue, setPaymentDue]   = React.useState(0)
    const [orders, setOrders] = React.useState([])
    const [subTotal, setSubTotal]   = React.useState(0)
    // ============== CONFIRMATION ============
    const [openConfirmation, setOpenConfirmation] = React.useState(false)
    const [openEditConfirmation, setOpenEditConfirmation] = React.useState(false)
    const [pass, setPass] = React.useState(false)
    const [password, setPassword] = React.useState("")
    // ============ DP2 ==============
    const [openDp2, setOpenDp2] = React.useState(false)    
    // =========== EDIT ============
    const [openEdit, setOpenEdit] = React.useState(false)
    const [openOrderEdit, setOpenOrderEdit] = React.useState(false)
    const [idd, setIdd] = React.useState("")
    const [idd2, setIdd2] = React.useState("")
    // =========== DELETE ============
    const [openDone, setOpenDone] = React.useState(false)        
    // =========== TABLE ============
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, orderCustomer.length - page * rowsPerPage);
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
        dataDet = orderList.filter((val)=>val.order_orid == data.order_orid)    
        dataCust = orderCustomer.filter((val)=>val.order_orid == data.order_orid)
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
            setOrderType(data.order_ortype)
            setOrderIngredient(data.order_intype)
            setTotalItem(data.order_toitem)            
            setOrderDate(data.order_ordate)
            setPricePerItem(data.order_iprice)                    
        })
        dataCust.map((data)=>{
            setCustomerName(data.cs_name)
            setCustomerNumber(data.cs_number)
            setCustomerEmail(data.cs_email)
            setCustomerAddress(data.cs_address)
            setTotalPrice(data.order_tprice)
            setDp1(data.order_dp1)
            setDp2(data.order_dp2)
            setPaymentDue(data.order_dupay)   
        })
        setOpenEdit(true)
    }
    const handleOpenOrderEdit = (data) => {
        let array = []
        array = dataDet.filter((val)=>val.order_id == data.order_id)
        array.map((data)=>{
            setOrderType(data.order_ortype)
            setOrderIngredient(data.order_intype)
            setTotalItem(data.order_toitem)
            setPricePerItem(data.order_iprice)
            setSubTotal(data.order_sprice)
            setIdd(data.order_id)
        })
        setOpenOrderEdit(true)
    }

    const handleCloseEdit = () => {        
        setOpenEdit(false)
        setPass(false)
        setPassword("")
    }
    const handleCloseOrderEdit = () => {
        setOpenOrderEdit(false)
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
        setIdd(uuid().slice(0,8))
        orderDetail.map((data)=>{
            setSubTotal(prevTotal => prevTotal + parseInt(data.order_subtotal))
        })
        totalp = parseInt(totalItem)*parseInt(pricePerItem)
        if(dp1 == 0 || dp1 == ""){                                        
                totald = parseInt(subTotal)-(parseInt(0)+parseInt(dp2))
                setPaymentDue(parseInt(subTotal)-(parseInt(0)+parseInt(dp2)))
            setDp1(0)           
        }else if(dp2 == 0 || dp2 == ""){
            totald = parseInt(subTotal)-(parseInt(dp1)+parseInt(0))
            setPaymentDue(parseInt(subTotal)-(parseInt(dp1)+parseInt(0)))
            setDp2(0)
        }else if(dp1 == 0 && dp2 == 0 || dp1 == "" && dp2 == ""){
            totald = parseInt(subTotal)
            setPaymentDue(parseInt(subTotal))
            setDp1(0)
            setDp2(0)
        }else if(dp1 != "" && dp2 != ""){
            totald = parseInt(subTotal)-(parseInt(dp1)+parseInt(dp2))
        }
        setTotalPrice(totalp)
        setPaymentDue(totald)
        setOpenConfirmation(true)
    }
    const handleCloseConfirmation = () => {
        setSubTotal(0)
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
    const handleOpenDp2 = (data) => {
        let vals = dataDet.filter((val) => val.order_orid == data.order_orid)
        dataDet.map((data)=>{
            setDp1(data.order_dp1)
            setDp2(data.order_dp2)
            setPaymentDue(data.order_dupay)
        })
        setNewDp1(dp1)
        setNewDp2(dp2)
        setOpenDp2(true)
    }
    const handleCloseDp2 = () => {
        setOpenDp2(false)
    }

    // ADD
    const addOrder = (e) =>{
        e.preventDefault()       
        let order_orid = []
        let order_ordate = []
        let order_ortype = []
        let order_intype = []
        let order_toitem = []
        let order_iprice = []
        let order_sprice = []
        let order_tprice = []
        let order_finest = []
        let order_dp1 = []
        let order_dp2 = []
        let order_dupay = []

        for (let index = 0; index < orderDetail.length; index++) {
            const element = orderDetail[index];
            if(element.status != "removed"){
                order_orid.push(idd)
                order_ordate.push(moment(orderDate).format('MM-DD-YYYY'))
                order_ortype.push(element.order_ortype)
                order_intype.push(element.order_intype)
                order_toitem.push(element.order_toitem)
                order_iprice.push(element.order_iprice)
                order_sprice.push(element.order_subtotal)
                order_tprice.push(subTotal)
                order_finest.push(moment(finishEstimation).format('MM-DD-YYYY'))
                order_dp1.push(dp1)
                order_dp2.push(dp2)
                order_dupay.push((parseInt(subTotal)-(parseInt(dp1)+parseInt(dp2))))
            }
            
        }

        let data = {
            orderDate : moment(orderDate).format('MM-DD-YYYY'),
            id : idd,
            finest : finishEstimation,
            order_orid : order_orid,
            order_ordate : order_ordate,
            customerName : customerName,
            customerNumber : customerNumber,
            customerEmail : customerEmail,
            customerAddress : customerAddress,
            orderType : order_ortype,
            orderIngredient : order_intype,
            totalItem : order_toitem,
            totalSub : order_sprice,
            totalPrice : order_tprice,
            tprice: subTotal,
            finishEstimation : order_finest,
            pricePerItem : order_iprice,
            dp1 : order_dp1,
            thedp1 : dp1,            
            dp2 : order_dp2,
            thedp2:dp2,
            paymentDue : order_dupay,
            dupay : (parseInt(subTotal)-(parseInt(dp1)+parseInt(dp2)))
        }
        axios.post("/saveOrder", data).then(()=>{
            handleCloseAdd();
            // saveAnimation = setInterval(() => {
            //     setProgress((prevProgress) => prevProgress >= 100 ? 101 : prevProgress + 10);              
            // }, 10);
            window.location.href = "/Order2"
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
            
            id = data.order_orid        
        })       
        total = parseInt(dueBefore) - (parseInt(newDp1) + parseInt(newDp2))
        // if(dp2 == 0 || dp2 == "" || dp2 == null){
        //     setDp2(0)
        // }
        let data = {      
            id : id,  
            dp1 : newDp1,    
            dp2 : newDp2,
            paymentDue : total
        }
        axios.post("/updateDp2", data).then(()=>{
            handleCloseAdd();
            // saveAnimation = setInterval(() => {
            //     setProgress((prevProgress) => prevProgress >= 100 ? 101 : prevProgress + 10);              
            // }, 10);
            window.location.href = "/Order2"
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
            window.location.href = "/Order2"
        })                        
    }
    const editOrders = (e) =>{
        e.preventDefault()       
        let id = ""
        let total_price = 0
        let total_price2 = 0
        let DuePayment = 0
        let filteredData = dataDet.filter((val)=>val.order_id == idd)
        filteredData.map((data)=>{
            total_price = data.order_sprice
            setTotalPrice(prevTotal => prevTotal + parseInt(data.order_sprice))
            id = data.order_orid
        })        
        dataCust.filter((val)=>val.order_orid == id).map((data)=>{
            setDp1(data.order_dp1)
            setDp2(data.order_dp2)
        })                
        total_price2 = parseInt(totalPrice) - parseInt(total_price) + parseInt(subTotal)
        DuePayment = parseInt(total_price2)-(parseInt(dp1)+parseInt(dp2))
        console.log(dp2)
        // if(dp2 == 0 || dp2 == "" || dp2 == null){
        //     setDp2(0)
        // }
        let data = {
            id : idd,    
            idd : id,                 
            orderType : orderType,
            orderIngredient : orderIngredient,
            totalItem : totalItem,
            totalPrice : total_price2,  
            subtotal : subTotal,          
            pricePerItem : pricePerItem,         
            paymentDue : DuePayment
        }
        axios.post("/editOrders", data).then(()=>{
            handleCloseAdd();
            // saveAnimation = setInterval(() => {
            //     setProgress((prevProgress) => prevProgress >= 100 ? 101 : prevProgress + 10);              
            // }, 10);
            window.location.href = "/Order2"
        })                        
    }

    // delete
    const deleteOrder = (e) =>{
        e.preventDefault()       
        dataCust.map((data)=>{
            let id = data.order_orid
        })
        let data = {
            id : id,           
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
     
        const [orderType2, setOrderType2] = React.useState(orderDetail[data.index].order_ortype)
        const [orderIngredient2, setOrderIngredient2] = React.useState(orderDetail[data.index].order_intype)
        const [totalItem2, setTotalItem2] = React.useState(orderDetail[data.index].order_toitem)
        const [totalPrice2, setTotalPrice2] = React.useState(orderDetail[data.index].order_tprice)
        const [finishEstimation2, setFinishEstimation2] = React.useState(new Date())
        const [orderDate2, setOrderDate2] = React.useState(new Date())
        const [pricePerItem2, setPricePerItem2] = React.useState(orderDetail[data.index].order_iprice)
        const [dp12, setDp12] = React.useState(orderDetail[data.index].order_dp1)
        const [dp22, setDp22] = React.useState(orderDetail[data.index].order_dp2)
        const [paymentDue2, setPaymentDue2]   = React.useState(orderDetail[data.index].order_dupay)

        const calculationPPI = (event) => {
            orderDetail[data.index].order_subtotal = parseInt(orderDetail[data.index].order_toitem * parseInt(event.target.value))
        }
        const calculationTI = (event) => {
            orderDetail[data.index].order_subtotal = parseInt(event.target.value)*parseInt(orderDetail[data.index].order_iprice)
        }
        return(
            <div>                               
                <Grid container direction = 'row' alignItems = {'center'} justifyContent = {'center'} spacing = {2}>
                    <Grid item xl = {3} lg = {3} md = {6} sm = {12} xs = {12}>
                        <TextField variant='outlined' value = {orderType2} onInput = {(event)=>{
                            orderDetail[data.index].order_ortype = event.target.value
                            setOrderType2(event.target.value)
                        }} fullWidth label='Order Type' style = {{marginBottom:'15px'}} />
                    </Grid>
                    <Grid item xl = {3} lg = {3} md = {6} sm = {12} xs = {12}>
                        <TextField variant='outlined' value = {orderIngredient2} onInput = {(event)=>{
                            orderDetail[data.index].order_intype = event.target.value
                            setOrderIngredient2(event.target.value)
                        }} fullWidth label='Order Ingredient' style = {{marginBottom:'15px'}} />
                    </Grid>
                    <Grid item xl = {2} lg = {2} md = {6} sm = {12} xs = {12}>
                        <TextField variant='outlined' value = {pricePerItem2} onInput = {(event)=>{
                            orderDetail[data.index].order_iprice = event.target.value
                            setPricePerItem2(event.target.value)
                            calculationPPI(event)
                        }} fullWidth label='Price/Item' style = {{marginBottom:'15px'}} type = 'number' />
                    </Grid>
                    <Grid item xl = {2} lg = {2} md = {6} sm = {12} xs = {12}>
                        <TextField variant='outlined' value = {totalItem2} onInput = {(event)=>{
                            orderDetail[data.index].order_toitem = event.target.value
                            setTotalItem2(event.target.value)
                            calculationTI(event)
                        }} fullWidth label='Total Item' style = {{marginBottom:'15px'}} type = 'number' />
                    </Grid>
                    <Grid item xl = {2} lg = {2} md = {6} sm = {12} xs = {12}>
                        <Button variant = 'contained' onClick = {()=>{
                            orderDetail[data.index].status = "removed"
                            let filterData = orders.filter(currentData => currentData.index != data.index)
                            setOrders(filterData)
                        }} style = {{width : '100%', backgroundColor:'#f50057', marginBottom:'15px'}}>
                            REMOVE ITEM
                        </Button>
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
                                            dataCust.map((data)=>(
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
                                            dataCust.map((data)=>(
                                                <Typography style = {{marginBot:'10px', color:'#e4d96f'}} >
                                                    {moment(new Date()).format('MM-DD-YYYY')}
                                                </Typography>
                                            ))
                                        }                   
                                    </Grid>
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataCust.map((data)=>(
                                                <div>
                                                    <Typography style = {{color:'#e4d96f'}} >
                                                        Invoice No. :
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
                                            dataCust.map((data)=>(
                                                <Typography variant = 'h5' style = {{color:'#e4d96f', marginBottom:'35px'}}>
                                                    {data.cs_name}
                                                </Typography>
                                            ))
                                        }
                                    </Grid>                                        
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataCust.map((data)=>(
                                                <Typography style = {{}} >
                                                    <CallRoundedIcon /> {data.cs_number}
                                                </Typography> 
                                            ))
                                        }                  
                                    </Grid>
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataCust.map((data)=>(
                                                <Typography >
                                                    <EmailOutlinedIcon /> {data.cs_email}
                                                </Typography>
                                            ))
                                        }                   
                                    </Grid>  
                                    <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>                                                                      
                                        {
                                            dataCust.map((data)=>(
                                                <Typography >
                                                    <LocationOnOutlinedIcon /> {data.cs_address}
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
                                                    <StyledTableCell align="center">{"Rp. " + (parseInt(data.order_toitem)*parseInt(data.order_iprice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</StyledTableCell>                                           
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
                                        dataDet.map((data)=>{
                                            setTotalPrice(data.order_tprice)
                                            setPaymentDue(data.order_dupay)
                                            setDp1(data.order_dp1)
                                            setDp2(data.order_dp2)                                            
                                        })
                                    }
                                    <TableContainer component={Paper}>
                                                    <Table aria-label="simple table">
                                                        <TableRow style = {{backgroundColor:'#e0e0e0'}}>
                                                            <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >TOTAL       :</TableCell>
                                                            <TableCell align="center">{"Rp. " + totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                        </TableRow>
                                                        <TableRow style = {{backgroundColor:'#e4d96f'}}>
                                                            <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DPI          :</TableCell>
                                                            <TableCell align="center">{"Rp. " + dp1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                        </TableRow>
                                                        <TableRow style = {{backgroundColor:'#e0e0e0'}}>
                                                            <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DPII         :</TableCell>
                                                            <TableCell align="center">{"Rp. " + dp2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                        </TableRow>
                                                        <TableRow style = {{backgroundColor : '#e4d96f'}}>
                                                            <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>TOTAL DUE    :</TableCell>
                                                            <TableCell align="center">{"Rp. " + paymentDue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                        </TableRow>                                    
                                                    </Table>                                                
                                                </TableContainer>
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

    const calculationPPI = (event) => {
        orderDetail[0].order_subtotal = parseInt(orderDetail[0].order_toitem * parseInt(event.target.value))
    }
    const calculationTI = (event) => {
        orderDetail[0].order_subtotal = parseInt(event.target.value)*parseInt(orderDetail[0].order_iprice)
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
                                    <StyledTableCell align="center">Order ID</StyledTableCell>                                    
                                    <StyledTableCell align="center">Customer Number</StyledTableCell>                                                                        
                                    <StyledTableCell align="center">Finish Estimation</StyledTableCell>                                
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? orderCustomer.filter(data=>{
                                            if(searchName == "" && searchOrder == ""){
                                                return data
                                            }else if(data.cs_name.toLowerCase().includes(searchName.toLowerCase()) && data.order_orid.toLowerCase().includes(searchOrder.toLowerCase())){
                                                return data
                                            }else if(data.cs_name.toLowerCase().includes(searchName.toLowerCase()) && searchOrder == ""){
                                                return data
                                            }else if(searchName == "" && data.order_orid.toLowerCase().includes(searchOrder.toLowerCase())){
                                                return data
                                            }
                                        })
                                            : orderCustomer
                                        ).map((data, key) => (                                          
                                                <StyledTableRow 
                                                key={key}
                                                >
                                                <StyledTableCell component="th" scope="row">
                                                    {moment(data.created_at).format('MM-DD-YYYY')}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{data.cs_name}</StyledTableCell>
                                                <StyledTableCell align="center">{data.order_orid}</StyledTableCell>
                                                <StyledTableCell align="center">{data.cs_number}</StyledTableCell>                                                                                    
                                                <StyledTableCell align="center">{moment(data.order_finest).format('MM-DD-YYYY')}</StyledTableCell>                                    
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
                   <Grid container direction = 'row' alignItems = 'center' justifyContent={'center'} spacing = {2}>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    CUSTOMER
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        dataCust.map((data)=>(
                                            <TableContainer component={Paper}>
                                                <Table aria-label="simple table">
                                                    <TableRow>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Order Number</TableCell>
                                                        <TableCell align="center">{data.order_orid}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Name</TableCell>
                                                        <TableCell align="center">{data.cs_name}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Number</TableCell>
                                                        <TableCell align="center">{data.cs_number}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Email</TableCell>
                                                        <TableCell align="center">{data.cs_email}</TableCell>
                                                    </TableRow> 
                                                    <TableRow>
                                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Address</TableCell>
                                                        <TableCell align="center">{data.cs_address}</TableCell>
                                                    </TableRow>                                                                                                                         
                                                </Table>                                                
                                            </TableContainer>
                                        ))
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    ORDER
                                </AccordionSummary>
                                <AccordionDetails>                                   
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Order Type</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Ingredient Type</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Total Item</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Price/Item</TableCell>                                                    
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Sub Total</TableCell>                                                    
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    dataDet.map((data)=>(
                                                        <TableRow>
                                                            <TableCell align="center"> {data.order_ortype} </TableCell>
                                                            <TableCell align="center"> {data.order_intype} </TableCell>
                                                            <TableCell align="center"> {data.order_toitem} </TableCell>
                                                            <TableCell align="center"> Rp. {data.order_iprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
                                                            <TableCell align="center"> Rp. {data.order_sprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>                                                            
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>                                                
                                    </TableContainer>                                       
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    PAYMENT
                                </AccordionSummary>
                                <AccordionDetails>                                   
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Total Price</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DP 1</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>DP 2</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Payment Due</TableCell>                                                    
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    dataCust.map((data)=>(
                                                        <TableRow>
                                                            <TableCell align="center"> Rp. {data.order_tprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                                            <TableCell align="center"> Rp. {data.order_dp1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
                                                            <TableCell align="center"> Rp. {data.order_dp2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
                                                            <TableCell align="center"> Rp. {data.order_dupay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>                                                            
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>                                                
                                    </TableContainer>                                       
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                   </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant = "contained" onClick={handleClose} style={{backgroundColor:'#f50057'}}>
                        CLOSE
                    </Button>
                    {
                        dataCust.map((data)=>{                           
                            return(
                                <div>
                                    <Button variant = "contained" style = {{marginLeft:'10px'}} onClick = {()=>{handleOpenDp2(data)}}>
                                        ADD DP
                                    </Button>                                      
                                </div>
                            )                          
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
                    <Grid container direction = 'row' alignItems = "center" justifyContent={'center'} spacing = {2}>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    CUSTOMER
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction = 'row' alignItems = {'center'} justifyContent = {'center'} spacing = {2}>
                                        <Grid item xl = {4} lg = {4} md = {6} sm = {6} xs = {12}>
                                            <TextField fullWidth label = 'Customer Name' variant = 'outlined' value = {customerName} onChange = {(event)=>{setCustomerName(event.target.value)}} />
                                        </Grid>
                                        <Grid item xl = {4} lg = {4} md = {6} sm = {6} xs = {12}>
                                            <TextField fullWidth label = 'Customer Number' variant = 'outlined' value = {customerNumber} onChange = {(event)=>{setCustomerNumber(event.target.value)}} />
                                        </Grid>
                                        <Grid item xl = {4} lg = {4} md = {6} sm = {6} xs = {12}>
                                            <TextField fullWidth label = 'Customer Email' variant = 'outlined' value = {customerEmail} onChange = {(event)=>{setCustomerEmail(event.target.value)}} />
                                        </Grid>
                                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                                            <TextField fullWidth label = 'Customer Address' variant = 'outlined' value = {customerAddress} onChange = {(event)=>{setCustomerAddress(event.target.value)}} />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    ORDER
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction = 'row' alignItems = {'center'} justifyContent = {'center'} spacing = {2}>
                                        <Grid item xl = {3} lg = {3} md = {6} sm = {12} xs = {12}>
                                            <TextField variant='outlined' value = {orderType} onInput = {(event)=>{
                                                orderDetail[0].order_ortype = event.target.value
                                                setOrderType(event.target.value)
                                            }} fullWidth label='Order Type' />
                                        </Grid>
                                        <Grid item xl = {3} lg = {3} md = {6} sm = {12} xs = {12}>
                                            <TextField variant='outlined' value = {orderIngredient} onInput = {(event)=>{
                                                orderDetail[0].order_intype = event.target.value
                                                setOrderIngredient(event.target.value)
                                            }} fullWidth label='Order Ingredient' />
                                        </Grid>
                                        <Grid item xl = {2} lg = {2} md = {6} sm = {12} xs = {12}>
                                            <TextField variant='outlined' value = {pricePerItem} onInput = {(event)=>{
                                                orderDetail[0].order_iprice = event.target.value
                                                setPricePerItem(event.target.value)
                                                calculationPPI(event)
                                            }} fullWidth label='Price/Item' type="number" />
                                        </Grid>
                                        <Grid item xl = {2} lg = {2} md = {6} sm = {12} xs = {12}>
                                            <TextField variant='outlined' value = {totalItem} onInput = {(event)=>{
                                                orderDetail[0].order_toitem = event.target.value
                                                setTotalItem(event.target.value)
                                                calculationTI(event)
                                            }} fullWidth label='Total Item' type="number" />
                                        </Grid>
                                        <Grid item xl = {2} lg = {2} md = {6} sm = {12} xs = {12}>
                                            <Button variant = 'contained' onClick = {()=>{
                                                indexOrder++;
                                                setOrders(data => data.concat({index:indexOrder}))
                                                orderDetail.push({order_orid:"", order_ordate:"", order_ortype:"", order_intype:"", order_toitem:0, order_iprice:0, order_subtotal:0, order_tprice:0, 
                                                order_finest:"", order_dp1:0, order_dp2:0, order_dupay:0, status:"used"})                                                                                                
                                            }} style = {{width:'100%'}}>
                                                ADD ITEM
                                            </Button>
                                        </Grid>     
                                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                                        {
                                            orders.map((data, key)=>(
                                                <OrderItem key = {key} data = {data} />
                                            ))
                                        }
                                        </Grid>                                            
                                        <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
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
                                            <TextField style = {{width : '100%'}} variant = "outlined" label = "DP 1" onInput={(event)=>{setDp1(event.target.value)}} type="number" />
                                        </Grid>
                                        <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                            <TextField style = {{width : '100%'}} variant = "outlined" label = "DP 2" onInput={(event)=>{setDp2(event.target.value)}} type="number" />
                                        </Grid>          
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
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
                        <Grid item xl = {6} lg = {6} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    CUSTOMER
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Order Number</TableCell>
                                                <TableCell align="center">{idd}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Name</TableCell>
                                                <TableCell align="center">{customerName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Number</TableCell>
                                                <TableCell align="center">{customerNumber}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Email</TableCell>
                                                <TableCell align="center">{customerEmail}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Customer Address</TableCell>
                                                <TableCell align="center">{customerAddress}</TableCell>
                                            </TableRow>                                                                      
                                        </Table>                                                
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl = {6} lg = {6} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    PRICE
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Finish Estimation</TableCell>
                                                <TableCell align="center">{moment(finishEstimation).format('MM-DD-YYYY')}</TableCell>
                                            </TableRow> 
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Total Price</TableCell>
                                                <TableCell align="center">Rp. {parseInt(subTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >DP 1</TableCell>
                                                <TableCell align="center">Rp. {parseInt(dp1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >DP 2</TableCell>
                                                <TableCell align="center">Rp. {parseInt(dp2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" align="center" style={{fontWeight:"bolder"}} >Payment Due</TableCell>
                                                <TableCell align="center">Rp. {(parseInt(subTotal)-(parseInt(dp1)+parseInt(dp2))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                            </TableRow>                                                                                                                 
                                        </Table>                                                
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                            <Accordion expanded = {true}>
                                <AccordionSummary>
                                    ORDERS
                                </AccordionSummary>
                                <AccordionDetails>                                   
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Order Type</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Ingredient Type</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Price/Item</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Total Item</TableCell>
                                                    <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Sub Total</TableCell>                                                    
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    orderDetail.map((data)=>(
                                                        <TableRow>
                                                            <TableCell align="center"> {data.order_ortype} </TableCell>
                                                            <TableCell align="center"> {data.order_intype} </TableCell>
                                                            <TableCell align="center"> Rp. {data.order_iprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
                                                            <TableCell align="center"> {data.order_toitem} </TableCell>
                                                            <TableCell align="center"> Rp. {data.order_subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>                                                            
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>                                                
                                    </TableContainer>                                       
                                </AccordionDetails>
                            </Accordion>
                        </Grid>                       
                    </Grid>                    
                </DialogContent>
                <DialogActions>
                    <form method='post' onSubmit={addOrder}>
                        <Button variant = "contained" type='post' color = "primary">
                            SAVE
                        </Button>
                    </form>
                    {/* {(()=>{
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
                    })()} */}
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
                    <TextField value = {newDp1} fullWidth label="DP 1" onChange={(event)=>{setNewDp1(event.target.value)}} type="number" style = {{marginTop:'15px', marginBottom:'15px'}} />
                    <TextField value = {newDp2} fullWidth label="DP 2" onChange = {(event)=>{setNewDp2(event.target.value)}} type="number" />                    
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
                        CUSTOMER
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction = 'row' alignItems={'center'} justifyContent = {'center'} spacing = {2}>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {customerName} label = 'Customer Name' onChange = {(event) => {setCustomerName(event.target.value)}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {customerNumber} label = 'Customer Number' onChange = {(event) => {setCustomerNumber(event.target.value)}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {customerEmail} label = 'Customer Email' onChange = {(event) => {setCustomerEmail(event.target.value)}} />                                    
                            </Grid>
                            <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {customerAddress} label = 'Customer Address' onChange = {(event) => {setCustomerAddress(event.target.value)}} />                                    
                            </Grid>
                        </Grid>                                
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded = {true}>
                    <AccordionSummary>
                        ORDER
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Order Type</TableCell>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Ingredient Type</TableCell>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Total Item</TableCell>
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Price/Item</TableCell>                                                    
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Sub Total</TableCell>               
                                        <TableCell variant="head" align="center" style={{fontWeight:"bolder"}}>Actions</TableCell>               
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        dataDet.map((data)=>(
                                            <TableRow>
                                                <TableCell align="center"> {data.order_ortype} </TableCell>
                                                <TableCell align="center"> {data.order_intype} </TableCell>
                                                <TableCell align="center"> {data.order_toitem} </TableCell>
                                                <TableCell align="center"> Rp. {data.order_iprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
                                                <TableCell align="center"> Rp. {data.order_sprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>    
                                                <TableCell align="center"> <Button variant='contained' onClick = {()=>{handleOpenOrderEdit(data)}} >EDIT</Button> </TableCell>                                                            
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>                                                
                        </TableContainer>       
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded = {true}>
                    <AccordionSummary>
                        PAYMENT
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction = 'row' alignItems={'center'} justifyContent = {'center'} spacing = {2}>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {totalPrice} label = 'Customer Name' disabled onChange = {(event) => {setTotalPrice(event.target.value)}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {dp1} label = 'DP 1' onChange = {(event) => {setDp1(event.target.value);calculationDp1(event)}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {dp2} label = 'DP 2' onChange = {(event) => {setDp2(event.target.value);calculationDp2(event)}} />                                    
                            </Grid>
                            <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {paymentDue} label = 'Payment Due' disabled onChange = {(event) => {setPaymentDue(event.target.value)}} />                                    
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
            {/* ============== EDIT ORDER ============== */}
            <Dialog
            open={openOrderEdit}
            onClose={handleCloseOrderEdit}
            maxWidth = "lg"
            fullWidth = {true}
            aria-lablelledby = 'alert-dialog-title'
            aria-describedby = 'alert-dialog-description'
            >
                <DialogTitle>
                    EDIT ORDER
                </DialogTitle>
                <DialogContent>
                <Accordion expanded = {true}>
                    <AccordionSummary>
                        CUSTOMER
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction = 'row' alignItems={'center'} justifyContent = {'center'} spacing = {2}>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {orderType} label = 'Order Type' onChange = {(event) => {setOrderType(event.target.value)}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {orderIngredient} label = 'Order Ingredient' onChange = {(event) => {setOrderIngredient(event.target.value)}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {pricePerItem} label = 'Price/Item' onChange = {(event) => {setPricePerItem(event.target.value); parseInt(setSubTotal(parseInt(event.target.value)*parseInt(totalItem)))}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {totalItem} label = 'Total Item' onChange = {(event) => {setTotalItem(event.target.value); parseInt(setSubTotal(parseInt(pricePerItem)*parseInt(event.target.value)))}} />                                    
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField variant = "outlined" fullWidth value = {subTotal} label = 'Subtotal Item' onChange = {(event) => {setSubTotal(event.target.value)}} />                                    
                            </Grid>
                        </Grid>                                
                    </AccordionDetails>
                </Accordion>                             
                </DialogContent>
                <DialogActions>
                    <form type = 'post' onSubmit={editOrders}>
                        <Button type = 'submit' variant = 'contained'>
                            SAVE
                        </Button>
                    </form>
                    <Button variant = 'contained' onClick={handleCloseOrderEdit} style = {{marginLeft:'10px', backgroundColor:'#f50057'}}>
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

export default order