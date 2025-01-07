import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  addProduction,
  getExportProductById,
  getLatestProductionByProductId,
} from "../../../services/Export";
import { Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ProductionTableItem from "../../../components/ProductionTableItem";
import { Style } from "@mui/icons-material";
import InputField from "../../../FormComponents/InputField";
import Ex_ProductionValidation from "../../../Validation/Ex_ProductionValidation";
import FormAlert from "../../../components/FormAlert";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});
function Ex_Production({ history }) {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = React.useState([]);

  const [productionValues, setProductionValues] = useState({
    _productId: "",
    _productionItems: [],
    _labourCost: 0.0,
    _electricityCost: 0.0,
    _transportCost: 0.0,
    _otherCost: 0.0,
    _productionNoteNote: "",
    _productionQty: 0.0,
  });

  // errors for inputfeild
  const [error, setError] = useState({
    _productionItems: "",
    _productionQty: "",
  });

  const fetchData = async () => {
    let result = await getExportProductById(productId);
    if (result) {
      setProduct(result);
      console.log(result);

      setLoading(true);

      const itemSet = [];
      let productItems = result.items;
      if (productItems) {
        for (let x = 0; x < productItems.length; x++) {
          console.log(productItems[x]);
          //set data in new set list to display in the table
          itemSet.push(
            createDataForSelectedTable(
              productItems[x].itemName,
              productItems[x].brand,
              productItems[x].unitType,
              productItems[x].importId,
              null,
              null,
              null,
              null,
              null,
              null,
              productItems[x].qty
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
    handleChange("_productId", productId);
    let responseForRecord = await getLatestProductionByProductId(productId);
    setRecentrecord(responseForRecord);
    console.log(responseForRecord);
  }, []);

  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [recentRecord, setRecentrecord] = React.useState([]);

  //columns for table
  const columns = [
    { id: "item", label: "Item", minWidth: 100, editable: false },
    { id: "brand", label: "Brand", minWidth: 100, editable: false },
    { id: "unitType", label: "Unit Type", minWidth: 100, editable: false },
    {
      id: "unitPriceMethod",
      label: "Price Method",
      minWidth: 100,
      editable: false,
    },
    { id: "unitPrice", label: "Unit Price", minWidth: 100, editable: false },
    { id: "itemQty", label: "Required Qty", minWidth: 100, editable: false },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createDataForSelectedTable(
    item,
    brand,
    unitType,
    importId,
    unitPriceMethod,
    action,
    fromDate,
    toDate,
    unitPrice,
    itemQty,
    avlQty
  ) {
    return {
      item,
      brand,
      unitType,
      importId,
      unitPriceMethod,
      action,
      fromDate,
      toDate,
      unitPrice,
      itemQty,
      avlQty,
    };
  }
  const [page, setPage] = useState(0);
  const [enableSetting, setEnableSetting] = useState(false);
  const [editingRow, setEditingRow] = useState([]);
  const [shouldSave, setShouldSave] = useState(false);

  // Alerts ////////////////////////////////////

  //display alert...
  const [displayAlert, setAlert] = useState(false);

  //alert data
  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
  });

  const closeAlert = () => {
    setAlert(false);
    setAlertData({
      type: "",
      message: "",
    });
  };

  //////////////////////////////////////////////

  const handleSaveClick = () => {
    // Set the rows as production items in productionValues
    const productionItems = rows.map(
      ({
        importId,
        unitPriceMethod,
        unitPrice,
        itemQty,
        fromDate,
        toDate,
      }) => ({
        importId: importId,
        unitPriceMethod: unitPriceMethod,
        unitPrice: unitPrice,
        usingQty: itemQty,
        startDate: fromDate,
        endDate: toDate,
      })
    );
    handleChange("_productionItems", productionItems);
    setShouldSave(true); // Mark that we want to save after updating productionValues
  };

  //reset errors while changing values
  const resetErros = () => {
    // errors for inputfeild
    setError({
      _productionItems: "",
      _productionQty: "",
    });
  };

  // Use an effect to detect when productionValues._productionItems changes and shouldSave is true
  useEffect(() => {
    if (shouldSave) {
      resetErros();
      saveProductionValues();
      setShouldSave(false); // Reset the flag
    }
  }, [productionValues._productionItems, shouldSave]);

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

  const handleChange = (name, val) => {
    console.log(name);
    console.log(val);
    if (name === "_productionQty") {
      setError({
        ...error,
        _productionQty: "",
      });
    }
    setProductionValues({
      ...productionValues,
      [name]: val,
    });
  };

  const matchLastValues = () => {
    let itemList = rows.map((row) => {
      const matchedItem = recentRecord.items?.find(
        (item) => row.importId === item.importItem.importId
      );
      return matchedItem
        ? {
            ...row,
            unitPrice: matchedItem.unitPrice,
            unitPriceMethod: matchedItem.method,
            itemQty: matchedItem.usingQty,
          }
        : row;
    });

    setRows(itemList);

    setProductionValues({
      ...productionValues,
      _productionQty:
        recentRecord.productionQty != null ? recentRecord.productionQty : 0,
      _labourCost:
        recentRecord.labourCost != null ? recentRecord.labourCost : 0,
      _electricityCost:
        recentRecord.electricityCost != null ? recentRecord.electricityCost : 0,
      _transportCost:
        recentRecord.transportCost != null ? recentRecord.transportCost : 0,
      _otherCost: recentRecord.otherCost != null ? recentRecord.otherCost : 0,
      _productionNoteNote: recentRecord.note,
    });
  };

  const clearData = () => {
    let itemList = rows.map((row) => ({
      ...row,
      unitPrice: 0.0,
      unitPriceMethod: "",
      itemQty: 0,
    }));

    setRows(itemList);

    setProductionValues({
      ...productionValues,
      _productionQty: 0,
      _labourCost: 0.0,
      _electricityCost: 0.0,
      _transportCost: 0.0,
      _otherCost: 0.0,
      _productionNoteNote: "",
    });
  };

  const saveProductionValues = async () => {
    console.log(productionValues);
    console.log(rows);
    let submitErrors = Ex_ProductionValidation(productionValues, rows);
    setError(submitErrors);
    console.log(error);
    if (!submitErrors._productionQty && !submitErrors._productionItems) {
      console.log("Errors empty...");
      let submit_production = await addProduction(productionValues);
      if (submit_production) {
        clearData();
        setAlertData({
          type: "success",
          message: "Item submitted..",
        });
        setAlert(true);
      } else {
        setAlertData({
          type: "error",
          message: "Something went wrong...",
        });
        setAlert(true);
      }
    }
  };

  return (
    <Paper className={classes.container} elevation={8}>
      {product.product_id ? (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6">Production</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              style={{ float: "right" }}
              onClick={() => {
                handleSaveClick();
              }}
            >
              SAVE
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h7" fontWeight="700">
              Product Name
            </Typography>
            <Typography>{product.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h7" fontWeight="700">
              Bar Code
            </Typography>
            <Typography>{product.barcode}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={12}>
            <InputField
              name="_productionQty"
              value={productionValues._productionQty}
              onChange={(event, newInputValue) =>
                handleChange(event, parseInt(newInputValue))
              }
              errorMsg={error._productionQty}
              type="number"
              label="Production Qty"
            />
          </Grid>
          {recentRecord !== "" ? (
            <Grid item xs={6}>
              <Button
                variant="outlined"
                style={{ float: "right" }}
                onClick={() => {
                  matchLastValues();
                }}
              >
                GET LAST RECORD
              </Button>
            </Grid>
          ) : null}
          {error._productionItems ? (
            <Grid item xs={12} sm={12} sx={12}>
              <Typography
                align="left"
                variant="caption"
                style={{
                  color: "red",
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingLeft: 40,
                }}
              >
                {error._productionItems}
              </Typography>
            </Grid>
          ) : null}
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

          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              name="_electricityCost"
              value={productionValues._electricityCost}
              onChange={(event, newInputValue) =>
                handleChange(event, parseFloat(newInputValue))
              }
              type="number"
              label="Electricity Cost"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              name="_labourCost"
              value={productionValues._labourCost}
              onChange={(event, newInputValue) =>
                handleChange(event, parseFloat(newInputValue))
              }
              type="number"
              label="Labour Cost"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              name="_transportCost"
              value={productionValues._transportCost}
              onChange={(event, newInputValue) =>
                handleChange(event, parseFloat(newInputValue))
              }
              type="number"
              label="Transport Cost"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              name="_otherCost"
              value={productionValues._otherCost}
              onChange={(event, newInputValue) =>
                handleChange(event, parseFloat(newInputValue))
              }
              type="number"
              label="Other Cost"
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={12}>
            {displayAlert ? (
              <FormAlert type={alertData.type} message={alertData.message} />
            ) : null}
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
