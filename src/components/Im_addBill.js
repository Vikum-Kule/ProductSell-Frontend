import { Divider, Grid, IconButton, Modal, Paper, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { getAllBills } from '../services/Import';
import AutoCompleteFeild from '../FormComponents/AutoCompleteFeild';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from '@mui/system';
import InputField from '../FormComponents/InputField'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
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
    const [openTable, setOpenTable]= useState(true);

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

    const handleOpenTable=()=>{
        setOpenTable(true);
    }

    const handleCloseTable=()=>{
        setOpenTable(false);
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
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        </Paper>
                    </Modal>
            </Grid>
            {/* <Grid container>
                
            </Grid> */}
            
        </Grid>
    )
}

export default Im_addBill
