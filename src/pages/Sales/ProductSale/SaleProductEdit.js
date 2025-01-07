import { Button, Grid, Typography, Paper, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Validation from "../../../Validation/SaleProductValidation";
import { makeStyles } from "@mui/styles";
import Ex_ProductSelectingPopup from "../../../components/Ex_ProductSelectingPopup";
import { getExportProductById } from "../../../services/Export";
import InputField from "../../../FormComponents/InputField";
import {
  addSaleProduct,
  getSaleProductById,
  updateSaleProduct,
} from "../../../services/Sales";
import { useParams } from "react-router-dom";
import FormAlert from "../../../components/FormAlert";

const useStyles = makeStyles({
  categoryContainer: {
    padding: "10px",
  },
  categoryTag: {
    marginRight: "10px",
  },
});

function SaleProductEdit({ history }) {
  const classes = useStyles();
  const { saleId } = useParams();

  //for input feild values
  const [value, setValue] = useState({
    _product: null,
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
      _product: null,
      _customer: "",
      _paidStatus: "",
      _sellingQty: 0.0,
      _sellingPricePerUnit: 0.0,
      _costPerProduct: 0.0,
      _billNumber: "",
      _note: "",
    });
    setSelectedProduct([]);
    setSelectedProductData(null);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    let saleData = await getSaleProductById(saleId);
    setValue({
      _product: saleData.product,
      _customer: saleData.customer,
      _paidStatus: saleData.paidStatus,
      _sellingQty: saleData.sellingQty,
      _sellingPricePerUnit: saleData.sellingPricePerUnit,
      _costPerProduct: saleData.costPerProduct,
      _billNumber: saleData.billNumber,
      _note: saleData.note,
    });

    setSelectedProduct([saleData.product.product_id]);
    setSelectedProductData(saleData.product);
  };

  // set open category table
  const [openProductTable, setOpenProductTable] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState(null);

  const handleOpenProductTable = async () => {
    setOpenProductTable(true);
  };

  const handleCloseProductTable = async () => {
    const productDataResponse = await getExportProductById(selectedProduct[0]);
    console.log("selected Product is", productDataResponse);
    setSelectedProductData(productDataResponse);
    setOpenProductTable(false);
    handleChange("_product", productDataResponse);
  };

  // errors for inputfeild
  const [error, setError] = useState({
    _product: "",
    _customer: "",
    _paidStatus: "",
    _sellingQty: "",
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
      !error._product &&
      !error._customer &&
      !error._paidStatus &&
      !error._sellingQty
    ) {
      let data = { ...value };
      let submitSaleProduct = await updateSaleProduct(saleId, data);
      if (submitSaleProduct) {
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
      console.log("Submit Data: ", value);
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Edit Sale Item{" "}
        </Typography>
      </Grid>
      {selectedProductData ? (
        <>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              isdisabled={true}
              name="_productName"
              value={selectedProductData.name}
              type="text"
              label="Product"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              isdisabled={true}
              name="_barcode"
              value={selectedProductData.barcode}
              type="text"
              label="Barcode"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              isdisabled={true}
              name="_existingQty"
              value={selectedProductData.existingQty}
              type="text"
              label="Quentity Exist"
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              isdisabled={true}
              name="_currentPrice"
              value={selectedProductData.currentPrice}
              type="text"
              label="Current Price"
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={12}>
            <Paper className={classes.categoryContainer}>
              <Typography>Category</Typography>
              <Grid container spacing={1}>
                {selectedProductData.ex_categories.map((category) => {
                  return (
                    <Grid item sx={2}>
                      <Chip label={category.category} variant="outlined" pt />
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
        </>
      ) : error._product != "" ? (
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
            {error._product}
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={9} sx={12}>
        <Button onClick={handleOpenProductTable} variant="outlined">
          Select Product
        </Button>
      </Grid>

      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_customer"
          errorMsg={error._customer}
          value={value._customer}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Customer"
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_paidStatus"
          errorMsg={error._paidStatus}
          value={value._paidStatus}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Paid Status"
        />
      </Grid>

      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_sellingQty"
          errorMsg={error._sellingQty}
          value={value._sellingQty}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="number"
          label="Selling Qty"
        />
      </Grid>

      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_sellingPricePerUnit"
          value={value._sellingPricePerUnit}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="number"
          label="Unit Price"
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_billNumber"
          value={value._billNumber}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Bill Number"
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

export default SaleProductEdit;
