import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import {getImportItemById} from '../services/Import';
import { Grid,Paper,Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


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
    }
    else{

    } 
}



useEffect(async () => {
    fetchData(); 
  }, [])

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
