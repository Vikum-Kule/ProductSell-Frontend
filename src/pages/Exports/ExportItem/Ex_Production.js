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
import {
  getExportProductionDataByPaging,
  getExportProducts,
} from "../../../services/Export";
import ItemSelectingPopup from "../../../components/ItemSelectingPopup";
import Ex_CategorySelectingPopup from "../../../components/Ex_CategorySelectingPopup";

const useStyles = makeStyles({
  container: {
    padding: "5px",
  },
});

// import items all functionalties..
function Ex_Production() {
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
    { id: "date", label: "Date", minWidth: 80 },
    { id: "batchNumber", label: "Batch Number", minWidth: 100 },
    { id: "barcode", label: "Barcode", minWidth: 100 },
    { id: "productName", label: "Product", minWidth: 100 },
    {
      id: "productionQty",
      label: "Production Qty",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createData(
    date,
    batchNumber,
    barcode,
    productName,
    productionQty,
    action,
    productionId
  ) {
    return {
      date,
      batchNumber,
      barcode,
      productName,
      productionQty,
      action,
      productionId,
    };
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);

  const [showError, setShowError] = useState("");

  const handleChange = async (event, value) => {
    setPage(value - 1);
    await fetchData();
  };

  //fetch data for pagination actions
  const fetchData = async () => {
    setLoading(true);
    //get import items data when page loading...
    let result = await getExportProductionDataByPaging(
      page,
      rowsPerPage,
      filter
    );
    if (result != "Something went wrong...") {
      setTotalPages(result.totalPages);
      setTotalRows(result.totalElements);
      const newSet = [];
      if (result.content) {
        for (let x = 0; x < result.content?.length; x++) {
          newSet.push(
            createData(
              result.content[x].productionDate,
              result.content[x].productionId.toString(),
              result.content[x].product.barcode,
              result.content[x].product.name,
              result.content[x].productionQty,
              result.content[x].productionId
            )
          );
        }
      }
      console.log("ImportSet", newSet);
      setRows(newSet);
      setLoading(false);
    } else {
      setShowError("Faild to get production data");
      setLoading(false);
    }
  };

  const handleAction = async (event, id) => {
    switch (event) {
      case "view":
        console.log("Id: " + id);
        history.push("/template/ex_production_view/" + id);
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
    _productName: "",
  });

  //reset filters
  const resetFilters = () => {
    setFilter({
      _barcode: "",
      _productName: "",
    });

    fetchData();
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
                Export Production{" "}
              </Typography>
            </Grid>
            {showError == "" ? (
              <>
                <Grid item xs={12} sm={2} sx={12}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenForm(true);
                    }}
                  >
                    Add Product
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
                      showActions={["view", "edit", "delete"]}
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
              </>
            ) : (
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
                  {showError}
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Paper>
    </>
  );
}

export default Ex_Production;
