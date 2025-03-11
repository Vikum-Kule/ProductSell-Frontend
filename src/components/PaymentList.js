import React, { useState } from "react";
import {
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  TextField,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DescriptionIcon from "@mui/icons-material/Description";
import InputField from "../FormComponents/InputField";

function PaymentList({ payments }) {
  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // yyyy-MM-dd format
  };

  // Function to format amount as currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Grid>
      <Grid item xs={12} style={{ paddingTop: "10px" }}>
        <Typography variant="h7">Payments</Typography>
      </Grid>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {payments.map((payment, index) => {
          if (payment.paymentType === "CASH") {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Cash"
                  secondary={`Payment Date: ${formatDate(payment.paymentDate)}`}
                />
                <InputField
                  name="_amount"
                  value={formatAmount(payment.amount)}
                  type="text"
                  label="Amount"
                  isdisabled={true}
                />
              </ListItem>
            );
          } else if (payment.paymentType === "CHEQUE") {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RequestQuoteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Cheque"
                  secondary={`Payment Date: ${formatDate(
                    payment.paymentDate
                  )}   Return Date: ${formatDate(payment.returnDate)}`}
                />
                <InputField
                  name="_amount"
                  value={formatAmount(payment.amount)}
                  type="text"
                  label="Amount"
                  isdisabled={true}
                />
              </ListItem>
            );
          } else {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Return Bill"
                  secondary={`Payment Date: ${formatDate(payment.paymentDate)}`}
                />
                <InputField
                  name="_amount"
                  value={formatAmount(payment.amount)}
                  type="text"
                  label="Amount"
                  isdisabled={true}
                />
              </ListItem>
            );
          }
        })}
      </List>
    </Grid>
  );
}

export default PaymentList;
