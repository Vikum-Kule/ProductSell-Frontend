import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Pagination,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import {
  getAllBills,
  getImportItemById,
  addImportBill,
} from "../../../services/Import";
import AutoCompleteFeild from "../../../FormComponents/AutoCompleteFeild";
import InputField from "../../../FormComponents/InputField";
import { getUser } from "../../../Utils/Common";
import BillWritableTable from "../../../components/BillWritableTable";
import FormAlert from "../../../components/FormAlert";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SyncIcon from "@mui/icons-material/Sync";
import ItemSelectingPopup from "../../../components/ItemSelectingPopup";
import Validation from "../../../Validation/ImportBillValidation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // height: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Im_addBill({ setOpenForm }) {
  //load shop names
  const getShopNames = async () => {
    let bill_list = await getAllBills();
    setBills(bill_list);
  };

  //for input feild values
  const [values, setValues] = useState({
    _billNo: "",
    _shop: "",
    _discount: 0.0,
    _total: 0.0,
    _billNote: "",
    _payment: "",
  });

  //Reset values
  const resetValues = () => {
    closeAlert();
    setSelectedItems([]);
    setValues({
      _billNo: "",
      _shop: "",
      _discount: 0.0,
      _total: 0.0,
      _billNote: "",
      _payment: "",
    });
  };

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

  //dataset for bills
  const [bills, setBills] = useState([]);

  // set open table
  const [openTable, setOpenTable] = useState(false);

  // errors for inputfeild
  const [error, setError] = useState({});

  const handleChange = (name, val) => {
    console.log(name, val);
    // if(event.target.name ==='_payment'){

    // }

    setValues({
      ...values,
      [name]: val,
    });
  };

  //columns for selected table
  const selectedColumns = [
    { id: "item", label: "Item", minWidth: 100, editable: false },
    { id: "brand", label: "Brand", minWidth: 100, editable: false },
    {
      id: "qty",
      label: "Qty",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: false,
    },
    { id: "billUnit", label: "Bill Unit", minWidth: 100, editable: true },
    { id: "unitType", label: "Unit", minWidth: 100, editable: false },
    {
      id: "itemUintsPerBillUnit",
      label: "Item Units Amount",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: true,
    },
    {
      id: "unitPrice",
      label: "Unit Price",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: true,
    },
    {
      id: "discountPerItem",
      label: "Discount",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: true,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: true,
    },
  ];

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  //just hard coded...
  const [writeable_page, set_writeable_Page] = React.useState(0);
  const [writeable_rowsPerPage, set_writeable_RowsPerPage] =
    React.useState(100);

  const [payment, setPayment] = React.useState("");

  const handlePaymentChange = (event) => {
    console.log(event);
    setPayment(event.target.value);
    console.log(payment);

    setValues({
      ...values,
      _payment: event.target.value,
    });
  };

  const handleOpenTable = async () => {
    setOpenTable(true);
  };

  const handleCloseTable = async () => {
    setOpenTable(false);
    const selectedArray = [];
    console.log("selectedItems", selectedItems);
    for (let x = 0; x < selectedItems.length; x++) {
      let importItem = await getImportItemById(selectedItems[x]);
      console.log("importItem", importItem);
      selectedArray.push(
        createDataForSelectedTable(
          importItem.itemName,
          importItem.brand,
          0.0,
          importItem.unitType,
          importItem.unitType,
          0.0,
          0.0,
          0.0,
          0.0,
          importItem.importId
        )
      );
    }
    console.log("selectedArray", selectedArray);
    setSelectedRows(selectedArray);
    console.log("Selected Rows", selectedRows);
  };

  function createDataForSelectedTable(
    item,
    brand,
    qty,
    billUnit,
    unitType,
    itemUintsPerBillUnit,
    unitPrice,
    discountPerItem,
    price,
    importId
  ) {
    return {
      item,
      brand,
      qty,
      billUnit,
      unitType,
      itemUintsPerBillUnit,
      unitPrice,
      discountPerItem,
      price,
      importId,
    };
  }

  //bill items price and discount operations
  const priceDiscountOperations = () => {
    console.log(selectedRows);
    const billRows = [...selectedRows];
    let _totalPrice = 0.0;
    for (let x = 0; x < billRows.length; x++) {
      if (billRows[x].qty !== 0 && billRows[x].price !== 0) {
        let _unitPrice =
          (parseFloat(billRows[x].price) -
            parseFloat(billRows[x].discountPerItem)) /
          parseFloat(billRows[x].qty);
        billRows[x] = { ...billRows[x], unitPrice: _unitPrice };
        _totalPrice = _totalPrice + parseFloat(billRows[x].price);
      } else if (
        selectedRows[x].qty !== 0 &&
        selectedRows[x].unitPrice !== 0 &&
        selectedRows[x].price === 0
      ) {
        let _itemPrice =
          parseFloat(billRows[x].qty) * parseFloat(billRows[x].unitPrice) -
          parseFloat(billRows[x].discountPerItem);
        billRows[x] = { ...billRows[x], price: _itemPrice };
        _totalPrice = _totalPrice + parseFloat(_itemPrice);
        console.log("unit price avl");
      }
    }
    setSelectedRows(billRows);
    setValues({
      ...values,
      _total: _totalPrice,
    });
  };

  const submitValue = async () => {
    if (selectedRows) {
      console.log(selectedRows);
      //set bill items according to the bill body
      const importBillItems = [];
      for (let x = 0; x < selectedRows.length; x++) {
        const item = {
          qty: parseFloat(selectedRows[x].qty),
          discount_perItem: parseFloat(selectedRows[x].discountPerItem),
          price: parseFloat(selectedRows[x].price),
          importId: selectedRows[x].importId,
          pricePerItem: parseFloat(selectedRows[x].unitPrice),
          billUnit: selectedRows[x].billUnit,
          prodUnitAmountPerBillUnit: parseFloat(
            selectedRows[x].itemUintsPerBillUnit
          ),
        };
        importBillItems.push(item);
      }

      ////create bill body

      //get user name
      let user = getUser();
      const billBody = {
        addedBy: user.username,
        billNo: values._billNo,
        shop: values._shop,
        paymentStatus: values._payment,
        note: values._billNote,
        total: values._total,
        discount: values._discount,
        import_billItems: importBillItems,
      };

      setError(Validation(billBody, selectedRows));
      console.log(error);

      if (!error._billNo && !error._shop && !error._total && !error._items) {
        console.log("Errors empty");
      }

      // console.log(billBody);
      // let result = await addImportBill(billBody);

      // if (result) {
      //   resetValues();
      //   setAlertData({
      //     type: "success",
      //     message: "Item submitted..",
      //   });
      //   setAlert(true);
      // } else {
      //   setAlertData({
      //     type: "error",
      //     message: "Something went wrong...",
      //   });
      //   setAlert(true);
      // }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Add Import Bill{" "}
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
      <Grid item xs={12} sm={4} sx={12}>
        <InputField
          name="_billNo"
          errorMsg={error._billNo}
          value={values._billNo}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Bill Number"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <AutoCompleteFeild
          _key="shop"
          name="_shop"
          value={values._shop}
          dataSet={bills}
          label="Shop"
          onClick={getShopNames}
          errorMsg={error._shop}
          onchange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={12}>
        <Button onClick={handleOpenTable} variant="outlined">
          Select Item
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        {/* selected table */}
        {selectedItems.length != 0 ? (
          <BillWritableTable
            columns={selectedColumns}
            rows={selectedRows}
            setRows={setRows}
            page={writeable_page}
            setPage={set_writeable_Page}
            rowsPerPage={writeable_rowsPerPage}
            tablePagin={false}
            setRowsPerPage={set_writeable_RowsPerPage}
          />
        ) : null}
      </Grid>
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
          {error._items}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <InputField
          name="_discount"
          value={values._discount}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Discount"
        />
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small">Payment Method</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            name="_payment"
            value={values._payment}
            label="Payment Method"
            onChange={handlePaymentChange}
          >
            <MenuItem value={"cash"}>Cash</MenuItem>
            <MenuItem value={"card"}>Card</MenuItem>
            <MenuItem value={"cheque"}>Cheque</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <InputField
          name="_total"
          value={values._total}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Total"
        />

        {/* <Typography variant="subtitle2" gutterBottom component="div">{values._total}</Typography> */}
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
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_billNote"
          value={values._billNote}
          // onChange={(event, newInputValue) => handleChange(event, newInputValue)}
          type="text"
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
        {openTable ? (
          <ItemSelectingPopup
            setOpenTable={setOpenTable}
            openTable={openTable}
            handleCloseTable={handleCloseTable}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            setRows={setRows}
            rows={rows}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default Im_addBill;
