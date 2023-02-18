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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid, List, ListItem, ListItemButton, ListItemText, Pagination, Popover, Stack } from '@mui/material';



function TableItem({dropDown, 
  columns, 
  rows,
  handleAction
}) {
  
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
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  return (
                    <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {

                        if(column.id == "action"){
                          const value = row[column.id];
                          return (
                          <Grid container spacing={1} sx={{ pt: 1.5 }}>
                            <Grid item>
                              <IconButton 
                                aria-label="view"
                                size="small"
                                onClick={() => {
                                  handleAction("view",value );
                                }}
                              >
                                <VisibilityIcon fontSize="inherit" />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton 
                                aria-label="edit" 
                                size="small"
                                onClick={() => {
                                  handleAction("edit",value );
                                }}
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton 
                                aria-label="delete" 
                                size="small"
                                onClick={() => {
                                  handleAction("delete",value );
                                }}
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </Grid>
                          </Grid>  
                        );
                        }
                        else{
                          const value = row[column.id];
                          return (
                            
                              <TableCell 
                                key={column.id} 
                                align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                              
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
 
      </Paper>
    );
}

export default TableItem
