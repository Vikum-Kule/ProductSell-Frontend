import React, { useState } from "react";
import {
  Grid,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const paymentTypes = [
  { value: "CASH", label: "Cash" },
  { value: "CHEQUE", label: "Cheque" },
  { value: "BILL", label: "Return Bill" },
  { value: "RECEIPT", label: "Receipt" },
];

function PaymentOptions({ paymentMethods, setPaymentMethods, isRetail }) {
  const addPaymentMethod = () => {
    setPaymentMethods([...paymentMethods, { type: "", amount: "" }]);
  };

  const updatePaymentMethod = (index, field, value) => {
    console.log("index", index);
    console.log("field", field);
    console.log("value", value);
    const updatedPayments = [...paymentMethods];
    updatedPayments[index][field] = value;
    setPaymentMethods(updatedPayments);
  };

  const removePaymentMethod = (index) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Grid>
      <Grid item xs={12} style={{ paddingBottom: "10px" }}>
        <Typography variant="h7">Payment Methods</Typography>
      </Grid>
      {paymentMethods.map((payment, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          alignItems="center"
          style={{ paddingBottom: "10px" }}
        >
          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              size="small"
              label="Payment Type"
              value={payment.type}
              onChange={(e) =>
                updatePaymentMethod(index, "type", e.target.value)
              }
            >
              {paymentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              size="small"
              label="Amount"
              type="number"
              value={payment.amount}
              onChange={(e) =>
                updatePaymentMethod(index, "amount", e.target.value)
              }
            />
          </Grid>

          {payment.type === "CHEQUE" && (
            <>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Bank Name"
                  value={payment.bank || ""}
                  onChange={(e) =>
                    updatePaymentMethod(index, "bank", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Cheque Number"
                  value={payment.chequeNumber || ""}
                  onChange={(e) =>
                    updatePaymentMethod(index, "chequeNumber", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      size="small"
                      label="Return Date"
                      value={payment.returnDateInput}
                      onChange={(date) => {
                        console.log("date", date);
                        setSelectedDate(date);
                        const jsDate = date ? date.toDate() : null;
                        updatePaymentMethod(index, "returnDate", jsDate);
                        updatePaymentMethod(index, "returnDateInput", date);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </>
          )}

          {payment.type === "BILL" && (
            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
                label="Return Bill Number"
                value={payment.returnBillNumber || ""}
                onChange={(e) =>
                  updatePaymentMethod(index, "returnBillNumber", e.target.value)
                }
              />
            </Grid>
          )}

          {payment.type === "RECEIPT" && isRetail && (
            <>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Receipt Number"
                  value={payment.receiptNumber || ""}
                  onChange={(e) =>
                    updatePaymentMethod(index, "receiptNumber", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Shop Name"
                  value={payment.shopName || ""}
                  onChange={(e) =>
                    updatePaymentMethod(index, "shopName", e.target.value)
                  }
                />
              </Grid>
            </>
          )}

          <Grid item xs={1}>
            <IconButton
              color="error"
              onClick={() => removePaymentMethod(index)}
            >
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
