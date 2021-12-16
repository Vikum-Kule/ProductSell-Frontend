import Validation from '../Validation/Validation';
import React, { Fragment, useState } from 'react'
import InputField from '../FormComponents/InputField'
import { getAllCategories} from '../services/Import';
import { Validators } from '../Validation/FormValidation';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import AutoCompleteFeild from '../FormComponents/AutoCompleteFeild';

function Im_CategoryForm({setOpenForm}) {
    //for input feild values
    const[values, setValues]= useState({
        
        _importMCategory:'',
        _subCat_1:'',
        _subCat_2:'',
        _subCat_3:'',
        _subCat_4:'',
        _subCat_5:''

    });

    //Reset values
    const resetValues=()=>{
        setValues({
            _importMCategory:'',
            _subCat_1:'',
            _subCat_2:'',
            _subCat_3:'',
            _subCat_4:'',
            _subCat_5:''
        })
    }

    // errors for inputfeild
    const[error, setError] = useState({
        _importMCategory:'',
    });

    //reset errors...
    const resetErrors=() =>{
        setError({});
    }

    //set error
    const submitValue= async() =>{
        setError(Validation(values));
        if(!error._importMCategory){
            console.log('Submit');
        
            let data = {...values};
            for(let x=1; x<6; x++){
                if(values["_subCat_"+x]==''){
                    data["_subCat_"+x] = '-';  
                }else{
                    data["_subCat_"+x] = values["_subCat_"+x];  
                }
            }

            // await submitNewImportItem(data);
        }
    }

    //to handle changing value
    const handleChange =(name, val)=>{
        console.log(name, val);
        setValues({
            ...values,
            [name]: val,
        });
        
    }

    //to create sub category feilds dynamically
    const [counter, setCounter] = useState(0);

    const handleClickSubCategory = () => {
        if(counter!= 5){
            setCounter(counter + 1);
        }
        console.log(values._subCat_2);
      };

    const removeSubCategory=()=>{
        setCounter(counter - 1);
        setValues({
            ...values,
            ["_subCat_"+(counter)]: '',
        });
        console.log(counter);
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
                    <Typography mt={1} variant="h6"> Add Import Category </Typography>
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
                        _key="category"
                        name="_importMCategory"
                        value={values._importMCategory} 
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
                                        value={values["_subCat_"+(index+1)]} 
                                        dataSet={categories}
                                        label={"Subcategory "+(index+1)}
                                        onClick={loadCategories} 
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

export default Im_CategoryForm
