import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getExportProductById } from "../../../services/Export";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TableItem from "../../../components/TableItem";
import Ex_ItemUnitPrice from "./Ex_ItemUnitPrice";
import ProductionTableItem from "../../../components/ProductionTableItem";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});
function Ex_Production({ history }) {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = React.useState([]);

  const fetchData = async () => {
    let result = await getExportProductById(productId);
    if (result) {
      setProduct(result);
      console.log(result);

      setLoading(true);

      const itemSet = [];
      let productItems = result.items;
      console.log(result.items);
      if (productItems) {
        for (let x = 0; x < productItems.length; x++) {
          //set data in new set list to display in the table
          itemSet.push(
            createDataForSelectedTable(
              productItems[x].imports.itemName,
              productItems[x].imports.brand,
              productItems[x].usingQty,
              productItems[x].imports.unitType,
              productItems[x].imports.importId,
              null,
              null,
              null,
              null,
              null
            )
          );
        }
      }

      // set rows to table
      setRows(itemSet);
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
    { id: "item", label: "Item", minWidth: 100, editable: false },
    { id: "brand", label: "Brand", minWidth: 100, editable: false },
    {
      id: "qty",
      label: "Required Qty",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: false,
    },
    { id: "unitType", label: "Unit Type", minWidth: 100, editable: false },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createDataForSelectedTable(
    item,
    brand,
    qty,
    unitType,
    importId,
    action,
    unitPriceMethod,
    fromDate,
    toDate,
    unitPrice
  ) {
    return {
      item,
      brand,
      qty,
      unitType,
      importId,
      action,
      unitPriceMethod,
      fromDate,
      toDate,
      unitPrice,
    };
  }
  const [page, setPage] = useState(0);
  const [enableSetting, setEnableSetting] = useState(false);
  const [editingRow, setEditingRow] = useState([]);

  const handleAction = (event, row) => {
    switch (event) {
      case "settings":
        setEditingRow(row);
        setEnableSetting(true);
        break;
      default:
        return "foo";
    }
  };

  return (
    <Paper className={classes.container} elevation={8}>
      {product.product_id ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Production</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Name
            </Typography>
            <Typography>{product.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Bar Code
            </Typography>
            <Typography>{product.barcode}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={12}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <ProductionTableItem
                columns={columns}
                rows={rows}
                setRows={setRows}
                page={page}
                setPage={setPage}
                tablePagin={true}
                totalPages={totalPages}
                getData={fetchData}
                handleAction={handleAction}
                showActions={["settings"]}
                enableSetting={enableSetting}
                setEnableSetting={setEnableSetting}
                editingRow={editingRow}
                setEditingRow={setEditingRow}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid>{product}</Grid>
      )}
    </Paper>
  );
}

Ex_Production.propTypes = {
  product_id: PropTypes.any,
};

export default Ex_Production;
