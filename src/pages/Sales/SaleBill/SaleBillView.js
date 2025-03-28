import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TableItem from "../../../components/TableItem";
import { makeStyles } from "@mui/styles";
import {
  billSendingForApproval,
  getSaleBillById,
  getSaleBillPaymentsById,
} from "../../../services/Sales";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router";
import CustomerDataComponent from "../../../components/CustomerDataComponent";
import PaymentList from "../../../components/PaymentList";

const useStyles = makeStyles({
  container: {
    padding: "20px",
    margin: "20px",
    backgroundColor: "#f9f9f9",
  },
  sectionHeader: {
    marginBottom: "10px",
  },
  fieldContainer: {
    marginBottom: "15px",
  },
  tableContainer: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  label: {
    fontWeight: 700,
  },
  value: {
    fontWeight: 400,
  },
});

function SaleBillView() {
  const classes = useStyles();
  const history = useHistory();
  const { billId } = useParams();
  const [saleBill, setSaleBill] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [payments, setPayments] = React.useState(null);

  const fetchData = async () => {
    setLoading(true);
    const billResult = await getSaleBillById(billId);
    const billPaymentResult = await getSaleBillPaymentsById(billId);
    console.log(billPaymentResult);

    if (billResult !== "Something went wrong...") {
      setSaleBill(billResult);
      const billItemSet = billResult.billItems || [];

      const itemRows = billItemSet.map((item) => ({
        productName: item.product.name,
        barcode: item.product.barcode,
        sellingQty: item.bill_qty,
        totalProfit: item.itemProfit,
        profitMargin: item.pricePerItem,
        unitPrice: item.pricePerItem,
        totalPrice: item.pricePerItem * item.bill_qty,
        action: item.product.product_id,
      }));
      console.log("Items: ", itemRows);
      setRows(itemRows);
    } else {
      setErrors({
        ...errors,
        _billDataError: "Unable to fetch bill data",
      });
    }

    if (billPaymentResult !== "Something went wrong...") {
      setPayments(billPaymentResult);
    } else {
      setErrors({
        ...errors,
        _billPaymentError: "Unable to fetch bill payment data",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      id: "productName",
      label: "Product Name",
      minWidth: 100,
      editable: false,
    },
    {
      id: "barcode",
      label: "Barcode",
      minWidth: 100,
      editable: false,
    },
    {
      id: "sellingQty",
      label: "Selling Qty",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "totalProfit",
      label: "Total Profit",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "profitMargin",
      label: "Profit Margin",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "unitPrice",
      label: "Unit Price",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "totalPrice",
      label: "Total Price",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  const handleAction = async (event, id) => {
    console.log(
      "url: ",
      "/template/sale_bill_item_view/" + id + "/" + saleBill.billNumber
    );
    history.push(`/template/sale_bill_item_view/${id}/${saleBill.billNumber}`);
  };

  const sendingBillForApproval = async () => {
    let result = await billSendingForApproval(billId);
  };

  return (
    <Paper className={classes.container} elevation={8}>
      {isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <CircularProgress />
        </Box>
      ) : saleBill ? (
        <>
          <Grid>
            <Tooltip title="Close">
              <IconButton
                onClick={() => {
                  history.goBack();
                }}
                aria-label="close"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Typography
            variant="h5"
            className={classes.sectionHeader}
            align="center"
          >
            Sale Bill Details
          </Typography>
          <Divider />

          <Grid container spacing={3} className={classes.fieldContainer}>
            <Grid item xs={6}>
              <Typography className={classes.label}>Bill No:</Typography>
              <Typography className={classes.value}>
                {saleBill.billNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Bill Date:</Typography>
              <Typography className={classes.value}>
                {saleBill.sellingDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Added By:</Typography>
              <Typography className={classes.value}>
                {saleBill.addedBy}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Status:</Typography>
              <Typography className={classes.value}>
                {saleBill.status}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Customer:</Typography>
              {saleBill.customer ? (
                <Grid item xs={12} sm={12} sx={12}>
                  <CustomerDataComponent customer={saleBill.customer} />
                </Grid>
              ) : (
                <Typography></Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Discount:</Typography>
              <Typography className={classes.value}>
                {saleBill.discount_percentage > 0.0
                  ? saleBill.discount_percentage + "%"
                  : "Rs: " + saleBill.discount_amount}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Total Profit:</Typography>
              <Typography className={classes.value}>
                {saleBill.totalProfit}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Total Amount:</Typography>
              <Typography className={classes.value}>
                {saleBill.totalPrice}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h7" fontWeight="700">
                Remaining Amount
              </Typography>
              <Typography>{saleBill.remainingAmount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.label}>Note:</Typography>
              <Typography className={classes.value}>{saleBill.note}</Typography>
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="h6" className={classes.sectionHeader}>
            Bill Items
          </Typography>

          <Grid container className={classes.tableContainer}>
            <TableItem
              columns={columns}
              rows={rows}
              page={0}
              setPage={() => {}}
              tablePagin={false}
              totalPages={1}
              getData={fetchData}
              showActions={["view"]}
              handleAction={handleAction}
            />
          </Grid>
          {payments && payments.lenth > 0 ? (
            <Grid container spacing={3} className={classes.fieldContainer}>
              <Grid item xs={10}>
                <PaymentList payments={payments} />
              </Grid>
            </Grid>
          ) : null}
          {saleBill.status === "DRAFT" ? (
            <Grid item xs={12} sm={4} sx={12}>
              <Button onClick={sendingBillForApproval} variant="outlined">
                Send
              </Button>
            </Grid>
          ) : null}
        </>
      ) : (
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>No data available</Typography>
        </Box>
      )}
    </Paper>
  );
}

SaleBillView.propTypes = {
  billId: PropTypes.any,
};

export default SaleBillView;
