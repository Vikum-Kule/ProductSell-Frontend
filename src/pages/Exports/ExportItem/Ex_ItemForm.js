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
import { getImportItemById, addImportBill } from "../../../services/Import";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import InputField from "../../../FormComponents/InputField";
import { getUser } from "../../../Utils/Common";
import ExportProductItemWritableTable from "../../../components/ExportProductItemWritableTable";
import FormAlert from "../../../components/FormAlert";
import ItemSelectingPopup from "../../../components/ItemSelectingPopup";
import { makeStyles } from "@mui/styles";

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

function Ex_ItemForm({ setOpenForm }) {
  // const classes = useStyles();
  //for input feild values
  const [values, setValues] = useState({
    _barcode: "",
    _productName: "",
    _itemCost: 0.0,
    _extraCost: 0.0,
    _totalCost: 0.0,
    _profit: 0.0,
    _ProductNote: "",
  });

  //Reset values
  const resetValues = () => {
    closeAlert();
    setSelectedItems([]);
    setValues({
      _barcode: "",
      _productName: "",
      _itemCost: 0.0,
      _extraCost: 0.0,
      _totalCost: 0.0,
      _profit: 0.0,
      _ProductNote: "",
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

  // set open table
  const [openTable, setOpenTable] = useState(false);

  // errors for inputfeild
  const [error, setError] = useState({
    __barcode: "",
    _productName: "",
  });

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
      id: "category_m",
      label: "Main category",
      minWidth: 100,
      editable: false,
    },
    {
      id: "qty",
      label: "Required Qty",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: false,
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
      id: "price",
      label: "cost",
      minWidth: 100,
      editable: true,
      type: "number",
      isDecimal: true,
    },
  ];

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [totalCounts, setTotalCount] = React.useState([]);

  //just hard coded...
  const [writeable_page, set_writeable_Page] = React.useState(0);
  const [writeable_rowsPerPage, set_writeable_RowsPerPage] =
    React.useState(100);

  const handleOpenTable = async () => {
    setOpenTable(true);
  };

  const handleCloseTable = async () => {
    setOpenTable(false);
    const selectedArray = [];
    for (let x = 0; x < selectedItems.length; x++) {
      let importItem = await getImportItemById(selectedItems[x]);
      selectedArray.push(
        createDataForSelectedTable(
          importItem.itemName,
          importItem.brand,
          "category",
          0,
          importItem.unitType,
          0.0,
          0.0,
          0.0,
          importItem.importId
        )
      );
    }
    setSelectedRows(selectedArray);
  };

  function createDataForSelectedTable(
    item,
    brand,
    category_m,
    qty,
    unitType,
    unitPrice,
    discountPerItem,
    price,
    importId
  ) {
    return {
      item,
      brand,
      category_m,
      qty,
      unitType,
      unitPrice,
      discountPerItem,
      price,
      importId,
    };
  }

  const submitValue = async () => {
    if (rows) {
      //set bill items according to the bill body
      const importBillItems = [];
      for (let x = 0; x < rows.length; x++) {
        const item = {
          qty: parseInt(rows[x].qty),
          discount_perItem: parseFloat(rows[x].discountPerItem),
          price: parseFloat(rows[x].price),
          importId: rows[x].importId,
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

      console.log(billBody);
      let result = await addImportBill(billBody);

      if (result) {
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Add Export Product{" "}
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
          name="_barcode"
          errorMsg={error._barcode}
          value={values._barcode}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Barcode"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_productName"
          errorMsg={error._productName}
          value={values._productName}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Product Name"
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2 }}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <Tooltip title="Add Items">
          <IconButton onClick={handleOpenTable} aria-label="add" size="small">
            <AddCircleOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        {/* selected table */}
        {selectedItems.length != 0 ? (
          <ExportProductItemWritableTable
            columns={selectedColumns}
            rows={selectedRows}
            setRows={setRows}
            page={writeable_page}
            setPage={set_writeable_Page}
            rowsPerPage={writeable_rowsPerPage}
            tablePagin={false}
            setRowsPerPage={set_writeable_RowsPerPage}
            setTotalCount={setTotalCount}
          />
        ) : null}
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <InputField
          name="_itemCost"
          value={values._itemCost}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Item Total Cost"
        />
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <InputField
          name="_extraCost"
          value={values._extraCost}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Extra Cost"
        />
      </Grid>
      <Grid item xs={12} sm={3} sx={12}>
        <InputField
          name="_totalCost"
          value={values._totalCost}
          onChange={(event, newInputValue) =>
            handleChange(event, newInputValue)
          }
          type="text"
          label="Total Cost"
        />
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
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <InputField
          name="_ProductNote"
          value={values._ProductNote}
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

export default Ex_ItemForm;
