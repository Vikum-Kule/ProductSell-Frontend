import { Button, Divider, Grid, IconButton, InputBase, Pagination, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import TableItem from '../../../components/TableItem';
import React, {useEffect,useState} from 'react'
import {getStockUpdateData} from '../../../services/Import';
import ImportFrom from '../../Imports/ImportItem/ImportFrom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router';
import InputField from '../../../FormComponents/InputField'

const useStyles = makeStyles({
  container:{
      padding:"10px"
  }

});

function Im_stockupdates() {
  const classes = useStyles();
  const history = useHistory();

    useEffect(async () => {
      
      await fetchData();
        
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

      const handleChange = async(event, value) => {
        setPage(value-1);
        console.log("Page", page);
        await fetchData(filter, value-1);
      };

      //fetch data for pagination actions
      const fetchData = async()=>{
        setLoading(true);
        console.log(filter);
        //get import items data when page loading...
       let result = await getStockUpdateData(page, rowsPerPage, filter);
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

      // filter values
      const[filter, setFilter]= useState({
        _productCode:'',
        _itemName:'',
        _brand:'',
        _addedBy:'',
        _billNo:'',

    });

    //reset filters
    const resetFilters =()=>{
      setFilter({
        _productCode:'',
        _itemName:'',
        _brand:'',
        _addedBy:'',
        _billNo:'',
    });

    fetchData();
    }

     //to handle changing filters
     const handleFilterChange =(name, val)=>{
      setFilter({
          ...filter,
          [name]: val,
      });
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
                    <Grid item xs={12} sm={10} sx={12}>
                      <Typography mt={1} variant="h6"> Import Stock Updates </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={12}>
                      <Button 
                          variant="contained" 
                          onClick={()=>{setOpenForm(true)}}
                        >
                          Add Intake
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={9} sx={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={3} sx={12}>
                          <InputField
                            name="_productCode"
                            value={filter._productCode} 
                            onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                            type="text" 
                            label="Product Code"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={12}>
                          <InputField
                            name="_itemName"
                            value={filter._itemName} 
                            onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                            type="text" 
                            label="Item Name"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={12}>
                          <InputField
                            name="_brand"
                            value={filter._brand} 
                            onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                            type="text" 
                            label="Brand"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={12}>
                          <InputField
                            name="_addedBy"
                            value={filter._addedBy} 
                            onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                            type="text" 
                            label="Added By"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={12}>
                          <InputField
                            name="_billNo"
                            value={filter._billNo} 
                            onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                            type="text" 
                            label="Bill Number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={12}>
                          <Stack direction="row" spacing={2}>
                            <Button 
                              variant="contained" 
                              onClick={()=>{resetFilters()}}
                            >
                             Reset
                            </Button>
                            <Button 
                              variant="contained" 
                              onClick={()=>{fetchData()}}
                            >
                             Filter
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>  
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
                      showActions={['view', 'edit', 'delete']}
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
