import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getImportBillById } from "../../../services/Import";
import { Grid, Paper, Typography, Divider, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TableItem from "../../../components/TableItem";
import { makeStyles } from "@mui/styles";

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
  },
  label: {
    fontWeight: 700,
  },
  value: {
    fontWeight: 400,
  },
});

function Im_BillView({ history }) {
  const classes = useStyles();
  const { billId } = useParams();
  const [importBill, setImportBill] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getImportBillById(billId);
    if (result) {
      setImportBill(result);
      const billItemSet = result.import_billItems || [];

      const itemRows = billItemSet.map((item) => ({
        productCode: item.imports.product_code,
        item: item.imports.itemName,
        brand: item.imports.brand,
        qty: item.bill_qty,
        discountPerItem: item.discount_perItem,
        pricePerItem: item.pricePerItem,
        totalPrice: item.price,
      }));

      setRows(itemRows);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { id: "productCode", label: "Product Code", minWidth: 80 },
    { id: "item", label: "Item", minWidth: 100 },
    { id: "brand", label: "Brand", minWidth: 100 },
    { id: "qty", label: "Qty", minWidth: 100 },
    { id: "discountPerItem", label: "Discount", minWidth: 100 },
    { id: "pricePerItem", label: "Price Per Item", minWidth: 100 },
    { id: "totalPrice", label: "Total Price", minWidth: 100 },
  ];

  return (
    <Paper className={classes.container} elevation={8}>
      {isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <CircularProgress />
        </Box>
      ) : importBill ? (
        <>
          <Typography
            variant="h5"
            className={classes.sectionHeader}
            align="center"
          >
            Import Bill Details
          </Typography>
          <Divider />

          <Grid container spacing={3} className={classes.fieldContainer}>
            <Grid item xs={6}>
              <Typography className={classes.label}>Bill No:</Typography>
              <Typography className={classes.value}>
                {importBill.billNo}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Bill Date:</Typography>
              <Typography className={classes.value}>
                {importBill.createdDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Added By:</Typography>
              <Typography className={classes.value}>
                {importBill.addedBy}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Shop:</Typography>
              <Typography className={classes.value}>
                {importBill.shop}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Discount:</Typography>
              <Typography className={classes.value}>
                {importBill.discount}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.label}>Total Amount:</Typography>
              <Typography className={classes.value}>
                {importBill.total}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.label}>Note:</Typography>
              <Typography className={classes.value}>
                {importBill.note}
              </Typography>
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
            />
          </Grid>
        </>
      ) : (
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>No data available</Typography>
        </Box>
      )}
    </Paper>
  );
}

Im_BillView.propTypes = {
  importId: PropTypes.any,
};

export default Im_BillView;
