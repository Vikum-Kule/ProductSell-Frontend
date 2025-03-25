import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getImportStockUpdateById } from "../../../services/Import";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
  categoryContainer: {
    padding: "10px",
  },
  categoryTag: {
    marginRight: "10px",
  },
});
function StockUpdateView({ history }) {
  const classes = useStyles();
  const { intakeId } = useParams();
  const [stockIntake, setStockIntake] = React.useState([]);

  const fetchData = async () => {
    let result = await getImportStockUpdateById(intakeId);
    if (result) {
      setStockIntake(result);
    } else {
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  return (
    <Paper className={classes.container} elevation={8}>
      {stockIntake.intakeId ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Stock Update View</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Item Name
            </Typography>
            <Typography>{stockIntake.imports.itemName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Brand
            </Typography>
            <Typography>{stockIntake.imports.brand}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Code
            </Typography>
            <Typography>{stockIntake.imports.product_code}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Added By
            </Typography>
            <Typography>{stockIntake.addedBy}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Added Date
            </Typography>
            <Typography>{stockIntake.addedDate}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Bill Number
            </Typography>
            <Typography>{stockIntake.billNo}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.categoryContainer}>
              <Typography>Category</Typography>
              <Grid container spacing={1}>
                {stockIntake.imports.im_categories.map((category) => {
                  return (
                    <Grid item sx={2}>
                      <Chip
                        label={
                          <Typography>
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "500",
                              }}
                            >
                              {Object.entries(category)
                                .filter(([key]) => key !== "cat_id") // Exclude `cat_id`
                                .map(([, value]) => value) // Extract only the values
                                .filter(Boolean) // Remove null or undefined values
                                .join(" : ")}{" "}
                            </span>
                          </Typography>
                        }
                        variant="outlined"
                        pt
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
            {/* <Typography variant="h7" fontWeight="700">
              Category
            </Typography>
            <Typography>{stockIntake.imports.im_category.category}</Typography> */}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Qty
            </Typography>
            <Typography>{stockIntake.qty}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Price Per Item
            </Typography>
            <Typography>{stockIntake.pricePerItem}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Discount (%)
            </Typography>
            <Typography>{stockIntake.imports.product_code}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Total Price
            </Typography>
            <Typography>{stockIntake.totalPrice}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid>{stockIntake}</Grid>
      )}
    </Paper>
  );
}

StockUpdateView.propTypes = {
  intakeId: PropTypes.any,
};

export default StockUpdateView;
