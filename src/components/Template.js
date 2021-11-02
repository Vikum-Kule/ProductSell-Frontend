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
import { Collapse, ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles({
  appbar: {
    backgroundColor: "red"
  }

});

function Template() {

  const classes = useStyles();
  const [openExport, setOpenExport] = React.useState(false);
  const [openImport, setOpenImport] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if(index===1){
      handleClickImport();
    }
    else if(index ===2){
      handleClickExport();
    }
  };

  const handleClickExport = () => {
    setOpenExport(!openExport);
  };

  const handleClickImport = () => {
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
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
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
              onClick={(event) => handleListItemClick(event, 0)}
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
            selected={selectedIndex==1}
              onClick={(event) => handleListItemClick(event, 1)}
              style={
                {
                  backgroundColor:selectedIndex==1?"#15285c":"#2f3c66"
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
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ style: sub }} primary="Items" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ style: sub }} primary="Categories" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ style: sub }} primary="Bills" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton 
            selected={selectedIndex==2}
            onClick={(event) => handleListItemClick(event, 2)}
            style={
              {
                backgroundColor:selectedIndex==2?"#15285c":"#2f3c66"
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
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText className={classes.menuText} primary="Starred" />
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
      </Box>
    </Box>
    )
}

export default Template
