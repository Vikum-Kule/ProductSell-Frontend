import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GroupIcon from "@mui/icons-material/Group";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Collapse, IconButton, ListItemButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getUser } from "../Utils/Common";
import { useEffect } from "react";
import { getUnreadNotificationCount } from "../services/Notification";

const drawerWidth = 240;

const useStyles = makeStyles({
  page: {
    backgroundColor: "#f6f6f6",
    marginTop: "8vh",
  },
});

function Template({ children }) {
  const history = useHistory();
  const classes = useStyles();
  const menuId = "primary-search-account-menu";
  const [openExport, setOpenExport] = React.useState(false);
  const [openImport, setOpenImport] = React.useState(false);
  const [openSales, setOpenSales] = React.useState(false);
  const [openCustomers, setOpenCustomers] = React.useState(false);
  const [openRatails, setOpenRetails] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [user, setUser] = React.useState("");
  const [notificationCount, setNotificationCount] = React.useState(0);

  useEffect(async () => {
    let userData = getUser();
    setUser(userData.fname + " " + userData.lname);
    getUnreadNotifications();
  });

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
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  );

  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    history.push(path);
    if (index === 1) {
      handleClickImport();
    } else if (index === 6) {
      handleClickExport();
    } else if (index === 10) {
      handleClickSales();
    } else if (index === 13) {
      handleClickCustomers();
    } else if (index === 15) {
      handleClickRetails();
    }
  };

  const handleClickExport = () => {
    if (openImport) {
      setOpenImport(false);
    }
    setOpenExport(!openExport);
  };

  const handleClickImport = () => {
    if (openExport) {
      setOpenExport(false);
    }
    setOpenImport(!openImport);
  };

  const handleClickSales = () => {
    if (openSales) {
      setOpenExport(false);
      setOpenImport(false);
    }
    setOpenSales(!openSales);
  };

  const handleClickCustomers = () => {
    if (openCustomers) {
      setOpenExport(false);
      setOpenImport(false);
    }
    setOpenCustomers(!openCustomers);
  };

  const handleClickRetails = () => {
    if (openRatails) {
      setOpenExport(false);
      setOpenImport(false);
    }
    setOpenRetails(!openRatails);
  };

  const getUnreadNotifications = async () => {
    let result = await getUnreadNotificationCount();
    console.log(result);
    if(result !== "Something went wrong..."){
      setNotificationCount(result);
    }
  };

  const text = {
    fontSize: "15px",
    fontWeight: "bold",
  };
  const sub = {
    fontSize: "15px",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#fff" }}
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 25,
              margin: 0,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="logo"
            src="../images/logo.png"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label=""
              color="inherit"
              sx={{ color: "black" }}
              onClick={() => history.push("/template/notifications")}
            >
              <Badge badgeContent={notificationCount} color="error">
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
              sx={{ color: "black" }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Typography
            variant="h9"
            noWrap
            component="div"
            style={{ color: "#000" }}
          >
            Logged in as {user}
          </Typography>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fff",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton
              classes={{ selected: classes.active }}
              selected={selectedIndex == 0}
              onClick={(event) =>
                handleListItemClick(event, 0, "/template/home")
              }
              style={{
                backgroundColor: selectedIndex === 0 ? "#FDEBF1" : "#fff",
                color: selectedIndex === 0 ? "#EF5D8E" : "#000",
              }}
            >
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: text }}
                primary="Home"
              />
            </ListItemButton>
            <ListItemButton
              // onClick={handleClickImport}
              selected={
                selectedIndex == 1 ||
                selectedIndex == 2 ||
                selectedIndex == 3 ||
                selectedIndex == 4 ||
                selectedIndex == 5
              }
              onClick={(event) =>
                handleListItemClick(event, 1, "/template/im_items")
              }
              style={{
                backgroundColor:
                  selectedIndex == 1 ||
                  selectedIndex == 2 ||
                  selectedIndex == 3 ||
                  selectedIndex == 4 ||
                  selectedIndex == 5
                    ? "#FDEBF1"
                    : "#fff",
                color:
                  selectedIndex == 1 ||
                  selectedIndex == 2 ||
                  selectedIndex == 3 ||
                  selectedIndex == 4 ||
                  selectedIndex == 5
                    ? "#EF5D8E"
                    : "#000",
              }}
            >
              <ListItemIcon>
                <ArrowCircleDownIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: text }}
                primary="Import"
              />
              {openImport ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openImport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 2}
                  onClick={(event) =>
                    handleListItemClick(event, 2, "/template/im_items")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: sub }}
                    primary="Items"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 3}
                  onClick={(event) =>
                    handleListItemClick(event, 3, "/template/im_categories")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: sub }}
                    primary="Categories"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 4}
                  onClick={(event) =>
                    handleListItemClick(event, 4, "/template/im_bills")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: sub }}
                    primary="Bills"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 5}
                  onClick={(event) =>
                    handleListItemClick(event, 5, "/template/im_stockupdates")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ style: sub }}
                    primary="Stock Updates"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              selected={selectedIndex == 6 || selectedIndex == 7}
              onClick={(event) =>
                handleListItemClick(event, 6, "/template/ex_items")
              }
              style={{
                backgroundColor:
                  selectedIndex == 6 || selectedIndex == 7 || selectedIndex == 8
                    ? "#FDEBF1"
                    : "#fff",
                color:
                  selectedIndex == 6 || selectedIndex == 7 || selectedIndex == 8
                    ? "#EF5D8E"
                    : "#000",
              }}
            >
              <ListItemIcon>
                <ArrowCircleUpIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: text }}
                primary="Export"
                style={{ color: "#000" }}
              />
              {openExport ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openExport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 7}
                  onClick={(event) =>
                    handleListItemClick(event, 7, "/template/ex_items")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Products"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 8}
                  onClick={(event) =>
                    handleListItemClick(event, 8, "/template/ex_categories")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Categories"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 9}
                  onClick={(event) =>
                    handleListItemClick(event, 9, "/template/ex_production")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Production"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              selected={
                selectedIndex == 10 ||
                selectedIndex == 11 ||
                selectedIndex == 12
              }
              onClick={(event) =>
                handleListItemClick(event, 10, "/template/sale_products")
              }
              style={{
                backgroundColor:
                  selectedIndex == 10 ||
                  selectedIndex == 11 ||
                  selectedIndex == 12
                    ? "#FDEBF1"
                    : "#fff",
                color:
                  selectedIndex == 10 ||
                  selectedIndex == 11 ||
                  selectedIndex == 12
                    ? "#EF5D8E"
                    : "#000",
              }}
            >
              <ListItemIcon>
                <AttachMoneyIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: text }}
                primary="Sales"
                style={{ color: "#000" }}
              />
              {openSales ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSales} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 11}
                  onClick={(event) =>
                    handleListItemClick(event, 11, "/template/sale_products")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Sale Products"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 12}
                  onClick={(event) =>
                    handleListItemClick(event, 12, "/template/sale_bills")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Sale Bills"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
            {/*  */}
            <ListItemButton
              selected={selectedIndex == 13 || selectedIndex == 14}
              onClick={(event) =>
                handleListItemClick(event, 13, "/template/customers")
              }
              style={{
                backgroundColor:
                  selectedIndex == 13 || selectedIndex == 14
                    ? "#FDEBF1"
                    : "#fff",
                color:
                  selectedIndex == 13 || selectedIndex == 14
                    ? "#EF5D8E"
                    : "#000",
              }}
            >
              <ListItemIcon>
                <GroupIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: text }}
                primary="Customers"
                style={{ color: "#000" }}
              />
              {openCustomers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCustomers} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 14}
                  onClick={(event) =>
                    handleListItemClick(event, 14, "/template/customers")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Customers"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* */}
            <ListItemButton
              selected={
                selectedIndex == 15 ||
                selectedIndex == 16 ||
                selectedIndex == 17
              }
              onClick={(event) =>
                handleListItemClick(event, 15, "/template/sale_products")
              }
              style={{
                backgroundColor:
                  selectedIndex == 15 ||
                  selectedIndex == 16 ||
                  selectedIndex == 17
                    ? "#FDEBF1"
                    : "#fff",
                color:
                  selectedIndex == 15 ||
                  selectedIndex == 16 ||
                  selectedIndex == 17
                    ? "#EF5D8E"
                    : "#000",
              }}
            >
              <ListItemIcon>
                <AddBusinessIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ style: text }}
                primary="Retail"
                style={{ color: "#000" }}
              />
              {openRatails ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openRatails} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 16}
                  onClick={(event) =>
                    handleListItemClick(event, 16, "/template/sale_products")
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Sales Person"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={selectedIndex == 17}
                  onClick={(event) =>
                    handleListItemClick(
                      event,
                      17,
                      "/template/retail_sale_bills"
                    )
                  }
                >
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  <ListItemText
                    className={classes.menuText}
                    primary="Retail Bill"
                    style={{ color: "#000" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            {["Reports", "Trash", "Spam"].map((text, index) => (
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
  );
}

export default Template;
