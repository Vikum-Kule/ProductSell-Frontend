import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {FormValidation} from '../Validation/FormValidation';
import { TextField } from '@mui/material';

function InputField({params,value,inputProps, isRequired, label, type, placeholder, validators, defaultValue, onChange}) {

    const [error, setError] = useState(false);

    const handleChange =(event) =>{
         const {value} = event.target;
         setError(FormValidation(validators,value));
         onChange(value);
    }

    return (
        <div className="form-group">
            <TextField
                fullWidth
                inputProps={inputProps? inputProps : null }
                required= {isRequired}
                value = {value}
                type={type}
                size="small"
                id="outlined-required"
                label={label}
                defaultValue={defaultValue ? defaultValue : null}
                onChange = {handleChange}
                error={error.message}
            />
        </div>
    )
}

InputField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    validators: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool,
    inputProps: PropTypes.array

}

InputField.defaultProps ={
    value: '',
    label: '',
    type: 'text',
    placeholder: '',
    validators: [],
    isRequired: false,
    inputProps: []
}

export default InputField

