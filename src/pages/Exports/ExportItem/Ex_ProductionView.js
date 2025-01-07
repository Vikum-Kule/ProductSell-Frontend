import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TableItem from "../../../components/TableItem";
import { getProductionById } from "../../../services/Export";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});

function Ex_ProductionView({ history }) {
  const classes = useStyles();
  const { productionId } = useParams();
  const [production, setProduction] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const fetchData = async () => {
    setLoading(true);
    const result = await getProductionById(productionId);
    if (result) {
      setProduction(result);

      // Prepare rows for the used items table
      const itemRows = result.items.map((item) => ({
        itemName: item.importItem.itemName,
        itemCode: item.importItem.product_code,
        unitPrice: item.unitPrice,
        unitPriceMethod: item.method,
        usedQty: item.usingQty,
      }));

      setRows(itemRows);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { id: "itemName", label: "Item Name", minWidth: 150 },
    { id: "itemCode", label: "Item Code", minWidth: 100 },
    { id: "unitPrice", label: "Unit Price", minWidth: 100 },
    { id: "unitPriceMethod", label: "Unit Price Method", minWidth: 100 },
    { id: "usedQty", label: "Used Quantity", minWidth: 100 },
  ];

  return (
    <Paper className={classes.container} elevation={8}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : production ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Production View</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Production Date
            </Typography>
            <Typography>
              {new Date(production.productionDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Name
            </Typography>
            <Typography>{production.product.name}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Barcode
            </Typography>
            <Typography>{production.product.barcode}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Product Category
            </Typography>
            <Grid container spacing={2}>
              {production.product?.ex_categories?.map((category) => {
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

          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Used Items
            </Typography>
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
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Total Item Cost
            </Typography>
            <Typography>{production.totalItemCost}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Labour Cost
            </Typography>
            <Typography>{production.labourCost}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Electricity Cost
            </Typography>
            <Typography>{production.electricityCost}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Transport Cost
            </Typography>
            <Typography>{production.transportCost}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Other Cost
            </Typography>
            <Typography>{production.otherCost}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Typography>No data available</Typography>
        </Grid>
      )}
    </Paper>
  );
}

Ex_ProductionView.propTypes = {
  productionId: PropTypes.any,
};

export default Ex_ProductionView;
