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
import { getImportData, DiactivateItemById } from "../../../services/Import";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import InputField from "../../../FormComponents/InputField";
import Alart from "../../../components/Alart";
import { getSaleProductData } from "../../../services/Sales";
import SaleProductForm from "./SaleProductForm";

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
  categoryContainer: {
    padding: "10px",
  },
});

// Sale products all functionalties..
function SaleProducts() {
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
            await DiactivateItemById(disableItemId);
            setOpenDisableWarning(false);
            await fetchData(filter, page);
          }}
        >
          Disable
        </Button>
        <Button
          onClick={() => {
            setOpenDisableWarning(false);
          }}
        >
          Cancel
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
    await fetchData(filter, page);
  }, []);

  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  //columns for table
  const columns = [
    { id: "date", label: "Date", minWidth: 80 },
    { id: "barcode", label: "Barcode", minWidth: 80 },
    { id: "product", label: "Product", minWidth: 100 },
    { id: "billNumber", label: "Bill Number", minWidth: 100 },
    {
      id: "sllingQty",
      label: "Selling Qty",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "paidStatus", label: "Paid Status", minWidth: 100 },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createData(
    date,
    barcode,
    product,
    billNumber,
    sllingQty,
    paidStatus,
    action,
    sellingId,
    productId
  ) {
    return {
      date,
      barcode,
      product,
      billNumber,
      sllingQty,
      paidStatus,
      action,
      sellingId,
      productId,
    };
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);

  const handleChange = async (event, value) => {
    setPage(value - 1);
    await fetchData(filter, value - 1);
  };

  //fetch data for pagination actions
  const fetchData = async (productFilter, pageNo) => {
    setLoading(true);
    //get import items data when page loading...
    console.log(page);
    let result = await getSaleProductData(pageNo, rowsPerPage, productFilter);
    let saleProductList = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);
    setTotalRows(result.totalElements);

    const newSet = [];
    if (saleProductList) {
      for (let x = 0; x < saleProductList.length; x++) {
        //set data in new set list to display in the table
        newSet.push(
          createData(
            saleProductList[x].saleDate,
            saleProductList[x].product.barcode,
            saleProductList[x].product.name,
            saleProductList[x].billNumber,
            saleProductList[x].sellingQty,
            saleProductList[x].paidStatus,
            saleProductList[x].saleId,
            saleProductList[x].product.product_id
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
        console.log("View Id:", id)
        history.push("/template/sale_product_view/" + id);
        break;
      case "edit":
        history.push("/template/sale_product_edit/" + id);
        break;
      case "disable":
        disableProduct(id);
        break;
      default:
        return "foo";
    }
  };

  // filter values
  const [filter, setFilter] = useState({
    _barcode: "",
    _productName: "",
    _billNumber: "",
    _addedBy: "",
    _customer: "",
    _paidStatus: "",
  });

  //reset filters
  const resetFilters = () => {
    setFilter({
      _barcode: "",
      _productName: "",
      _billNumber: "",
      _addedBy: "",
      _customer: "",
      _paidStatus: "",
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
          <SaleProductForm setOpenForm={setOpenForm} />
        ) : (
          <Grid container spacing={5}>
            <Grid item xs={12} sm={10} sx={12}>
              <Typography mt={1} variant="h6">
                {" "}
                Sale Items{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} sx={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Add Sale
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
                    name="_productName"
                    value={filter._productName}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Product Name"
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                  <InputField
                    name="_billNumber"
                    value={filter._billNumber}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Bill Number"
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
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
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_customer"
                    value={filter._customer}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Customer"
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={12}>
                  <InputField
                    name="_paidStatus"
                    value={filter._paidStatus}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Paid Status"
                  />
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
                        fetchData(filter, page);
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
                  handleAction={handleAction}
                  showActions={["view", "edit", "disable"]}
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
          </Grid>
        )}
      </Paper>
    </>
  );
}

export default SaleProducts;
