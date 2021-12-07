import { Grid, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// const filter = createFilterOptions();


function AutoCompleteFeild({name, errorMsg, key, _key, value, label, dataSet ,onchange, onClick}) {

    const [error, setError] = useState(false);
    // const[value, setValue]= useState('');
    

    // const handleChange =(event) =>{
    //      const {value} = event.target;
    //     //  setError(FormValidation(validators,value));
    //      onChange(event);
    // }
    const handleClick=(event)=>{
        onClick();
    }

    

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} sx={12}>
                    <Autocomplete
                        size="small"
                        freeSolo
                        fullWidth
                        value={value}
                        onChange={(event, newValue) => {
                        // setValue(newValue || "");
                        onchange(name, newValue || "");
                        }}
                        // onChange={handleChange(newValue)}
                        inputValue={value}
                        onInputChange={(event, newInputValue) => {
                        // setValue(newInputValue);
                        onchange(name, newInputValue)
                        }}
                        // onInputChange={handleChange}
                        id="controllable-states-demo"
                        options={ Array.from(dataSet).map( i =>i[_key]).filter((value, index, self) => self.indexOf(value) === index) }
                        
                        renderInput={(params) => <TextField
                            error={errorMsg}
                            fullWidth 
                            name={name}
                            onClick={handleClick} 
                            {...params} 
                            label={label} />}
                            key={key}
                        
                    />
                </Grid>
                <Grid item xs={12} sm={12} sx={12}>
                <Typography variant="caption" display="block" gutterBottom color='red'>
                    {errorMsg}
                </Typography>
                </Grid>
            </Grid>
        </div>
    )
}


AutoCompleteFeild.propTypes = {
    _key:  PropTypes.string.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    key: PropTypes.string,
    errorMsg: PropTypes.string,
    // validators: PropTypes.array,
    onchange: PropTypes.func.isRequired,
    dataSet: PropTypes.array
    // isRequired: PropTypes.bool,
    // inputProps: PropTypes.array

}

AutoCompleteFeild.defaultProps ={
    value: '',
    dataSet:[],
    label: '',
    name: '',
    errorMsg: '',
    // validators: [],
    // isRequired: false,
    // inputProps: []
}

export default AutoCompleteFeild
