import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { getImportItemById } from "../../../services/Import";
import InputField from "../../../FormComponents/InputField";
import { getUser } from "../../../Utils/Common";
import ExportProductItemWritableTable from "../../../components/ExportProductItemWritableTable";
import FormAlert from "../../../components/FormAlert";
import ItemSelectingPopup from "../../../components/ItemSelectingPopup";
import { makeStyles } from "@mui/styles";
import {
  updateExportProduct,
  getExportProductById,
  getExCategoryById,
} from "../../../services/Export";
import { Validators } from "../../../Validation/FormValidation";
import Ex_ItemFormValidation from "../../../Validation/Ex_ItemFormValidation";
import Ex_CategorySelectingPopup from "../../../components/Ex_CategorySelectingPopup";
import { useParams } from "react-router-dom";

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

function Ex_ItemEdit({ histroy }) {
  const { productId } = useParams();
  // const classes = useStyles();
  //for input feild values
  const [values, setValues] = useState({
    _barcode: "",
    _productName: "",
    _ProductNote: "",
  });

  //Reset values
  const resetValues = () => {
    setError({ _barcode: "", _productName: "" });
    setSelectedCatgory([]);
    setExportCategory({});
    closeAlert();
    setSelectedItems([]);
    setValues({
      _barcode: "",
      _productName: "",
      _ProductNote: "",
    });
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  const fetchData = async () => {
    let productData = await getExportProductById(productId);
    console.log(productData);
    let productCategory = productData.ex_category;
    let importItems = productData.items;
    const selectedArray = [];
    const importidemIdArray = [];
    for (let x = 0; x < importItems.length; x++) {
      importidemIdArray.push(importItems[x].imports.importId);
      selectedArray.push(
        createDataForSelectedTable(
          importItems[x].imports.itemName,
          importItems[x].imports.brand,
          importItems[x].imports.im_category.category,
          importItems[x].usingQty,
          importItems[x].itemId
        )
      );
    }
    setSelectedRows(selectedArray);

    // set values for the export products
    setValues({
      _barcode: productData.barcode,
      _productName: productData.name,
      _ProductNote: productData.note,
    });
    selectedCatgory[0] = productCategory.cat_id;
    setExportCategory(productCategory);
    setSelectedItems(importidemIdArray);
    console.log(selectedItems);
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

  // set open item table
  const [openTable, setOpenTable] = useState(false);

  // set open category table
  const [openCatgoryTable, setOpenCatgoryTable] = useState(false);
  const [selectedCatgory, setSelectedCatgory] = useState([]);
  const [exportCategory, setExportCategory] = useState();
  const [catgoryRows, setCatgoryRows] = useState([]);

  // errors for inputfeild
  const [error, setError] = useState({
    _barcode: "",
    _productName: "",
  });

  const handleChange = (name, val) => {
    setError({
      _barcode: "",
      _productName: "",
    });
    closeAlert();
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

  const handleOpenCategoryTable = async () => {
    setOpenCatgoryTable(true);
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
          importItem.im_category.category,
          0,
          importItem.importId
        )
      );
    }
    setSelectedRows(selectedArray);
  };

  const handleCloseCatgoryTable = async () => {
    let categoryData = await getExCategoryById(selectedCatgory[0]);
    console.log(categoryData);
    setExportCategory(categoryData);
    setOpenCatgoryTable(false);
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
    console.log(values);
    let errorMsg = Ex_ItemFormValidation(values);
    setError(errorMsg);
    console.log(exportCategory);
    if (!errorMsg._barcode && !errorMsg._productName) {
      console.log(errorMsg);
      if (selectedRows) {
        //set product items according to the Product body
        const importItems = [];
        for (let x = 0; x < selectedRows?.length; x++) {
          const item = {
            useQty: parseInt(selectedRows[x].qty),
            itemId: selectedRows[x].importId,
          };
          importItems.push(item);
        }

        ////create product body

        //get user name
        let user = getUser();
        const productBody = {
          name: values._productName,
          barcode: values._barcode,
          categoryId: exportCategory?.cat_id,
          status: "ACTIVE",
          addedBy: user.username,
          note: values._ProductNote,
          items: importItems,
        };

        console.log(productBody);

        let result = await updateExportProduct(productBody, productId);

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
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={11} sx={12}>
        <Typography mt={1} variant="h6">
          {" "}
          Edit Export Product{" "}
        </Typography>
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
          validators={[{ check: Validators.required }]}
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
          validators={[{ check: Validators.required }]}
        />
      </Grid>
      <Grid item xs={12} sm={9} sx={12}>
        <Button onClick={handleOpenCategoryTable} variant="outlined">
          Select Category
        </Button>
      </Grid>
      {selectedCatgory.length !== 0 ? (
        <>
          <Grid item xs={12} sm={9} sx={12}>
            <InputField
              name="_category"
              value={exportCategory?.category}
              type="text"
              label="Category"
              isdisabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={9} sx={12}>
            <InputField
              name="_subCat_1"
              value={exportCategory?.subCat_1}
              type="text"
              label="Subcategory 1"
              isdisabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={9} sx={12}>
            <InputField
              name="_subCat_2"
              value={exportCategory?.subCat_2}
              type="text"
              label="Subcategory 2"
              isdisabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={9} sx={12}>
            <InputField
              name="_subCat_3"
              value={exportCategory?.subCat_3}
              type="text"
              label="Subcategory 3"
              isdisabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={9} sx={12}>
            <InputField
              name="_subCat_4"
              value={exportCategory?.subCat_4}
              type="text"
              label="Subcategory 4"
              isdisabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={9} sx={12}>
            <InputField
              name="_subCat_5"
              value={exportCategory?.subCat_5}
              type="text"
              label="Subcategory 5"
              isdisabled={true}
            />
          </Grid>
        </>
      ) : null}
      <Grid item xs={12} sm={9} sx={12}>
        <Button onClick={handleOpenTable} variant="outlined">
          Select Import Items
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} sx={12}>
        {/* selected table */}
        {selectedItems.length !== 0 ? (
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
        {openCatgoryTable ? (
          <Ex_CategorySelectingPopup
            setOpenCatgoryTable={setOpenCatgoryTable}
            openCatgoryTable={openCatgoryTable}
            handleCloseCatgoryTable={handleCloseCatgoryTable}
            setSelectedCatgory={setSelectedCatgory}
            selectedCatgory={selectedCatgory}
            setCatgoryRows={setCatgoryRows}
            catgoryRows={catgoryRows}
          />
        ) : null}
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

export default Ex_ItemEdit;
