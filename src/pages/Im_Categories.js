import { Grid, Paper, Typography } from '@mui/material'
import { typography } from '@mui/system'
import React from 'react'
import { makeStyles } from '@mui/styles';
import TableItem from '../components/TableItem';

const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  
  });

function Im_Categories() {
    const classes = useStyles();

    const [rows, setRows]= React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openForm, setOpenForm]= React.useState(false);

    //columns for table
    const columns = [
        { id: 'category', label: 'Category', minWidth: 100 },
        { id: 'subCat_1', label: 'Tag 1', minWidth: 100 },
        {
          id: 'subCat_1',
          label: 'Tag 2',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'subCat_2',
          label: 'Tag 2',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'subCat_3',
            label: 'Tag 3',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'subCat_4',
            label: 'Tag 4',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'subCat_5',
            label: 'Tag 5',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'count',
            label: 'Item Count',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
          },

      ];

    return (
        <Paper>
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={11} sx={12}>
                    <Typography mt={1} variant="h6"> Categories </Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={12}>
                    <TableItem 
                        columns={columns} 
                        rows={rows} 
                        page={page} 
                        setPage={setPage} 
                        rowsPerPage={rowsPerPage} 
                        setRowsPerPage={setRowsPerPage}/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Im_Categories
