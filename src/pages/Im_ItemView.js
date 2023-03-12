import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import {getImportItemById, getImportStockUpdateByImportId} from '../services/Import';
import { Grid,Paper,Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TableItem from '../components/TableItem';


const useStyles = makeStyles({
    container:{
        padding:"10px"  
    }
  
  });
function Im_ItemView({ history }) {
    const classes = useStyles();
    const { importId } = useParams();
    const [importItem, setImportItem] = React.useState([]);


const fetchData= async() =>{
    let result = await getImportItemById(importId);
    if(result){
      setImportItem(result);

      setLoading(true);
      let stockUpdateSet = await getImportStockUpdateByImportId(importId);
      console.log(stockUpdateSet);

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
    else{

    } 
}



useEffect(async () => {
    fetchData(); 
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
    ];
    
    function createData( date ,item, brand, billNo, qty, total, id) {
      return { date ,item, brand, qty, billNo, total, id};
    }
      const [page, setPage] = React.useState(0);

  return (
    <Paper className={classes.container} elevation={8}>
        
    {importItem.importId?
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Import Item View</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Item Name</Typography>
            <Typography>{importItem.itemName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Brand</Typography>
            <Typography>{importItem.brand}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Product Code</Typography>
            <Typography>{importItem.product_code}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Added By</Typography>
            <Typography>{importItem.addedBy}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Added Date</Typography>
            <Typography>{importItem.addedDate}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Unit Type</Typography>
            <Typography>{importItem.unitType}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Category</Typography>
            <Typography>{importItem.im_category.category}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h7" fontWeight="700">Sub Categories</Typography>
            <Typography>
                {importItem.im_category.subCat_1}  {importItem.im_category.subCat_2} {importItem.im_category.subCat_3} {importItem.im_category.subCat_4} {importItem.im_category.subCat_5} 
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700"> Current Avl Qty</Typography>
            <Typography>{importItem.qty}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">Refill Rate</Typography>
            <Typography>{importItem.refillRate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">Note</Typography>
            <Typography>{importItem.note}</Typography>
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
                />
                    }
                        
          </Grid>
        </Grid>:
        <Grid>{importItem}</Grid>
    }
    
    </Paper>
  )
}

Im_ItemView.propTypes = {
  importId: PropTypes.any,

}

export default Im_ItemView
