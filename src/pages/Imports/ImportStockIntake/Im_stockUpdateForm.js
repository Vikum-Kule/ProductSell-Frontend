import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import {
  addStockIntakeItem,
  getImportItemById,
} from "../../../services/Import";
import CloseIcon from "@mui/icons-material/Close";
import Validation from "../../../Validation/Im_StockIntakeValidation";
import { makeStyles } from "@mui/styles";
import InputField from "../../../FormComponents/InputField";
import ItemSelectingPopup from "../../../components/ItemSelectingPopup";
import SyncIcon from "@mui/icons-material/Sync";
import FormAlert from "../../../components/FormAlert";

const useStyles = makeStyles({
  categoryContainer: {
    padding: "10px",
  },
  categoryTag: {
    marginRight: "10px",
  },
});

function Im_stockUpdateForm({ setOpenForm }) {
  const classes = useStyles();

  //for input feild values
  const [value, setValue] = useState({
    _importitem: null,
    _importQty: 0,
    _pricePerItem: 0.0,
    _totalPrice: 0.0,
    _discount: 0.0,
    _note: "",
  });

  //Reset values
  const resetValues = () => {
    setValue({
      _importitem: null,
      _importQty: 0,
      _pricePerItem: 0.0,
      _totalPrice: 0.0,
      _discount: 0.0,
      _note: "",
    });
    setSelectedItem([]);
    setSelectedItemData(null);
  };

  // set open category table
  const [openItemTable, setOpenItemTable] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [rows, setRows] = React.useState([]);

  const handleOpenItemTable = async () => {
    setOpenItemTable(true);
  };

  const handleCloseItemTable = async () => {
    const itemDataResponse = await getImportItemById(selectedItem[0]);
    if (itemDataResponse != "Something went wrong...") {
      console.log("selected Product is", itemDataResponse);
      setSelectedItemData(itemDataResponse);
      setOpenItemTable(false);
      handleChange("_importitem", itemDataResponse);
    } else {
      setError({
        ...error,
        _importItem: "Canot fetch Item...",
      });
      setOpenItemTable(false);
    }
  };

  // errors for inputfeild
  const [error, setError] = useState({
    _importItem: "",
    _price: "",
    _importQty: "",
  });

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

  //reset errors...
  const resetErrors = () => {
    setError({});
  };

  //set error
  const submitValue = async () => {
    setError({});
    setError(Validation(value));
    console.log(error);
    if (!error._importItem && !error._price && !error._importQty) {
      let data = { ...value };
      let submitStockUpdate = await addStockIntakeItem(data);
      if (submitStockUpdate) {
        resetValues();
        setAlertData({
          type: "success",
          message: "Item submitted..",
        });
          setAlert(true);
          setError({});
      } else {
        setAlertData({
          type: "error",
          message: "Something went wrong...",
        });
        setAlert(true);
      }
        console.log("Submit Data: ", value);
        setError({});
    }
  };

  //to handle changing value
  const handleChange = (name, val) => {
    console.log(name, val);
    setValue({
      ...value,
      [name]: val,
    });
  };

  //import item price and discount operations
  const priceDiscountOperations = () => {
    if (value._pricePerItem > 0 && value._totalPrice == 0.0) {
      let totalPrice = 0.0;
      if (value._discount > 0) {
        let unitPriceWithDiscount =
          parseFloat(value._pricePerItem) + parseFloat(value._discount);
        totalPrice = unitPriceWithDiscount * parseInt(value._importQty);
        setValue({
          ...value,
          _totalPrice: totalPrice,
        });
      } else {
        totalPrice =
          parseFloat(value._pricePerItem) * parseInt(value._importQty);
        setValue({
          ...value,
          _totalPrice: totalPrice,
        });
      }
    } else if (value._pricePerItem == 0.0 && value._totalPrice > 0.0) {
      let unitPrice = 0.0;
      if (value._discount > 0) {
        let totalPriceWithoutDiscount =
          parseFloat(value._totalPrice) - parseFloat(value._discount);
        unitPrice = (
          totalPriceWithoutDiscount / parseInt(value._importQty)
        ).toFixed(2);
        setValue({
          ...value,
          _pricePerItem: unitPrice,
        });
      } else {
        unitPrice = (
          parseFloat(value._totalPrice) / parseInt(value._importQty)
        ).toFixed(2);
        setValue({
          ...value,
          _pricePerItem: unitPrice,
        });
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Add Stock Intake{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={1} sx={12}>
        <Tooltip title="Close">
          <IconButton
            onClick={() => {
              setOpenForm(false);
            }}
            aria-label="close"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      {selectedItemData ? (
        <>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              isdisabled={true}
              name="_itemName"
              value={selectedItemData.itemName}
              type="text"
              label="Item"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              isdisabled={true}
              name="_productCode"
              value={selectedItemData.product_code}
              type="text"
              label="Item Code"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              isdisabled={true}
              name="_unitType"
              value={selectedItemData.unitType}
              type="text"
              label="Unit Type"
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={12}>
            <Paper className={classes.categoryContainer}>
              <Typography>Category</Typography>
              <Grid container spacing={1}>
                {selectedItemData.im_categories.map((category) => {
                  return (
                    <Grid item sx={2}>
                      <Chip
                        label={
                          <Typography>
                            <span
                              style={{ fontSize: "0.8rem", fontWeight: "500" }}
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
          </Grid>
        </>
      ) : error._importItem != "" ? (
        <Grid container>
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
            {error._importItem}
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={9} sx={12}>
        <Button onClick={handleOpenItemTable} variant="outlined">
          Select Item
        </Button>
      </Grid>
      {error._price != "" ? (
        <Grid container>
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
            {error._price}
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_importQty"
          errorMsg={error._importQty}
          value={value._importQty}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="number"
          label="Import Qty"
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_pricePerItem"
          value={value._pricePerItem}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="number"
          label="Price Per Item"
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_discount"
          value={value._discount}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="number"
          label="Discount"
        />
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <Tooltip title="Calculate">
          <IconButton
            onClick={priceDiscountOperations}
            aria-label="calculate"
            size="small"
          >
            <SyncIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_totalPrice"
          value={value._totalPrice}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="number"
          label="Total Price"
        />
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        {displayAlert ? (
          <FormAlert type={alertData.type} message={alertData.message} />
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={4} sx={12}>
            <Button fullWidth variant="contained" onClick={submitValue}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={1} sx={12}>
            <Button onClick={resetValues} variant="outlined">
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        {openItemTable ? (
          <ItemSelectingPopup
            isOneChoise={true}
            setOpenTable={setOpenItemTable}
            openTable={openItemTable}
            handleCloseTable={handleCloseItemTable}
            setSelectedItems={setSelectedItem}
            selectedItems={selectedItem}
            setRows={setRows}
            rows={rows}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default Im_stockUpdateForm;
