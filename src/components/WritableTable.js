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
import { List, ListItem, ListItemButton, ListItemText, Popover, TextField } from '@mui/material';
import { ViewColumn } from '@mui/icons-material';




const PopUp = ({openPopup, anchorEl, handleClose, popUpList, selectedRow})=>{
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
                  <ListItemButton
                    onClick={(e)=>items.func(selectedRow)}
                  >
                    <ListItemText primary={items.label} />
                  </ListItemButton>
                </ListItem>
                );
            })}
            </List>
        </nav>
      </Popover>
    </div>
  );
}


function WritableTable({dropDown, 
  tablePagin, 
  columns, 
  rows,
  setRows, 
  page, setPage, rowsPerPage, setRowsPerPage, popUpList}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectRow]= React.useState(null);

  const handleClick =(event, row) => {
    console.log(row);
    if(popUpList){
      setOpenpopup(true);
      setAnchorEl(event.currentTarget);
      setSelectRow(row);
    }
    else{
    //   getRow(row);
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

    const handleChange =(event, row, column_id, value)=>{
      console.log( row[column_id]);
      row[column_id]= value; 
      setRows([
          ...rows,
          row
      ]);
      
  }
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    const [openPopup, setOpenpopup] = React.useState(false);
  
    return (
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
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
                .map((row,index) => {
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
                        const selected = row;
                        return (
                          
                            <TableCell 
                              key={column.id} 
                              align={column.align}  
                              onClick={(event)=>{handleClick(event, row)}}>
                            {column.editable?
                               <TextField
                               onChange={(event)=>handleChange(event,row, column.id, event.target.value)}
                               label={column.label}
                               id="outlined-size-small"
                               size="small"
                               type={column.type}
                               value={column.isDecimal? parseFloat(value).toFixed(2)
                                  : value
                                }
                             />:(column.editable === false && column.format && typeof value === 'number'
                             ? column.format(value)
                             : value)

                            }
                              
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
                selectedRow={selectedRow}
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

export default WritableTable
