import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getSaleProductById } from "../../../services/Sales";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});
function SaleProductView({ history }) {
  const classes = useStyles();
  const { saleId } = useParams();
  const [sale, setSale] = React.useState([]);

  const fetchData = async () => {
    let result = await getSaleProductById(saleId);
    // console.log(result);
    if (result) {
      console.log(result);
      setSale(result);
    } else {
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);


  return (
    <Paper className={classes.container} elevation={8}>
      {sale.saleId ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Sale Product View</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Name
            </Typography>
            <Typography>{sale.product.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Barcode
            </Typography>
            <Typography>{sale.product.barcode}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Product Category
            </Typography>
            <Grid container spacing={2}>
              {sale.product?.ex_categories?.map((category) => {
                return (
                  <Grid item sx={2}>
                    <Chip
                      label={
                        <Typography>
                          <span style={{ fontWeight: "500" }}>
                            {category.category}
                          </span>
                          : {category.subCat_1}
                        </Typography>
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Existing Qty
            </Typography>
            <Typography>{sale.product.existingQty}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Customer
            </Typography>
            <Typography>{sale.customer}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Added By
            </Typography>
            <Typography>{sale.addedBy}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              {" "}
              Selling Quantity
            </Typography>
            <Typography>{sale.sellingQty}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Price Per Unit
            </Typography>
            <Typography>{sale.sellingPricePerUnit}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Cost Per Unit
            </Typography>
            <Typography>{sale.costPerProduct}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Total Price
            </Typography>
            <Typography>{sale.totalPrice}</Typography>
          </Grid>
          {sale.billNumber != null ? (
            <Grid item xs={3}>
              <Typography variant="h7" fontWeight="700">
                Bill Number
              </Typography>
              <Typography>{sale.billNumber}</Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Note
            </Typography>
            <Typography>{sale.note}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid>{""}</Grid>
      )}
    </Paper>
  );
}

SaleProductView.propTypes = {
  saleId: PropTypes.any,
};

export default SaleProductView;
