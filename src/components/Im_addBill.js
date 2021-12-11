import { Divider, Grid, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { getAllBills } from '../services/Import';
import AutoCompleteFeild from '../FormComponents/AutoCompleteFeild';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from '@mui/system';
import InputField from '../FormComponents/InputField'
import SelectingTable from '../FormComponents/SelectingTable';
import {getImportData} from '../services/Import';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // height: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Im_addBill({setOpenForm}) {

    //load shop names
    const getShopNames=async()=>{
        let bill_list = await getAllBills();
        setBills(bill_list);
    }

     //for input feild values
     const[values, setValues]= useState({
        _billNo:'',
        _shop:''
    });

    //Reset values
    const resetValues=()=>{
        setValues({
            _billNo:'',
            _shop:''
        })
    }

    //dataset for bills
    const[bills, setBills]= useState([]);

    // set open table
    const [openTable, setOpenTable]= useState(false);

    // errors for inputfeild
    const[error, setError] = useState({
        _billNo:'',
        _shop:'',
    });

    const handleChange =(name, val)=>{
        console.log(name, val);
        setValues({
            ...values,
            [name]: val,
        });
        
    }

        //columns for table
            // const columns = [
            //     { id: 'item', label: 'Item', minWidth: 100 },
            //     { id: 'brand', label: 'Brand', minWidth: 100 },
            //     {
            //     id: 'category_m',
            //     label: 'Main Category',
            //     minWidth: 100,
            //     format: (value) => value.toLocaleString('en-US'),
            //     },
            //     {
            //     id: 'qty',
            //     label: 'Qty',
            //     minWidth: 100,
            //     format: (value) => value.toLocaleString('en-US'),
            //     },
            // ];

        const columns = [
        {
            id: 'item',
            numeric: false,
            disablePadding: true,
            label: 'Item',
        },
        {
            id: 'brand',
            numeric: false,
            disablePadding: true,
            label: 'Brand',
        },
        {
            id: 'category_m',
            numeric: false,
            disablePadding: true,
            label: 'Main Category',
        },
        {
            id: 'qty',
            numeric: true,
            disablePadding: true,
            label: 'Qty',
        },
        ];

      function createData( item, brand, category_m, qty, im_id) {
        return {  item, brand, category_m, qty, im_id };
      }

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [rows, setRows]= React.useState([]);
      const [selectedItems, setSelectedItems]= React.useState([]);


    const handleOpenTable=async()=>{
        setOpenTable(true);
        //get import items data when page loading...
        let importSet = await getImportData(0,10);
        const newSet = []
        
        for(let x=0; x< importSet.length; x++){
            let category_list = importSet[x].im_category;
            console.log(category_list);
            //set data in new set list to display in the table
            newSet.push( createData(importSet[x].itemName, importSet[x].brand, category_list.category, importSet[x].qty, importSet[x].importId));
        }
        // console.log("ImportSet",newSet);
        // set rows to table
        setRows(newSet);
    }

    const handleCloseTable=()=>{
        setOpenTable(false);
        console.log("selectedItems", selectedItems);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={11} sx={12}>
                <Typography mt={1} variant="h6"> Add Import Bill </Typography>
            </Grid>
            <Grid item xs={12} sm={1} sx={12}>
                <Tooltip title="Close"> 
                   <IconButton
                   onClick={()=>{setOpenForm(false)}} 
                   aria-label="close" 
                   size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item item xs={12} sm={4} sx={12}>
                    <InputField
                        name="_billNo"
                        errorMsg={error._billNo}
                        value={values._billNo} 
                        onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="text" 
                        label="Bill Number" />
            </Grid>
            <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        _key="shop"
                        name="_shop"
                        value={values._shop} 
                        dataSet={bills}
                        label="Shop"
                        onClick={getShopNames} 
                        errorMsg={error._shop}
                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
            </Grid>
            <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2}}> 
                <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={3} sx={12}>
                <Tooltip title="Add Items"> 
                   <IconButton
                   onClick={handleOpenTable} 
                   aria-label="add" 
                   size="small">
                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2}}>    
                    <Modal
                        keepMounted
                        open={openTable}
                        onClose={handleCloseTable}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Paper  sx={style} >
                            <SelectingTable
                                page={page} 
                                setPage={setPage} 
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                title="Bill Items"
                                columns={columns} 
                                rows={rows} 
                                setSelected={setSelectedItems}
                                selected={selectedItems}
                                _key="im_id"
                                setOpenTable={setOpenTable}
                            />
                        </Paper>
                    </Modal>
            </Grid>
            {/* <Grid container>
                
            </Grid> */}
            
        </Grid>
    )
}

export default Im_addBill
