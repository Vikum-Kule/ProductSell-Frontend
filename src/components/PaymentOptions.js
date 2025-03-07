import React, { useState } from "react";
import { Grid, Button, MenuItem, TextField, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const paymentTypes = [
  { value: "CASH", label: "Cash" },
  { value: "CHEQUE", label: "Cheque" },
  { value: "BILL", label: "Return Bill" },
];

function PaymentOptions({ paymentMethods, setPaymentMethods }) {
  const addPaymentMethod = () => {
    setPaymentMethods([...paymentMethods, { type: "", amount: "", chequeDetails: {} }]);
  };

  const updatePaymentMethod = (index, field, value) => {
    const updatedPayments = [...paymentMethods];
    updatedPayments[index][field] = value;
    setPaymentMethods(updatedPayments);
  };

  const updateChequeDetails = (index, field, value) => {
    const updatedPayments = [...paymentMethods];
    updatedPayments[index].chequeDetails[field] = value;
    setPaymentMethods(updatedPayments);
  };

  const removePaymentMethod = (index) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Payment Methods</Typography>
      </Grid>
      {paymentMethods.map((payment, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              label="Payment Type"
              value={payment.type}
              onChange={(e) => updatePaymentMethod(index, "type", e.target.value)}
            >
              {paymentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={payment.amount}
              onChange={(e) => updatePaymentMethod(index, "amount", e.target.value)}
            />
          </Grid>

          {payment.type === "CHEQUE" && (
            <>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  value={payment.chequeDetails.bank || ""}
                  onChange={(e) => updateChequeDetails(index, "bank", e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Cheque Number"
                  value={payment.chequeDetails.chequeNumber || ""}
                  onChange={(e) => updateChequeDetails(index, "chequeNumber", e.target.value)}
                />
              </Grid>
            </>
          )}

          {payment.type === "BILL" && (
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Return Bill Number"
                value={payment.returnBillNumber || ""}
                onChange={(e) => updatePaymentMethod(index, "returnBillNumber", e.target.value)}
              />
            </Grid>
          )}

          <Grid item xs={1}>
            <IconButton color="error" onClick={() => removePaymentMethod(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button variant="outlined" onClick={addPaymentMethod}>
          Add Payment Method
        </Button>
      </Grid>
    </Grid>
  );
}

export default PaymentOptions;