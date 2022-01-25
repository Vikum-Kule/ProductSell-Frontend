import { Box, CircularProgress, Grid, IconButton, InputBase, Pagination, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TableItem from '../components/TableItem';
import {getExportProducts} from '../services/Export'

const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  });

function Ex_Products() {
    const classes = useStyles();
    const [isLoading, setLoading]= React.useState(false);
    const [rows, setRows]= React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openForm, setOpenForm]= React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [search, setSearch] = React.useState("");

    //columns for table
    const columns = [
        { id: 'barcode', label: 'Barcode', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'extracost', label: 'Extra cost', minWidth: 100 },
        { id: 'sellprice', label: 'Price', minWidth: 100 },
        
      ];

      useEffect(async () => {
        await fetchData(search, page);
      }, [])

      const fetchData = async(keyword, pageNo)=>{
        //get import Categories data when page loading...
        setLoading(true);
      let result = await getExportProducts(pageNo, rowsPerPage, keyword);

      let productSet = result.content;
     
      //set total rows and pages
      setTotalPages(result.totalPages);

        const newSet = []
      console.log(productSet);
        for(let x=0; x< productSet.length; x++){
            setLoading(false);

          newSet.push( createDataForProducts(
            productSet[x].barcode, 
            productSet[x].name, 
            productSet[x].product_id,
            productSet[x].sellPrice
              ));
        }
        // console.log("ImportSet",newSet);
        // set rows to table
        setRows(newSet);
    }

    //creating data for rows according to Id
    function createDataForProducts( barcode, name, extracost, sellprice) {        
        return {  barcode, name, extracost, sellprice};
      }

    const handleChange = async(event, value) => {
        setPage(value-1);
        console.log("Page", page);
        await fetchData(search, value-1);
      }  

    return (
        <Paper className={classes.container} elevation={8}>
            <Grid container spacing={5}>
                    <Grid item xs={12} sm={11} sx={12}>
                      <Typography mt={1} variant="h6"> Export Products </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9} sx={12}>
                          <Paper
                            variant="outlined" 
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search products"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                // onChange={searchItem}
                                // value={search}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
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
                      dropDown={false}
                    //   getRow={getSelectedRow}
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

        </Paper>
    );
}

export default Ex_Products
