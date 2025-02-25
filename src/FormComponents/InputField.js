import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormValidation } from "../Validation/FormValidation";
import { TextField } from "@mui/material";

function InputField({
  multiline,
  value,
  name,
  errorMsg,
  isRequired,
  label,
  type,
  placeholder,
  validators,
  defaultValue,
  onChange,
  isdisabled,
}) {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(name, value);
  };

  return (
    <div className="form-group">
      {isdisabled ? (
        <TextField
          disabled
          name={name}
          multiline={multiline}
          fullWidth
          required={isRequired}
          value={value}
          type={type}
          size="small"
          id="outlined-required"
          label={label}
          defaultValue={defaultValue ? defaultValue : null}
          onChange={handleChange}
          error={errorMsg}
          helperText={errorMsg}
        />
      ) : (
        <TextField
          name={name}
          multiline={multiline}
          fullWidth
          required={isRequired}
          value={value}
          type={type}
          size="small"
          id="outlined-required"
          label={label}
          defaultValue={defaultValue ? defaultValue : null}
          onChange={handleChange}
          error={errorMsg}
          helperText={errorMsg}
        />
      )}
    </div>
  );
}

InputField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validators: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  multiline: PropTypes.bool,
  isdisabled: PropTypes.bool,
  inputProps: PropTypes.array,
  errorMsg: PropTypes.string,
};

InputField.defaultProps = {
  value: "",
  name: "",
  label: "",
  type: "text",
  placeholder: "",
  validators: [],
  isRequired: false,
  multiline: false,
  inputProps: [],
  errorMsg: "",
};

export default InputField;
