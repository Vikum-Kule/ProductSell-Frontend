import { Button, Divider, Grid, IconButton, InputBase, Pagination, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import TableItem from '../components/TableItem';
import React, {useEffect} from 'react'
import {getStockUpdateData} from '../services/Import';
import ImportFrom from '../components/ImportFrom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  container:{
      padding:"10px"
  }

});

function Im_stockupdates() {
  const classes = useStyles();
  const history = useHistory();

    useEffect(async () => {
      
      await fetchData(search, page);
        
    }, [])

    const [rows, setRows]= React.useState([]);
    const [isLoading, setLoading]= React.useState(false);
    const [totalRows, setTotalRows] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);

    //columns for table
    const columns = [
        { id: 'date', label: 'Date', minWidth: 80 },
        { id: 'item', label: 'Item', minWidth: 100 },
        { id: 'brand', label: 'Brand', minWidth: 100 },
        { id: 'billNo', label: 'Bill', minWidth: 100 },
        {
          id: 'qty',
          label: 'Qty',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'total',
          label: 'Total',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        { id: 'action', label: 'Actions', minWidth: 100 },
      ];
      
      function createData( date ,item, brand, billNo, qty, total, action, id) {
        return { date ,item, brand, qty, billNo, total, action, id};
      }

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [openForm, setOpenForm]= React.useState(false);
      const [search, setSearch] = React.useState("");

      const handleChange = async(event, value) => {
        setPage(value-1);
        console.log("Page", page);
        await fetchData(search, value-1);
      };

      //fetch data for pagination actions
      const fetchData = async(keyword, pageNo)=>{
        console.log("Fetch data", page, rowsPerPage);
        setLoading(true);
        //get import items data when page loading...
       let result = await getStockUpdateData(pageNo, 2, keyword);
       let stockUpdateSet = result.content;
       
      //set total rows and pages
      setTotalPages(result.totalPages);
      setTotalRows(result.totalElements);

        const newSet = []
      if(stockUpdateSet){
        for(let x=0; x< stockUpdateSet.length; x++){
          //set data in new set list to display in the table
          newSet.push( createData(
            stockUpdateSet[x].addedDate,
            stockUpdateSet[x].imports.itemName, 
            stockUpdateSet[x].imports.brand,
            stockUpdateSet[x].billNo,
            stockUpdateSet[x].qty,
            stockUpdateSet[x].totalPrice,
            stockUpdateSet[x].intakeId));
        }
      }  
        
      
      // set rows to table
      setRows(newSet);
      setLoading(false);
      

      }

    const searchItem= async(event, value)=>{
        setPage(0);
        setSearch(event.target.value);
        console.log(event.target.value);
        await fetchData(event.target.value,0);
        
    }

    const handleAction= (event, id)=>{
      switch(event) {
        case 'view':
          history.push('/template/stock_update_view/'+id);
          break;
        case 'edit':
          return 'bar';
        case 'delete':
          return 'bar';
        default:
          return 'foo';
      }
    }

    return (
        
            <Paper className={classes.container} elevation={8}>

              {/* import list or import from */}
              {openForm ? <ImportFrom setOpenForm={setOpenForm} />:
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={11} sx={12}>
                      <Typography mt={1} variant="h6"> Import Inventory </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9} sx={12}>
                          <Paper
                            variant="outlined" 
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search items"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                onChange={searchItem}
                                value={search}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={12}>
                    <Button 
                        variant="contained" 
                        onClick={()=>{setOpenForm(true)}}
                      >
                        Add Import
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={12}>
                    {isLoading?
                      <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                      <CircularProgress />
                    </Box>:
                    <TableItem 
                      columns={columns} 
                      rows={rows} 
                      page={page} 
                      setPage={setPage}
                      tablePagin={true} 
                      totalPages = {totalPages}
                      getData = {fetchData}
                      handleAction = {handleAction}
                      />
                    }
                        
                    </Grid>
                    <Grid item xs={12} sm={12} sx={12}>
                    <Stack spacing={3}>
                      <Pagination 
                        count={totalPages} 
                        variant="outlined" 
                        shape="rounded"  
                        size="small"
                        onChange={handleChange}
                        />
                    </Stack>
                    </Grid>

                </Grid>
              }
            </Paper>
    )
}

export default Im_stockupdates
