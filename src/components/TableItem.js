import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';




const PopUp = ({openPopup, anchorEl, handleClose, popUpList})=>{
  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Popover
        // id={id}
        open={openPopup}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
         <nav aria-label="secondary mailbox folders">
           <List>
            {popUpList.map((items) => {
                return (
                  <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={items.label} />
                  </ListItemButton>
                </ListItem>
                            // <TableCell 
                            //   key={column.id} 
                            //   align={column.align}  
                            //   onClick={handleClick}>
                            //   {column.format && typeof value === 'number'
                            //     ? column.format(value)
                            //     : value}
                            // </TableCell>
                            
                );
            })}
            </List>
          {/* <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List> */}
        </nav>
      </Popover>
    </div>
  );
}


function TableItem({dropDown, tablePagin, columns, rows, page, setPage, rowsPerPage, setRowsPerPage, popUpList}) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if(popUpList){
      setOpenpopup(true);
      setAnchorEl(event.currentTarget);
    }
    
  };

  const handleClose = () => {
    if(popUpList){
      setOpenpopup(false);
      setAnchorEl(null);
    }
    
  };
    
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    const [openPopup, setOpenpopup] = React.useState(false);
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {dropDown ?
                  <TableCell>
                  </TableCell>: null
                }
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                      {dropDown?
                        <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>:null
                      }
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          
                            <TableCell 
                              key={column.id} 
                              align={column.align}  
                              onClick={handleClick}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                            
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
           {openPopup && popUpList?
              <PopUp 
                popUpList={popUpList}
                openPopup={openPopup} 
                anchorEl={anchorEl} 
                handleClose={handleClose}
                />: null
            }
        </TableContainer>
        {tablePagin?
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />: null}
      </Paper>
    );
}

export default TableItem
