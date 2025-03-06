import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import Validation from "../../../Validation/SaleBillValidation";
import { makeStyles } from "@mui/styles";
import Ex_ProductSelectingPopup from "../../../components/Ex_ProductSelectingPopup";
import { getExportProductById } from "../../../services/Export";
import InputField from "../../../FormComponents/InputField";
import { addSaleBill } from "../../../services/Sales";
import ProfitCard from "../../../components/ProfitCard";
import TableItem from "../../../components/TableItem";
import SaleBillItemForm from "./SaleBillItemForm";
import FormAlert from "../../../components/FormAlert";
import { getCustomerById } from "../../../services/Customer";
import CustomerDataComponent from "../../../components/CustomerDataComponent";
import CustomerSelectingPopup from "../../../components/CustomerSelectingPopup";

const useStyles = makeStyles({
  categoryContainer: {
    padding: "10px",
  },
  categoryTag: {
    marginRight: "10px",
  },
});

function SaleAddBill({ setOpenForm }) {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = useState({
    _billNumber: "",
    _customer: null,
    _paidStatus: "",
    _totalPrice: 0.0,
    _totalCost: 0.0,
    _discount_percentage: 0.0,
    _discount_value: 0.0,
    _totalProfit: 0.0,
    _note: "",
  });

  const resetValues = () => {
    setValue({
      _billNumber: "",
      _customer: null,
      _paidStatus: "",
      _totalPrice: 0.0,
      _totalCost: 0.0,
      _discount_percentage: 0.0,
      _discount_value: 0.0,
      _totalProfit: 0.0,
      _note: "",
    });
    setSelectedProduct([]);
    setSelectedProductData([]);
    setDiscountType("Percentage");
    setDiscountVal(0.0);
    setSelectedProductRow(null);
    setRows([]);
    setSelectedCustomer([]);
    setSelectedCustomerData(null);
    setError({});
  };

  const [openProductTable, setOpenProductTable] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [profit, setProfit] = useState(0.0);
  const [profitMargin, setProfitMargin] = useState(0.0);
  const [openProductProcess, setOpenProductProcess] = useState(false);
  const [selectedProductRow, setSelectedProductRow] = useState(null);
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountVal, setDiscountVal] = useState(0.0);
  const [openCustomerTable, setOpenCustomerTable] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);

  const discountTypes = [
    {
      value: "Percentage",
      label: "%",
    },
    {
      value: "Rupees",
      label: "Rs",
    },
  ];

  //just hard coded...
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalPages, setTotalPages] = React.useState(0);

  useEffect(() => {
    if (openProductProcess) {
      console.log("openProductProcess", openProductProcess);
      console.log("Selected Product Row: ", selectedProductRow);
    }
  }, [openProductProcess, selectedProductRow]);

  useEffect(() => {
    console.log("Use effect called...");
    handleTotalAmounts();
  }, [openProductProcess, discountVal]);

  const handleOpenProductTable = async () => {
    setOpenProductTable(true);
  };

  const handleOpenCustomerTable = async () => {
    setOpenCustomerTable(true);
  };

  const handleTotalAmounts = () => {
    console.log("Setep in..");
    if (rows.length > 0) {
      let totalBillProfit = 0.0;
      let totalItemPrice = 0.0;
      let totalBillCost = 0.0;
      rows.map((row) => {
        if (row.totalCost != 0.0) {
          totalBillCost = totalBillCost + row.totalCost;
        }
        if (row.totalPrice != 0.0) {
          totalItemPrice = totalItemPrice + row.totalPrice;
        }
        if (row.totalProfit != 0.0) {
          totalBillProfit = totalBillProfit + parseFloat(row.totalProfit);
        }
      });

      if (discountVal > 0.0) {
        console.log("Discount type: ", discountType);
        console.log("Discount val: ", value._discount_value);
        totalItemPrice = totalItemPrice - value._discount_value;
      }
      console.log("Total Item Price: ", totalItemPrice);
      console.log("Total Bill Cost: ", totalBillCost);
      console.log("Total Bill Profit: ", totalBillProfit);
      setValue({
        ...value,
        _totalPrice: totalItemPrice,
        _totalCost: totalBillCost,
        _totalProfit: totalBillProfit,
      });
    }
  };

  const handleOpenProductProcess = () => {
    setOpenProductProcess(!openProductProcess);
  };

  const handleDiscountType = (val) => {
    setDiscountType(val.target.value);
  };

  const handleCloseProductTable = async () => {
    if (selectedProduct.length !== 0) {
      const productDataList = [];
      selectedProduct.map(async (product) => {
        console.log("Product: ", product);
        const productData = await getExportProductById(product);
        console.log("Product Data: ", productData);
        productDataList.push(
          createDataForProductTable(
            productData.name,
            productData.barcode,
            0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            null,
            productData.product_id,
            []
          )
        );
      });
      setRows(productDataList);
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

  const handleAction = async (event, id) => {
    switch (event) {
      case "saleProduct":
        console.log("Production ID: ", id);
        setSelectedProductRow(id);
        handleOpenProductProcess();
        // history.push("/template/ex_product_production/" + id);
        break;
      default:
        return "foo";
    }
  };

  const [error, setError] = useState({
    _billNumber: "",
    _product: "",
    _customer: "",
    _paidStatus: "",
    _totalPrice: "",
    _products: "",
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
    setError(Validation(value, rows));
    console.log("Selected Data: ", rows);
    if (
      !error._products &&
      !error._customer &&
      !error._paidStatus &&
      !error._totalPrice &&
      !error._billNumber
    ) {
      console.log("Bill data: ", value);
      console.log("Bill item data: ", rows);

      let billItemList = rows.map((row) => ({
        productId: row.productId,
        bill_qty: row.sellingQty,
        discount_perItem: 0.0,
        pricePerItem: row.unitPrice,
        price: row.totalPrice,
        itemProfit: row.totalProfit,
        profitMargin: row.profitMargin,
        costPerItem: row.totalCost,
        note: "",
        saleProductionItems: row.batches.map((batch) => ({
          usingQty: batch.saleQty,
          productionId: batch.productionId,
        })),
      }));

      console.log("bill List: ", billItemList);
      let submitBill = await addSaleBill(value, billItemList);

      if (submitBill) {
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

  const handleDiscountVal = (name, val) => {
    let valueInRupees;
    if (discountType == "Percentage") {
      valueInRupees = parseFloat(value._totalPrice) * (parseFloat(val) / 100);
      setValue({
        ...value,
        _discount_percentage: parseFloat(val),
        _discount_value: valueInRupees,
      });
    } else {
      valueInRupees = parseFloat(val);
      setValue({
        ...value,
        _discount_value: valueInRupees,
      });
    }
    setDiscountVal(val);
  };

  //columns for selected table
  const productColumns = [
    {
      id: "productName",
      label: "Product Name",
      minWidth: 100,
      editable: false,
    },
    {
      id: "barcode",
      label: "Barcode",
      minWidth: 100,
      editable: false,
    },
    {
      id: "sellingQty",
      label: "Selling Qty",
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
      id: "totalProfit",
      label: "Total Profit",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "profitMargin",
      label: "Profit Margin",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "unitPrice",
      label: "Unit Price",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    {
      id: "totalPrice",
      label: "Total Price",
      minWidth: 100,
      editable: false,
      type: "number",
      isDecimal: false,
    },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createDataForProductTable(
    productName,
    barcode,
    sellingQty,
    totalCost,
    totalProfit,
    profitMargin,
    unitPrice,
    totalPrice,
    action,
    productId,
    batches
  ) {
    return {
      productName,
      barcode,
      sellingQty,
      totalCost,
      totalProfit,
      profitMargin,
      unitPrice,
      totalPrice,
      action,
      productId,
      batches,
    };
  }

  return openProductProcess ? (
    <SaleBillItemForm
      productRow={selectedProductRow}
      setProductRows={setRows}
      handleOpenProductProcess={handleOpenProductProcess}
    />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          Add Sale Bill
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
      <Grid item xs={12} sm={6} sx={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12} sm={4} sx={12}>
            <Button onClick={handleOpenProductTable} variant="outlined">
              Select Product
            </Button>
          </Grid>
          <Grid item>
            <InputField
              name="_billNumber"
              value={value._billNumber}
              errorMsg={error._billNumber}
              onChange={(event, newInputValue) =>
                handleChange(event, newInputValue)
              }
              type="text"
              label="Bill Number"
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
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        {selectedProductData.length != 0 ? (
          <TableItem
            columns={productColumns}
            rows={rows}
            page={page}
            setPage={setPage}
            tablePagin={true}
            totalPages={totalPages}
            handleAction={handleAction}
            showActions={["saleProduct"]}
          />
        ) : (
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
        )}
      </Grid>
      {selectedProductData.length != 0 ? (
        <Grid item xs={12} sm={6} sx={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} sx={12}>
                  <TextField
                    id="_discountType"
                    select
                    size="small"
                    label="Discount Type"
                    defaultValue="Percentage"
                    fullWidth
                    onChange={(inputVal) => {
                      handleDiscountType(inputVal);
                    }}
                  >
                    {discountTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={8} sx={12}>
                  <InputField
                    name="_discount"
                    value={discountVal}
                    onChange={(event, newInputValue) =>
                      handleDiscountVal(event, newInputValue)
                    }
                    type="text"
                    label="Discount"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} sx={12}></Grid>
            <Grid item>
              <InputField
                name="_totalProfit"
                errorMsg={error._paidStatus}
                value={value._totalProfit}
                onChange={(event, newInputValue) =>
                  handleChange(event, newInputValue)
                }
                type="text"
                label="Total Profit"
              />
            </Grid>
            <Grid item>
              <InputField
                name="_totalPrice"
                errorMsg={error._paidStatus}
                value={value._totalPrice}
                onChange={(event, newInputValue) =>
                  handleChange(event, newInputValue)
                }
                type="text"
                label="Total Price"
              />
            </Grid>
          </Grid>
        </Grid>
      ) : null}
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
            isOneChoise={false}
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

export default SaleAddBill;
