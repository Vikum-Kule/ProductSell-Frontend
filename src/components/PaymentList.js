import React from "react";
import {
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Paper,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DescriptionIcon from "@mui/icons-material/Description";
import InputField from "../FormComponents/InputField";

const chequeStatus = [
  { value: "PENDING", label: "Pending" },
  { value: "CLEARED", label: "Cleared" },
  { value: "RETURNED", label: "Returned" },
];

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
    <Grid container>
      <Grid item xs={12} style={{ paddingTop: "10px" }}>
        <Typography variant="h7">Payments</Typography>
      </Grid>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {payments.map((payment, index) => {
          if (payment.paymentType === "CASH") {
            return (
              <Paper>
                <ListItem key={index} sx={{ width: "100%" }}>
                  <ListItemAvatar>
                    <Avatar>
                      <AttachMoneyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ width: "100%" }}
                    primary="Cash"
                    secondary={`Payment Date: ${formatDate(
                      payment.paymentDate
                    )}`}
                  />
                  <Grid container spacing={1}>
                    <Grid item>
                      <InputField
                        name="_amount"
                        value={formatAmount(payment.amount)}
                        type="text"
                        label="Amount"
                        isdisabled={true}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </Paper>
            );
          } else if (payment.paymentType === "CHEQUE") {
            return (
              <Paper>
                <ListItem key={index} sx={{ width: "100%" }}>
                  <ListItemAvatar>
                    <Avatar>
                      <RequestQuoteIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ width: "100%" }}
                    primary="Cheque"
                    secondary={`Payment Date: ${formatDate(
                      payment.paymentDate
                    )}   Return Date: ${formatDate(payment.returnDate)}`}
                  />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <InputField
                        name="_amount"
                        value={formatAmount(payment.amount)}
                        type="text"
                        label="Amount"
                        isdisabled={true}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField
                        name="_status"
                        value={payment.status}
                        type="text"
                        label="Status"
                        isdisabled={true}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </Paper>
            );
          } else {
            return (
              <Paper style={{ marginBottom: "5px" }}>
                <ListItem key={index} sx={{ width: "100%" }}>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Return Bill"
                    secondary={`Payment Date: ${formatDate(
                      payment.paymentDate
                    )}`}
                  />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <InputField
                        name="_amount"
                        value={formatAmount(payment.amount)}
                        type="text"
                        label="Amount"
                        isdisabled={true}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField
                        name="_status"
                        value={payment.returnBillNumber}
                        type="text"
                        label="Bill Number"
                        isdisabled={true}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </Paper>
            );
          }
        })}
      </List>
    </Grid>
  );
}

export default PaymentList;
