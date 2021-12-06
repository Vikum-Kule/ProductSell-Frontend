import { Autocomplete, Button, CircularProgress, Grid, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import AutoCompleteFeild from '../FormComponents/AutoCompleteFeild';
import InputField from '../FormComponents/InputField'
import { getAllImportData } from '../services/Import';
import { Validators } from '../Validation/FormValidation';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

function ImportFrom({setOpenForm}) {
    //for input feild values
    const[value, setValue]= useState({
        _importName:'',
        _importBrand:'',
        _importMCategory:'',
        _subCat_1:'',
        _subCat_2:'',
        _subCat_3:'',
        _subCat_4:'',
        _subCat_5:'',
        _importQty:0,
        _importUnitType:'',
        _importNote:''

    });
    //for import itens 
    const[itemSet, setItem]= useState([]);
    //to handle changing value
    const handleChange =(name, val)=>{

        console.log(name, val)
        setValue({
            ...value,
            [name]: val,
        });
    }

    //to create sub category feilds dynamically
    const [counter, setCounter] = useState(0);

    const handleClickSubCategory = () => {
        if(counter!= 5){
            setCounter(counter + 1);
        }
        
        console.log(counter);
      };

    const removeSubCategory=()=>{
        setCounter(counter - 1);
    }
    
    // const [values, setLabel]= useState({
    //     subCat_1:'',
    //     subCat_2:'',
    //     subCat_3:'',
    //     subCat_4:'',
    //     subCat_5:''
    // });

    //load import data when click on input feild
    const loadData=async()=>{
        let importSet = await getAllImportData();
        console.log("array items",importSet);
        setItem(importSet);
    }


    return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={11} sx={12}>
                    <Typography mt={1} variant="h6"> Add Import Item </Typography>
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
                <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        name="_importName"
                        _key="itemName"
                        value={value._importName} 
                        dataSet={itemSet}
                        label="Import Name"
                        onClick={loadData} 
                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        name="_importBrand"
                        _key="brand"
                        value={value._importBrand} 
                        dataSet={itemSet}
                        label="Brand"
                        onClick={loadData} 
                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        _key="brand"
                        name="_importMCategory"
                        value={value._importMCategory} 
                        dataSet={itemSet}
                        label="Main Category"
                        onClick={loadData} 
                        onChange={(e) => handleChange(e)}  />
                </Grid>
                {Array.from(Array(counter)).map((c, index) => {
                    
                    return <Fragment>
                                <Grid item xs={12} sm={9} sx={12} >
                                    <AutoCompleteFeild
                                        key={counter} 
                                        name={"subCat_"+(index+1)}
                                        _key="brand"
                                        value={value["subCat_"+(index+1)]} 
                                        dataSet={itemSet}
                                        label={"Subcategory "+(index+1)}
                                        onClick={loadData} 
                                        onChange={(e) => handleChange(e)}  />
                                </Grid>
                                <Grid item xs={12} sm={1} sx={12}>
                                    <Tooltip title="Remove">
                                        <IconButton
                                            onClick={removeSubCategory} 
                                            aria-label="remove" 
                                            size="small">
                                            <RemoveCircleOutlineOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Fragment>
                })}
                
                <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2}}> <Divider variant="middle" /></Grid>
                <Grid item xs={12} sm={3} sx={12}>
                <Tooltip title="Add Tag"> 
                   <IconButton
                   onClick={handleClickSubCategory} 
                   aria-label="add" 
                   size="small">
                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                </Grid>
                <Grid item item xs={12} sm={3} sx={12}>
                    <InputField
                        value={value._importQty} 
                        onChange={(e) => handleChange(e)} 
                        type="number" 
                        label="Qty"
                        validators={[
                            {check: Validators.required}
                        ]} />
                </Grid>
                <Grid item item xs={12} sm={3} sx={12}>
                    <AutoCompleteFeild 
                        _key="brand"
                        value={value._importUnitType} 
                        dataSet={itemSet}
                        label={"Unit type"}
                        onClick={loadData} 
                        onChange={(e) => handleChange(e)}  />
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                    <InputField
                        value={value._importNote} 
                        onChange={(e) => handleChange(e)} 
                        type="number" 
                        label="Note"
                        multiline={true}
                         />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                    <Button variant="outlined">Submit</Button>
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                    <Button variant="outlined">Reset</Button>
                </Grid>

            </Grid>
    )
}

export default ImportFrom
