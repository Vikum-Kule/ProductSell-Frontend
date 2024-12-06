import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TableItem from "../../../components/TableItem";
import {
  getExportProductById,
  getProductionsByProductId,
} from "../../../services/Export";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});
function Ex_ItemView({ history }) {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = React.useState([]);
  const [productionList, setProductionList] = React.useState([]);

  const fetchData = async () => {
    let result = await getExportProductById(productId);
    // console.log(result);
    if (result) {
      console.log(result);
      setProduct(result);
      

      setLoading(true);
      let productionSet = await getProductionsByProductId(productId);
      setProductionList(productionSet);
      console.log(productionSet);

      const newSet = [];
      for (let x = 0; x < productionSet.length; x++) {
        //set data in new set list to display in the table
        newSet.push(
          createData(
            productionSet[x].productionDate,
            productionSet[x].productionQty,
            productionSet[x].totalCost,
            productionSet[x].totalItemCost,
            productionSet[x].electricityCost,
            productionSet[x].labourCost,
            productionSet[x].transportCost
          )
        );
      }

      // set rows to table
      setRows(newSet);
      setLoading(false);
    } else {
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  //columns for table
  const columns = [
    { id: "date", label: "Date", minWidth: 80 },
    { id: "productionQty", label: "Item", minWidth: 100 },
    { id: "totalCost", label: "Brand", minWidth: 100 },
    {
      id: "totalItemCost",
      label: "Material Cost",
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
      id: "labourCost",
      label: "Labour Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "transportCost",
      label: "Transport Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(
    date,
    productionQty,
    totalCost,
    totalItemCost,
    electricityCost,
    labourCost,
    transportCost
  ) {
    return {
      date,
      productionQty,
      totalCost,
      totalItemCost,
      electricityCost,
      labourCost,
      transportCost,
    };
  }
  const [page, setPage] = React.useState(0);

  return (
    <Paper className={classes.container} elevation={8}>
      {product.product_id ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Product View</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Name
            </Typography>
            <Typography>{product.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Barcode
            </Typography>
            <Typography>{product.barcode}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Status
            </Typography>
            <Typography>{product.status}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Existing Qty
            </Typography>
            <Typography>{product.existingQty}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Current Price
            </Typography>
            <Typography>{""}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Added By
            </Typography>
            <Typography>{product.addedBy}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Category
            </Typography>
            <Grid container spacing={2}>
              {product?.ex_categories?.map((category) => {
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
              Materials
            </Typography>
            <Grid container spacing={2}>
              {product?.items?.map((material) => {
                const matchedMaterial = productionList[0]?.items?.find(
                  (item) => item.importItem.importId === material.importId
                );
                return (
                  <Grid item sx={2}>
                    <Chip
                      label={
                        <Typography>
                          <span style={{ fontWeight: "500" }}>
                            {material.itemName}
                          </span>
                          :{" "}
                          {matchedMaterial
                            ? `: ${matchedMaterial.usingQty}`
                            : "0"}
                        </Typography>
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          {/* <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              {" "}
              Current Avl Qty
            </Typography>
            <Typography>{importItem.qty}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h7" fontWeight="700">
              Refill Rate
            </Typography>
            <Typography>{importItem.refillRate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Note
            </Typography>
            <Typography>{importItem.note}</Typography>
          </Grid> */}
          <Grid item xs={12} sm={12} sx={12}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableItem
                columns={columns}
                rows={rows}
                page={page}
                setPage={setPage}
                tablePagin={true}
                totalPages={totalPages}
                getData={fetchData}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid>{""}</Grid>
      )}
    </Paper>
  );
}

Ex_ItemView.propTypes = {
  productId: PropTypes.any,
};

export default Ex_ItemView;
