import { Divider, Grid, IconButton, InputBase, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import TableItem from '../components/TableItem';
import React, {useEffect} from 'react'
import {getImportData} from '../services/Import';


const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  
  });

  

function Im_Items() {
    const classes = useStyles();
    useEffect(async () => {
      let importSet = await getImportData(0,10);
        const newSet = []
        
        for(let x=0; x< importSet.length; x++){
          let category_list = importSet[x].im_category;
          if(category_list){
            console.log("category--",category_list.category);
          }  
          newSet.push( createData(importSet[x].itemName, importSet[x].brand, category_list.category, importSet[x].qty, 2));
        }
        console.log("ImportSet",newSet);
        setRows(newSet);
    }, [])

    const [rows, setRows]= React.useState([]);

    const columns = [
        { id: 'item', label: 'Item', minWidth: 100 },
        { id: 'brand', label: 'Brand', minWidth: 100 },
        {
          id: 'category_m',
          label: 'Main Category',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'qty',
          label: 'Qty',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
      ];
      
      function createData( item, brand, category_m, qty, im_id) {
        return {  item, brand, category_m, qty, im_id };
      }

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    return (
        
            <Paper className={classes.container} elevation={8}>
                <Grid container spacing={5}>
                    <Grid item>
                          <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search items"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={12}>
                        <TableItem columns={columns} rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
                    </Grid>

                </Grid>
            </Paper>
    )
}

export default Im_Items;
