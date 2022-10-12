import { Autocomplete, Button, CircularProgress, Grid, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import AutoCompleteFeild from '../FormComponents/AutoCompleteFeild';
import InputField from '../FormComponents/InputField'
import { getAllCategories, getAllImportData, checkCategory } from '../services/Import';
import { Validators } from '../Validation/FormValidation';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import {FormValidation} from '../Validation/FormValidation';
import Validation from '../Validation/Validation';

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
        _minRate:0,
        _importNote:''

    });

    //Reset values
    const resetValues=()=>{
        setValue({
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
            _minRate:0,
            _importNote:''
        })
    }

    // errors for inputfeild
    const[error, setError] = useState({
        _importName: '',
        _importBrand:'',
        _importMCategory:'',
        _importQty:'',
        _importUnitType:'',
    });

    //reset errors...
    const resetErrors=() =>{
        setError({});
    }

    //set error
    const submitValue= async() =>{
        setError(Validation(value));
        if(!error._importName && !error._importQty && !error._importUnitType && !error._importMCategory && !error._importBrand){
            console.log('Submit');
        
            let data = {...value};
            for(let x=1; x<6; x++){
                if(value["_subCat_"+x]==''){
                    data["_subCat_"+x] = '-';  
                }else{
                    data["_subCat_"+x] = value["_subCat_"+x];  
                }
            }

            let result = await checkCategory(data);
            console.log("result", result);
            if(result){
                // category already exist..
                
            }
            else{
                //category doesn't exist 
            }

        }
    }

    //for import itens 
    const[itemSet, setItem]= useState([]);
    //to handle changing value
    const handleChange =(name, val)=>{
        console.log(name, val);
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
        console.log(value._subCat_2);
      };

    const removeSubCategory=()=>{
        setCounter(counter - 1);
        setValue({
            ...value,
            ["_subCat_"+(counter)]: '',
        });
        console.log(counter);
    }

    //load import data when click on input feild
    const loadData=async()=>{
        resetErrors();
        let importSet = await getAllImportData();
        console.log("array items",importSet);
        setItem(importSet);
    }


    const [categories, setCategory]= useState([])
    //load category set..
    const loadCategories= async() =>{
        resetErrors();
        let categroySet = await getAllCategories();
        console.log(categroySet)
        setCategory(categroySet)
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
                        errorMsg={error._importName}
                        onchange={(event, newInputValue) =>handleChange(event, newInputValue)}  />
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        name="_importBrand"
                        _key="brand"
                        value={value._importBrand} 
                        dataSet={itemSet}
                        label="Brand"
                        errorMsg={error._importBrand}
                        onClick={loadData} 
                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        _key="category"
                        name="_importMCategory"
                        value={value._importMCategory} 
                        dataSet={categories}
                        label="Main Category"
                        onClick={loadCategories} 
                        errorMsg={error._importMCategory}
                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
                </Grid>
                {Array.from(Array(counter)).map((c, index) => {
                    
                    return <Fragment>
                                <Grid item xs={12} sm={9} sx={12} >
                                    <AutoCompleteFeild
                                        key={counter} 
                                        name={"_subCat_"+(index+1)}
                                        _key={"subCat_"+(index+1)}
                                        value={value["_subCat_"+(index+1)]} 
                                        dataSet={categories}
                                        label={"Subcategory "+(index+1)}
                                        onClick={loadData} 
                                        errorMsg={''}
                                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
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
                        name="_importQty"
                        errorMsg={error._importQty}
                        value={value._importQty} 
                        onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="number" 
                        label="Qty"
                        validators={[
                            {check: Validators.required},
                            {check: Validators.number}
                        ]} />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                    <AutoCompleteFeild
                        name="_importUnitType" 
                        _key="unitType"
                        value={value._importUnitType} 
                        dataSet={itemSet}
                        label={"Unit type"}
                        onClick={loadData}
                        errorMsg={error._importUnitType} 
                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
                </Grid>
                <Grid item item xs={12} sm={3} sx={12}>
                    <InputField
                        name="_minRate"
                        value={value._importQty} 
                        onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="number" 
                        label="Minimum Range"
                         />
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                    <InputField
                        name="_importNote"
                        value={value._importNote} 
                        onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="number" 
                        label="Note"
                        multiline={true}
                         />
                </Grid>
                <Grid item xs={12} sm={12} sx={12}>
                        <Grid container justifyContent="space-between" >
                        <Grid item xs={12} sm={4} sx={12}>
                            <Button 
                                fullWidth 
                                variant="contained"
                                onClick={submitValue}
                                >
                                Submit</Button>
                        </Grid>
                        <Grid item xs={12} sm={1} sx={12}>
                            <Button 
                             onClick={resetValues}
                             variant="outlined"
                             >Reset</Button>
                        </Grid>
                        </Grid>
                </Grid>

            </Grid>
    )
}

export default ImportFrom
