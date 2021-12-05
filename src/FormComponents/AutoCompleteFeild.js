import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// const filter = createFilterOptions();


function AutoCompleteFeild({key,value, label, dataSet ,onChange, onClick}) {

    const [error, setError] = useState(false);
    // const[value, setValue]= useState('');
    

    const handleChange =(event) =>{
         const {value} = event.target;
        //  setError(FormValidation(validators,value));
         onChange(value);
    }
    const handleClick=(event)=>{
        onClick();
    }

    

    return (
        <div>
           <Autocomplete
                size="small"
                fullWidth
                value={value}
                // onChange={(event, newValue) => {
                // setValue(newValue || "");
                // handleChange(event);
                // }}
                onChange={handleChange}
                inputValue={value}
                // onInputChange={(event, newInputValue) => {
                // setValue(newInputValue);
                // handleChange(event);
                // }}
                onInputChange={handleChange}
                id="controllable-states-demo"
                options={ Array.from(dataSet).map( i =>i.itemName) }
                sx={{ width: 800 }}
                renderInput={(params) => <TextField fullWidth onClick={handleClick} {...params} label={label} />}
            />
        </div>
    )
}


AutoCompleteFeild.propTypes = {
    key:  PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    // type: PropTypes.string,
    // placeholder: PropTypes.string,
    // validators: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    dataSet: PropTypes.array
    // isRequired: PropTypes.bool,
    // inputProps: PropTypes.array

}

AutoCompleteFeild.defaultProps ={
    value: '',
    dataSet:[],
    label: '',
    // type: 'text',
    // placeholder: '',
    // validators: [],
    // isRequired: false,
    // inputProps: []
}

export default AutoCompleteFeild
