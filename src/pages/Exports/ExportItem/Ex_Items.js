import {
  Button,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableItem from "../../../components/TableItem";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import InputField from "../../../FormComponents/InputField";
import Alart from "../../../components/Alart";
import Ex_ItemForm from "./Ex_ItemForm";
import { getExportProducts } from "../../../services/Export";
import ItemSelectingPopup from "../../../components/ItemSelectingPopup";
import Ex_CategorySelectingPopup from "../../../components/Ex_CategorySelectingPopup";

const useStyles = makeStyles({
  container: {
    padding: "5px",
  },
});

// import items all functionalties..
function Ex_Items() {
  const classes = useStyles();
  const history = useHistory();

  ///////////////////// Alart for errors ///////////////

  //////////////////////////////////////////////////////

  ///////////////////// Alart for disable items ///////////////
  const [openDisableWarning, setOpenDisableWarning] = React.useState(false);
  const [msgDisableWarning, setMsgDisableWarning] = React.useState({
    title: "Warning",
    content: "Confirm You Need To Disable This Product",
  });
  const [disableItemId, setDisableItemId] = useState(null);

  function DisableWarningActionButtons() {
    return (
      <>
        <Button
          onClick={async () => {
            // await DiactivateItemById(disableItemId);
            setOpenDisableWarning(false);
            await fetchData();
          }}
        >
          Disable
        </Button>
        <Button
          onClick={() => {
            setOpenDisableWarning(false);
          }}
        >
          Cancle
        </Button>
      </>
    );
  }

  const disableProduct = async (id) => {
    setDisableItemId(id);
    setOpenDisableWarning(true);
  };
  /////////////////////////////////////////////////////////////
  useEffect(async () => {
    await fetchData();
  }, []);

  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  //columns for table
  const columns = [
    { id: "barcode", label: "Barcode", minWidth: 80 },
    { id: "name", label: "Product", minWidth: 100 },
    {
      id: "category_m",
      label: "Main Category",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "existingQty",
      label: "Existing Qty",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createData(
    barcode,
    name,
    category_m,
    existingQty,
    status,
    action,
    product_id
  ) {
    return {
      barcode,
      name,
      category_m,
      existingQty,
      status,
      action,
      product_id,
    };
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);
  
  // set open item table
  const [openItemTable, setOpenItemTable] = useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [itemRows, setItemRows] = React.useState([]);

  // set open category table
  const [openCatgoryTable, setOpenCatgoryTable] = useState(false);
  const [selectedCatgory, setSelectedCatgory] = useState([]);
  const [catgoryRows, setCatgoryRows] = useState([]);

  const handleChange = async (event, value) => {
    setPage(value - 1);
    await fetchData();
  };

  //fetch data for pagination actions
  const fetchData = async () => {
    setLoading(true);
    //get import items data when page loading...
    let result = await getExportProducts(page, rowsPerPage, filter);
    let exportProductSet = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);
    setTotalRows(result.totalElements);

    const newSet = [];
    if (exportProductSet) {
      for (let x = 0; x < exportProductSet?.length; x++) {
        let category_list = exportProductSet[x].ex_category;
        //set data in new set list to display in the table
        newSet.push(
          createData(
            exportProductSet[x].barcode,
            exportProductSet[x].name,
            category_list.category,
            exportProductSet[x].existingQty,
            exportProductSet[x].status,
            exportProductSet[x].product_id
          )
        );
      }
    }

    // set rows to table
    setRows(newSet);
    setLoading(false);
  };

  const handleAction = async (event, id) => {
    switch (event) {
      case "view":
        // history.push("/template/im_item_view/" + id);
        break;
      case "edit":
        console.log("Id: " + id);
        history.push("/template/ex_product_edit/" + id);
        break;
      case "disable":
        // disableProduct(id);
        break;
      case "production":
        history.push("/template/ex_product_production/" + id);
        break;
      default:
        return "foo";
    }
  };

  // filter values
  const [filter, setFilter] = useState({
    _barcode: "",
    _product: "",
    _addedBy: "",
    _categories: [],
    _items: [],
    _status: "",
  });

  //reset filters
  const resetFilters = () => {
    setFilter({
      _barcode: "",
      _product: "",
      _addedBy: "",
      _categories: [],
      _items: [],
      _status: "",
    });

    fetchData();
  };

  // handle categories
  const handleOpenCategoryTable = async () => {
    setOpenCatgoryTable(true);
  };

  const handleCloseCatgoryTable = async () => {
    setOpenCatgoryTable(false);
    setFilter({
      ...filter,
      _categories: selectedCatgory,
    });
  };

  //handle open Item Table
  const handleOpenItemTable = async () => {
    setOpenItemTable(true);
  };

  // handle Close Item Table
  const handleCloseItemTable = async () => {
    setOpenItemTable(false);
    setFilter({
      ...filter,
      _items: selectedItems,
    });
  };

  //to handle changing filters
  const handleFilterChange = (name, val) => {
    setFilter({
      ...filter,
      [name]: val,
    });
  };

  return (
    <>
      <Alart
        open={openDisableWarning}
        message={msgDisableWarning}
        actions={<DisableWarningActionButtons />}
      />
      <Paper className={classes.container} elevation={8}>
        {/* import list or import from */}
        {openForm ? (
          <Ex_ItemForm setOpenForm={setOpenForm} />
        ) : (
          <Grid container spacing={5}>
            <Grid item xs={12} sm={10} sx={12}>
              <Typography mt={1} variant="h6">
                {" "}
                Export Items{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} sx={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Add Peoduct
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} sx={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2} sx={12}>
                  <InputField
                    name="_barcode"
                    value={filter._barcode}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Barcode"
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                  <InputField
                    name="_product"
                    value={filter._product}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Product Name"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_addedBy"
                    value={filter._addedBy}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Added By"
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={12}>
                  <InputField
                    name="_status"
                    value={filter._status}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Status"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <Button onClick={handleOpenCategoryTable} variant="outlined">
                    Select Category
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <Button onClick={handleOpenItemTable} variant="outlined">
                    Select Item
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        resetFilters();
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        fetchData();
                      }}
                    >
                      Filter
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} sx={12}>
              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableItem
                  columns={columns}
                  rows={rows}
                  page={page}
                  setPage={setPage}
                  tablePagin={true}
                  totalPages={totalPages}
                  getData={fetchData}
                  handleAction={handleAction}
                  showActions={["view", "edit", "disable", "production"]}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12} sx={12}>
              <Stack spacing={3}>
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  size="small"
                  onChange={handleChange}
                />
              </Stack>
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
        {openItemTable ? (
          <ItemSelectingPopup
            setOpenTable={setOpenItemTable}
            openTable={openItemTable}
            handleCloseTable={handleCloseItemTable}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            setRows={setItemRows}
            rows={itemRows}
          />
        ) : null}
      </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
}

export default Ex_Items;
