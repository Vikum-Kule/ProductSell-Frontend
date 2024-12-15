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
import AutoCompleteFeild from "../../../FormComponents/AutoCompleteFeild";
import InputField from "../../../FormComponents/InputField";
import { getAllImportData, getCategoryById } from "../../../services/Import";
import CloseIcon from "@mui/icons-material/Close";
import Validation from "../../../Validation/Validation";
import { addIm_Item } from "../../../services/Import";
import FormAlert from "../../../components/FormAlert";
import Im_CategorySelectingPopup from "../../../components/Im_CategorySelectingPopup";
import { makeStyles } from "@mui/styles";
import Ex_ProductSelectingPopup from "../../components/Ex_productSelectingPopup";

const useStyles = makeStyles({
  categoryContainer: {
    padding: "10px",
  },
  categoryTag: {
    marginRight: "10px",
  },
});

function SaleProductForm({ setOpenForm }) {
  const classes = useStyles();

  //for input feild values
  const [value, setValue] = useState({
    _productId: "",
    _customer: "",
    _paidStatus: "",
    _sellingQty: 0.0,
    _sellingPricePerUnit: 0.0,
    _costPerProduct: 0.0,
    _billNumber: "",
    _note: "",
  });

  //Reset values
  const resetValues = () => {
    setValue({
      _productId: "",
      _customer: "",
      _paidStatus: "",
      _sellingQty: 0.0,
      _sellingPricePerUnit: 0.0,
      _costPerProduct: 0.0,
      _billNumber: "",
      _note: "",
    });
    setImportCategories([]);
  };

  // set open category table
  const [openProductTable, setOpenProductTable] = useState(false);
  const [exportProducts, setExportProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenProductTable = async () => {
    setOpenProductTable(true);
  };

  const handleCloseProductTable = async () => {
    const categoryList = [];
    for (let x = 0; x < selectedCatgory.length; x++) {
      let categoryData = await getCategoryById(selectedCatgory[x]);
      console.log(categoryData);
      categoryList.push(categoryData);
    }
    setImportCategories(categoryList);
    setValue({
      ...value,
      _categories: selectedCatgory,
    });
    setOpenCatgoryTable(false);
    console.log(importCategories);
  };

  // errors for inputfeild
  const [error, setError] = useState({
    _importName: "",
    _importBrand: "",
    _importMCategory: "",
    _importQty: "",
    _importUnitType: "",
    _refillRate: 0,
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
    setError(Validation(value));
    if (
      !error._importName &&
      !error._importQty &&
      !error._importUnitType &&
      !error._importMCategory &&
      !error._importBrand
    ) {
      let data = { ...value };
      let submit_import_data = await addIm_Item(data);
      if (submit_import_data) {
        resetValues();
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
      console.log(submit_import_data);
    }
  };

  //for import itens
  const [itemSet, setItem] = useState([]);
  //to handle changing value
  const handleChange = (name, val) => {
    console.log(name, val);
    setValue({
      ...value,
      [name]: val,
    });
  };

  //load import data when click on input feild
  const loadData = async () => {
    resetErrors();
    closeAlert();
    let importSet = await getAllImportData();
    console.log("array items", importSet);
    setItem(importSet);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Add Import Item{" "}
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
      <Grid item xs={12} sm={9} sx={12}>
        <AutoCompleteFeild
          name="_importName"
          _key="itemName"
          value={value._importName}
          dataSet={itemSet}
          label="Import Name"
          onClick={loadData}
          errorMsg={error._importName}
          onchange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <AutoCompleteFeild
          name="_importBrand"
          _key="brand"
          value={value._importBrand}
          dataSet={itemSet}
          label="Brand"
          errorMsg={error._importBrand}
          onClick={loadData}
          onchange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_productCode"
          value={value._productCode}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Product Code"
        />
      </Grid>
      {importCategories.length !== 0 ? (
        <Grid item xs={12} sm={12} sx={12}>
          <Paper
            className={classes.categoryContainer}
            onClick={handleOpenCategoryTable}
          >
            <Typography>Category</Typography>
            <Grid container spacing={1}>
              {importCategories.map((category) => {
                return (
                  <Grid item sx={2}>
                    <Chip label={category.category} variant="outlined" pt />
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <Grid item xs={12} sm={9} sx={12}>
          <Button onClick={handleOpenCategoryTable} variant="outlined">
            Select Category
          </Button>
        </Grid>
      )}
      <Grid item xs={12} sm={3} sx={12}>
        <AutoCompleteFeild
          name="_importUnitType"
          _key="unitType"
          value={value._importUnitType}
          dataSet={itemSet}
          label={"Unit type"}
          onClick={loadData}
          errorMsg={error._importUnitType}
          onchange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
        />
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <InputField
          name="_refillRate"
          value={value._refillRate}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Refill Rate"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_importNote"
          value={value._importNote}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="number"
          label="Note"
          multiline={true}
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
        {openProductTable ? (
          <Ex_ProductSelectingPopup
            setOpenProductTable={setOpenProductTable}
            openProductTable={openProductTable}
            handleCloseProductTable={handleCloseProductTable}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default SaleProductForm;
