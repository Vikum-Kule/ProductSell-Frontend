import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import {getImportBillById} from '../services/Import';
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
function Im_BillView({ history }) {
    const classes = useStyles();
    const { billId } = useParams();
    const [importBill, setImportBill] = React.useState([]);


const fetchData= async() =>{
    let result = await getImportBillById(billId);
    if(result){
      setImportBill(result);

      setLoading(true);
      let billItemSet = result.import_billItems;
      console.log(billItemSet);
    
      const newSet = []
      if(billItemSet){
        for(let x=0; x< billItemSet.length; x++){
          //set data in new set list to display in the table
          newSet.push( createData(
            billItemSet[x].importStockIntake.imports.product_code,
            billItemSet[x].importStockIntake.imports.itemName, 
            billItemSet[x].importStockIntake.imports.brand,
            billItemSet[x].bill_qty,
            billItemSet[x].discount_perItem,
            billItemSet[x].pricePerItem,
            billItemSet[x].price,
            billItemSet[x].itemId));
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
      { id: 'productCode', label: 'Product Code', minWidth: 80 },
      { id: 'item', label: 'Item', minWidth: 100 },
      { id: 'brand', label: 'Brand', minWidth: 100 },
      {
        id: 'qty',
        label: 'Qty',
        minWidth: 100,
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'discountPerItem',
        label: 'Discount',
        minWidth: 100,
        format: (value) => value.toLocaleString('en-US')
      },
      {
        id: 'pricePerItem',
        label: 'Price Per Item',
        minWidth: 100,
        format: (value) => value.toLocaleString('en-US')
      },
      {
        id: 'totalPrice',
        label: 'Total Price',
        minWidth: 100,
        format: (value) => value.toLocaleString('en-US'),
      },
    ];
    
    function createData( productCode, item, brand, qty, discountPerItem, pricePerItem, totalPrice, id) {
      return {productCode, item, brand, qty, discountPerItem, pricePerItem, totalPrice, id};
    }
      const [page, setPage] = React.useState(0);

  return (
    <Paper className={classes.container} elevation={8}>
        
    {importBill.bill_id?
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Import Bill View {importBill.billNo}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h7" fontWeight="700">Bill Added By</Typography>
            <Typography>{importBill.addedBy}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Bill Date</Typography>
            <Typography>{importBill.createdDate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">Shop</Typography>
            <Typography>{importBill.shop}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Discount</Typography>
            <Typography>{importBill.discount}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">Total</Typography>
            <Typography>{importBill.total}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">Note</Typography>
            <Typography>{importBill.note}</Typography>
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
        <Grid>{importBill}</Grid>
    }
    
    </Paper>
  )
}

Im_BillView.propTypes = {
  importId: PropTypes.any,

}

export default Im_BillView;
