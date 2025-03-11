import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Validation from "../../../Validation/SaleProductValidation";
import { makeStyles } from "@mui/styles";
import Ex_ProductSelectingPopup from "../../../components/Ex_ProductSelectingPopup";
import CustomerSelectingPopup from "../../../components/CustomerSelectingPopup";
import {
  getExportProductById,
  getProductionsForSales,
} from "../../../services/Export";
import InputField from "../../../FormComponents/InputField";
import { addSaleProduct } from "../../../services/Sales";
import ProductionWritableTable from "../../../components/ProductionWritableTable";
import { Padding } from "@mui/icons-material";
import ProfitCard from "../../../components/ProfitCard";
import { getCustomerById } from "../../../services/Customer";
import CustomerDataComponent from "../../../components/CustomerDataComponent";

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

  const [value, setValue] = useState({
    _product: null,
    _customer: null,
    _paidStatus: "",
    _sellingQty: 0.0,
    _sellingPricePerUnit: 0.0,
    _costPerProduct: 0.0,
    _billNumber: "",
    _note: "",
  });

  const resetValues = () => {
    setValue({
      _product: null,
      _customer: null,
      _paidStatus: "",
      _sellingQty: 0.0,
      _sellingPricePerUnit: 0.0,
      _costPerProduct: 0.0,
      _billNumber: "",
      _note: "",
    });
    setSelectedProduct([]);
    setSelectedProductData(null);
    setSelectedCustomer([]);
    setSelectedCustomerData(null);
    setProfitMargin(0.0);
    setProfit(0.0);
    setproductionCost(0.0);
    setRows([]);
    resetErrors();
  };

  const [openProductTable, setOpenProductTable] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [openCustomerTable, setOpenCustomerTable] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);
  const [rows, setRows] = React.useState([]);
  const [profit, setProfit] = useState(0.0);
  const [profitMargin, setProfitMargin] = useState(0.0);
  const [productionCost, setproductionCost] = useState(0.0);

  //just hard coded...
  const [writeable_page, set_writeable_Page] = React.useState(0);
  const [writeable_rowsPerPage, set_writeable_RowsPerPage] =
    React.useState(100);

  useEffect(async () => {
    setError({
      ...error,
      _product: "",
    });
    await loadProductionData();
  }, [selectedProduct, value._sellingQty]);

  // useEffect(async () => {
  //   handleProfit();
  // }, [selectedProduct, value._sellingPricePerUnit]);

  const handleOpenProductTable = async () => {
    setOpenProductTable(true);
  };

  const handleOpenCustomerTable = async () => {
    setOpenCustomerTable(true);
  };

  const handleCloseProductTable = async () => {
    if (selectedProduct.length !== 0) {
      const productDataResponse = await getExportProductById(
        selectedProduct[0]
      );
      setSelectedProductData(productDataResponse);
      setOpenProductTable(false);
      handleChange("_product", productDataResponse);
    } else {
      setOpenProductTable(false);
    }
  };

  const handleCloseCustomerTable = async () => {
    if (selectedCustomer.length !== 0) {
      console.log(selectedCustomer[0]);
      const customerResponse = await getCustomerById(selectedCustomer[0]);
      if (customerResponse == "Something went wrong...") {
        setError({
          ...error,
          _customer: "Something went wrong...",
        });
        return;
      } else {
        console.log("Customer Data: " + customerResponse);
        setSelectedCustomerData(customerResponse);
        setOpenCustomerTable(false);
        setValue({
          ...value,
          _customer: selectedCustomer[0],
        });
      }
      
    } else {
      setOpenCustomerTable(false);
    }
  };

  const handleProfit = (val) => {
    console.log("handle profit");
    console.log("Profit val: ", profit);
    let costPerUnit = productionCost / parseFloat(value._sellingQty);
    let profitVal = parseFloat(val) - costPerUnit;
    if (!isNaN(profitVal)) {
      console.log("set p val: ", profitVal);
      setProfit(profitVal.toFixed(2) * value._sellingQty);
    }
    console.log("Profit val: ", profit);

    let profitMarginVal = (profitVal / val) * 100;
    if (!isNaN(profitMarginVal)) {
      setProfitMargin(profitMarginVal.toFixed(2));
    }
  };

  const handleProfitMargin = (val) => {
    setProfitMargin(val);
    console.log("val: ", val);
    console.log("production cost: ", productionCost);

    // Validate and parse the input value
    const profitMarginValue = parseFloat(val);
    if (isNaN(profitMarginValue)) return;

    let costPerUnit = productionCost / parseFloat(value._sellingQty);
    let unitPriceVal = costPerUnit / (1 - val / 100);
    unitPriceVal = Math.round(unitPriceVal * 2) / 2;
    let unitProfitVal = unitPriceVal - costPerUnit;
    console.log("selling Qty: ", value._sellingQty);
    if (!isNaN(unitProfitVal) && !isNaN(value._sellingQty)) {
      console.log("set p val: ", unitProfitVal * value._sellingQty);
      setProfit(unitProfitVal * value._sellingQty);
      setValue({
        ...value,
        _sellingPricePerUnit: unitPriceVal.toFixed(2),
      });
    }

    console.log("Profit val: ", profit);
  };

  const loadProductionData = async () => {
    if (selectedProduct.length > 0 && value._sellingQty > 0) {
      let productionSet = await getProductionsForSales(
        selectedProduct[0],
        value._sellingQty
      );
      const selectedArray = [];
      console.log("production set", productionSet);
      if (productionSet.length === 0) {
        setRows([]);
        setError({
          ...error,
          _product: "No sufficient productions found for this product",
        });
        return;
      }
      let requiredQty = value._sellingQty;
      let costVal = 0.0;
      for (let x = 0; x < productionSet.length; x++) {
        let availableQty =
          parseInt(productionSet[x].productionQty) -
          parseInt(productionSet[x].soldQuantity);

        let sellingQty = 0;
        if (requiredQty > availableQty) {
          sellingQty = availableQty;
          requiredQty -= availableQty;
        } else {
          sellingQty = requiredQty;
        }

        // calculate production cost
        costVal =
          costVal +
          (parseFloat(productionSet[x].totalCost) /
            parseFloat(productionSet[x].productionQty)) *
            sellingQty;

        selectedArray.push(
          createDataForProductionTable(
            productionSet[x].productionDate,
            productionSet[x].productionId.toString(),
            availableQty,
            productionSet[x].totalItemCost,
            productionSet[x].labourCost,
            productionSet[x].electricityCost,
            productionSet[x].transportCost,
            productionSet[x].otherCost,
            productionSet[x].totalCost,
            sellingQty,
            productionSet[x].productionId
          )
        );
      }
      setproductionCost(costVal);
      setRows(selectedArray);
    } else {
      setRows([]);
    }
  };

  const [error, setError] = useState({
    _product: "",
    _customer: "",
    _paidStatus: "",
    _sellingQty: "",
  });

  const [displayAlert, setAlert] = useState(false);

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

  const resetErrors = () => {
    setError({});
  };

  const submitValue = async () => {
    setError(Validation(value));
    console.log("Selected Data: ", rows);
    if (
      !error._product &&
      !error._customer &&
      !error._paidStatus &&
      !error._sellingQty
    ) {
      let productionList = rows.map((row) => ({
        usingQty: row.saleQty,
        productionId: row.productionId, // Assuming the rows array contains productionQty property
      }));
      let data = {
        ...value,
        _totalProfit: profit,
        _profitMargin: profitMargin,
      };
      let submitSaleProduct = await addSaleProduct(data, productionList);
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
    }
  };

  const handleChange = (name, val) => {
    setValue({
      ...value,
      [name]: val,
    });
  };

  //columns for selected table
  const productionColumns = [
    { id: "date", label: "Production Date", minWidth: 100, editable: false },
    {
      id: "batchNumber",
      label: "ProductionBatch",
      minWidth: 100,
      editable: false,
    },
    {
      id: "availableQty",
      label: "Available Qty",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "itemCost",
      label: "Item Cost",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "labourCost",
      label: "Labour Cost",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "electricityCost",
      label: "Electricity Cost",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "transportCost",
      label: "Transport Cost",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "otherCost",
      label: "Other Cost",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "totalCost",
      label: "Total Cost",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "saleQty",
      label: "Selling Qty",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: true,
    },
  ];

  function createDataForProductionTable(
    date,
    batchNumber,
    availableQty,
    itemCost,
    labourCost,
    electricityCost,
    transportCost,
    otherCost,
    totalCost,
    saleQty,
    productionId
  ) {
    return {
      date,
      batchNumber,
      availableQty,
      itemCost,
      labourCost,
      electricityCost,
      transportCost,
      otherCost,
      totalCost,
      saleQty,
      productionId,
    };
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          Add Sale Item
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
              label="Quantity Exist"
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
                {selectedProductData.ex_categories.map((category) => (
                  <Grid item sx={2} key={category.id}>
                    <Chip label={category.category} variant="outlined" pt />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </>
      ) : error._product !== "" ? (
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

      <Grid item xs={12} sm={12} sx={12}>
        {/* selected table */}
        {rows.length != 0 ? (
          <ProductionWritableTable
            columns={productionColumns}
            rows={rows}
            setRows={setRows}
            page={writeable_page}
            setPage={set_writeable_Page}
            rowsPerPage={writeable_rowsPerPage}
            tablePagin={false}
            setRowsPerPage={set_writeable_RowsPerPage}
          />
        ) : error._product ===
          "No sufficient productions found for this product" ? (
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
      </Grid>
      <Grid item xs={12} sm={6} sx={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12} sm={4} sx={12}>
            <Button onClick={handleOpenProductTable} variant="outlined">
              Select Product
            </Button>
          </Grid>
          <Grid item>
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
          <Grid item>
            <InputField
              name="_sellingPricePerUnit"
              value={value._sellingPricePerUnit}
              onChange={(event, newInputValue) => {
                handleChange(event, newInputValue);
                handleProfit(newInputValue);
              }}
              type="number"
              label="Unit Price"
            />
          </Grid>

          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              onChange={(event, newInputValue) =>
                handleProfitMargin(newInputValue)
              }
              name="_profitMargin"
              value={profitMargin}
              type="number"
              label="Profit Margin"
            />
          </Grid>
          {selectedCustomerData ? (
            <Grid item xs={12} sm={4} sx={12}>
              <CustomerDataComponent customer={selectedCustomerData} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} sx={12}>
              <Button onClick={handleOpenCustomerTable} variant="outlined">
                Select Customer
              </Button>
            </Grid>
          )}
          <Grid item>
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
          <Grid item>
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
        </Grid>
      </Grid>
      {value._sellingQty != 0 &&
      (value._sellingPricePerUnit != 0.0 || profitMargin != 0.0) &&
      rows.length != 0 ? (
        <Grid item xs={12} sm={6} sx={12}>
          <Grid item sx={{ paddingTop: { sm: "50px" } }}>
            <ProfitCard
              totalPrice={value._sellingPricePerUnit * value._sellingQty}
              profit={profit}
              profitMargin={profitMargin}
            />
          </Grid>
        </Grid>
      ) : null}

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
            isOneChoise={true}
          />
        ) : null}
        {openCustomerTable ? (
          <CustomerSelectingPopup
            setOpenCustomerTable={setOpenCustomerTable}
            openCustomerTable={openCustomerTable}
            handleCloseCustomerTable={handleCloseCustomerTable}
            setSelectedCustomer={setSelectedCustomer}
            selectedCustomer={selectedCustomer}
            isOneChoise={true}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default SaleProductForm;
