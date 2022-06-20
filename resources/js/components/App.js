import React from 'react'
import Tables from './employeeList/Tables';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import ReorderIcon from '@mui/icons-material/Reorder';

import Order from './example/Order';
import Order2 from './Order/order';
import Stock from './Stock';
import Inventory from './Inventory/Inventory';
import Allowance from './Allowance/Allowance';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  

function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar style={{backgroundColor:"#222"}} >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Garmen Management
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria_label="logout"
                            style={{float:"right"}}
                        >
                            <LogoutIcon />
                        </IconButton>
                    
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}                    
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {/* NEWTOYHUB */}
                    {/* <ListItem button onClick={handleClick}  >
                        <ListItemIcon style={{color:"#222222"}}>
                            <AirportShuttleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="NEW TOY HUB" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <a href="/index_newtoyhub">
                            <ListItem button className={classes.nested} >
                                <ListItemIcon style={{color:"#222222"}}>
                                <StorageIcon />
                                </ListItemIcon>            
                                <ListItemText primary="ALL PRODUCT" />
                            </ListItem>
                            </a>
                        </List>
                        </Collapse>
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <a href="/calendar">
                            <ListItem button className={classes.nested} >
                                <ListItemIcon style={{color:"#222222"}}>
                                <CalendarTodayTwoToneIcon />
                                </ListItemIcon>               
                                <ListItemText primary="CALENDAR" />                
                            </ListItem>
                            </a>
                        </List>
                        </Collapse>                                        
                        <Divider/> */}
                        <a href = "/Order2">
                            <ListItem >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ReorderIcon /> 
                                    </ListItemIcon>
                                    <ListItemText primary={"ORDER"} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                        <Divider />
                        <a href = "/Stock">
                            <ListItem >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <InboxIcon /> 
                                    </ListItemIcon>
                                    <ListItemText primary={"STOCK"} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                        <Divider />
                        <a href = "/Inventory">
                            <ListItem >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <InboxIcon /> 
                                    </ListItemIcon>
                                    <ListItemText primary={"INVENTORY"} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                        <Divider />
                        <a href = "/Allowance">
                            <ListItem >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <InboxIcon /> 
                                    </ListItemIcon>
                                    <ListItemText primary={"ALLOWANCE"} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                        <Divider />
                    {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        </ListItem>
                    ))} */}
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />            
                    <Router>
                        <Routes>
                            <Route path='/Order'  element={<Order/>}/>
                            <Route path='/Order2'  element={<Order2/>}/>
                            <Route path='/Stock'  element={<Stock/>}/>
                            <Route path='/Inventory'  element={<Inventory/>}/>
                            <Route path='/Allowance'  element={<Allowance/>}/>
                        </Routes>
                    </Router>        
                </Main>
            </Box>
        </div>
    )
}

export default App