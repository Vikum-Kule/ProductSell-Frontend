import Validation from "../../Validation/CustomerFormValidation";
import React, { Fragment, useEffect, useState } from "react";
import InputField from "../../FormComponents/InputField";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import FormAlert from "../../components/FormAlert";
import { addCustomer } from "../../services/Customer";

function AddCustomer({ setOpenForm }) {
  //for input feild values
  const [values, setValues] = useState({
    _name: "",
    _address: "",
    _email: "",
    _phone: "",
  });

  //Reset values
  const resetValues = () => {
    closeAlert();
    setValues({
      _name: "",
      _address: "",
      _email: "",
      _phone: "",
    });
  };

  //display alert...
  const [displayAlert, setAlert] = useState(false);

  //alert data
  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
  });

  const closeAlert = () => {
    setAlert(false);
    setAlertData({
      type: "",
      message: "",
    });
  };

  // errors for inputfeild
  const [error, setError] = useState({});

  //reset errors...
  const resetErrors = () => {
    setError({});
  };

  const submitValue = async () => {
    const validationErrors = Validation(values);
    console.log("Validation function output:", validationErrors);
    setError(Validation(values));
    console.log("Selected Data: ", values);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Customer data: ", values);
      let cutomerResponse = await addCustomer(values)
      
      if (cutomerResponse) {
        resetValues();
        setAlertData({
          type: "success",
          message: "Customer Added..",
        });
        setAlert(true);
      } else {
        setAlertData({
          type: "error",
          message: "Something went wrong...",
        });
        setAlert(true);
      }
    }
  };

  //to handle changing value
  const handleChange = (name, val) => {
    resetErrors();
    console.log(name, val);
    setValues({
      ...values,
      [name]: val,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Add Customer{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={1} sx={12}>
        <Tooltip title="Close">
          <IconButton
            onClick={() => {
              setOpenForm(false);
            }}
            aria-label="close"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_name"
          errorMsg={error._name}
          value={values._name}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Customer Name"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_email"
          errorMsg={error._email}
          value={values._email}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Email"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_phone"
          errorMsg={error._phone}
          value={values._phone}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Phone Number"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_address"
          errorMsg={error._address}
          value={values._address}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Address"
        />
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        {displayAlert ? (
          <FormAlert type={alertData.type} message={alertData.message} />
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={4} sx={12}>
            <Button fullWidth variant="contained" onClick={submitValue}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={1} sx={12}>
            <Button onClick={resetValues} variant="outlined">
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddCustomer;
