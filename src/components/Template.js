import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Collapse, IconButton, ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles({
  page:{
    backgroundColor:"#f6f6f6",
    marginTop:"8vh"
  }


});

function Template({children}) {
  const history = useHistory();
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const [openExport, setOpenExport] = React.useState(false);
  const [openImport, setOpenImport] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const handleListItemClick = (event, index,path) => {
    setSelectedIndex(index);
    history.push(path);
    if(index===1){
      handleClickImport();
    }
    else if(index ===5){
      handleClickExport();
    }
  };

  const handleClickExport = () => {
    if(openImport){
      setOpenImport(false);
    }
    setOpenExport(!openExport);
  };

  const handleClickImport = () => {
    if(openExport){
      setOpenExport(false);
    }
    setOpenImport(!openImport);
  };

  const text = {
    fontSize:"15px",
    fontWeight:"bold"

  };
  const sub = {
    fontSize:"15px",

  };

    return (
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{backgroundColor:"#2f3c66"}} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Business 
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, 
            boxSizing: 'border-box', 
            backgroundColor:"#2f3c66",
            color:"white"
            },
          
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItemButton
              classes={{ selected: classes.active }}
              selected={selectedIndex==0}
              onClick={(event) => handleListItemClick(event, 0,"/template/home")}
              style={
                {
                  backgroundColor:selectedIndex==0?"#15285c":"#2f3c66"
                }
              }
            >
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ style: text }} primary="Home" />
            </ListItemButton>
            <ListItemButton 
            // onClick={handleClickImport}
            selected={selectedIndex==1 || selectedIndex==2 || selectedIndex==3 || selectedIndex==4}
              onClick={(event) => handleListItemClick(event, 1,"/template/im_items")}
              style={
                {
                  backgroundColor:(selectedIndex==1 || selectedIndex==2 || selectedIndex==3 || selectedIndex==4)?"#15285c":"#2f3c66"
                }
              }
            >
              <ListItemIcon>
                <ArrowCircleDownIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ style: text }} primary="Import" />
              {openImport ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openImport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}
                  selected={selectedIndex==2}
                  onClick={(event) => handleListItemClick(event, 2,"/template/im_items")}
                >
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ style: sub }} primary="Items" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}
                  selected={selectedIndex==3}
                  onClick={(event) => handleListItemClick(event, 3,"/template/im_categories")}
                >
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ style: sub }} primary="Categories" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}
                  selected={selectedIndex==4}
                  onClick={(event) => handleListItemClick(event, 4,"/template/im_bills")}
                >
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ style: sub }} primary="Bills" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton 
            selected={selectedIndex==5}
            onClick={(event) => handleListItemClick(event, 5,"/template/ex_products")}
            style={
              {
                backgroundColor:selectedIndex==5?"#15285c":"#2f3c66"
              }
            }
            >
              <ListItemIcon>
                <ArrowCircleUpIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ style: text }} primary="Export" />
              {openExport ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openExport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}
                  selected={selectedIndex==5}
                  onClick={(event) => handleListItemClick(event, 5,"/template/ex_products")}
                >
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText className={classes.menuText} primary="Products" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText className={classes.menuText} primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            {['Reports', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box className={classes.page} component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
    )
}

export default Template
