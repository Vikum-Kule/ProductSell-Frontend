import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getSaleProductById } from "../../../services/Sales";
import TableItem from "../../../components/TableItem";
import ProfitCard from "../../../components/ProfitCard";
import CustomerDataComponent from "../../../components/CustomerDataComponent";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});
function SaleProductView({ history }) {
  const classes = useStyles();
  const { saleId } = useParams();
  const [sale, setSale] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const fetchData = async () => {
    let result = await getSaleProductById(saleId);
    // console.log(result);
    const batches = [];
    if (result) {
      console.log(result);
      setSale(result);
      let productionSet = result.productionBatches;
      for (let x = 0; x < productionSet.length; x++) {
        batches.push(
          createBatchData(
            productionSet[x].production.productionId.toString(),
            productionSet[x].production.productionDate,
            productionSet[x].production.totalItemCost,
            productionSet[x].production.labourCost,
            productionSet[x].production.electricityCost,
            productionSet[x].production.transportCost,
            productionSet[x].production.otherCost,
            productionSet[x].quantity
          )
        );
      }

      setRows(batches);
    } else {
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  //columns for table
  const columns = [
    { id: "batchNumber", label: "Batch Number", minWidth: 80 },
    { id: "productionDate", label: "Date", minWidth: 80 },
    {
      id: "totalItemCost",
      label: "Material Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "labourCost",
      label: "Labour Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "electricityCost",
      label: "Electricity Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "transportCost",
      label: "Transport Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "otherCost",
      label: "Other Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "saleQty",
      label: "Sold Qty",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createBatchData(
    batchNumber,
    productionDate,
    itemCost,
    labourCost,
    electricityCost,
    transportCost,
    otherCost,
    saleQty
  ) {
    return {
      batchNumber,
      productionDate,
      itemCost,
      labourCost,
      electricityCost,
      transportCost,
      otherCost,
      saleQty,
    };
  }

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
            <ProfitCard
              totalPrice={sale.totalPrice}
              profit={sale.totalProfit}
              profitMargin={sale.profitMargin}
            />
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
            {sale.customer ? (
              <Grid item xs={12} sm={12} sx={12}>
                <CustomerDataComponent customer={sale.customer} />
              </Grid>
            ) : (
              <Typography></Typography>
            )}
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
            <TableItem
              columns={columns}
              rows={rows}
              page={page}
              setPage={setPage}
              tablePagin={true}
              totalPages={totalPages}
              getData={fetchData}
            />
          </Grid>
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
