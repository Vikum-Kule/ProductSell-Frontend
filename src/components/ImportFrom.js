import { Autocomplete, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AutoCompleteFeild from '../FormComponents/AutoCompleteFeild';
import InputField from '../FormComponents/InputField'
import { getAllImportData } from '../services/Import';
import { Validators } from '../Validation/FormValidation';

function ImportFrom() {

    const[value, setValue]= useState('');
    const[itemSet, setItem]= useState([]);
    //to handle changing value
    const handleChange = (value)=>{
        console.log(value);
        setValue(value);
    }

    const loadData=async()=>{
        let importSet = await getAllImportData();
        console.log("array items",importSet);
        setItem(importSet);
    }

    return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} sx={12}>
                    <Typography mt={1} variant="h6"> Add Import Item </Typography>
                </Grid>
                {/* <Grid item item xs={12} sm={9} sx={12}>
                    <InputField
                        value={value} 
                        onChange={handleChange} 
                        type="text" 
                        label="Import Name"
                        validators={[
                            {check: Validators.required}
                        ]} />
                </Grid> */}
                <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        key="itemName"
                        value={value} 
                        dataSet={itemSet}
                        label="Import Name"
                        onClick={loadData} 
                        onChange={handleChange}  />
                </Grid>

            </Grid>
    )
}

export default ImportFrom
