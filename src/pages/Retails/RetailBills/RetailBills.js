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
import {
  deleteSaleBillById,
  getSaleBillData,
  getSaleProductData,
} from "../../../services/Sales";
// import SaleAddBill from "./SaleAddBill";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import FormAlert from "../../../components/FormAlert";
import { getRetailSaleBillData } from "../../../services/RetailSales";
import RetailAddBill from "./RetailAddBill";
import SalesmanSelectingPopup from "../../../components/SalesmanSelectingPopup";
import Ex_ProductSelectingPopup from "../../../components/Ex_ProductSelectingPopup";

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
  categoryContainer: {
    padding: "10px",
  },
});

// Sale products all functionalties..
function SaleBills() {
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
    { id: "billNumber", label: "Bill Number", minWidth: 100 },
    { id: "customer", label: "Customer", minWidth: 80 },
    { id: "paidStatus", label: "Paid Status", minWidth: 100 },
    {
      id: "totalProfit",
      label: "Total Profit",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totalAmount",
      label: "Total Amount",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createData(
    date,
    billNumber,
    customer,
    paidStatus,
    totalProfit,
    totalAmount,
    action,
    billId
  ) {
    return {
      date,
      billNumber,
      customer,
      paidStatus,
      totalProfit,
      totalAmount,
      action,
      billId,
    };
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isMatched, setIsMatched] = React.useState(false);
  const [matchingText, setMachingText] = React.useState("");
  const [confirmationText, setConfirmationText] = React.useState("");
  const [deletingRow, setDeletingRow] = React.useState("");

  const [openProductSelection, setOpenProductSelection] = React.useState(false);
  const [openSalesPersonSelection, setOpenSalesPersonSelection] =
    React.useState();
  const [selectedSalesman, setSelectedSalesman] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

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

  useEffect(async () => {
    console.log("Updated isMatched value:", isMatched);
    console.log("Popup Status :", openPopup);
    console.log("Row Data for delete: ", deletingRow);
    if (isMatched && !openPopup && deletingRow != null) {
      setLoading(true);
      let deleteResponse = await deleteSaleBillById(deletingRow.action);
      if (deleteResponse) {
        fetchData();
        setLoading(false);
      } else {
        setAlertData({
          type: "error",
          message:
            "Faild to delete  " +
            deletingRow.billNumber +
            " Bill. Something went wrong",
        });
        setAlert(true);
        setLoading(false);
      }
    }
  }, [isMatched, openPopup]);

  const handleOpenPopup = () => {
    setOpenPopup(!openPopup);
  };

  const handleChange = async (event, value) => {
    setPage(value - 1);
    await fetchData(filter, value - 1);
  };

  //fetch data for pagination actions
  const fetchData = async (productFilter, pageNo) => {
    setLoading(true);
    //get import items data when page loading...
    console.log(page);
    let result = await getRetailSaleBillData(
      pageNo,
      rowsPerPage,
      productFilter
    );
    let saleBillList = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);
    setTotalRows(result.totalElements);

    const newSet = [];
    if (saleBillList) {
      for (let x = 0; x < saleBillList.length; x++) {
        //set data in new set list to display in the table
        newSet.push(
          createData(
            saleBillList[x].sellingDate,
            saleBillList[x].billNumber,
            saleBillList[x].salesPerson?.firstName +
              " " +
              saleBillList[x].salesPerson?.lastName,
            saleBillList[x].paidStatus,
            saleBillList[x].totalProfit,
            saleBillList[x].totalPrice,
            saleBillList[x].billId
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
        console.log("View Id:", id);
        history.push("/template/retail_bill_view/" + id);
        break;
      case "edit":
        history.push("/template/retail_bill_edit/" + id);
        break;
      case "disable":
        setIsMatched(false);
        console.log("Delete val: ", id);
        let filterData = rows.find((row) => row.action === id);
        console.log("Filtered Row: ", filterData);
        setDeletingRow(filterData);
        let topicText =
          "Please Confirm Bill Number To Delete " + filterData.billNumber;
        setConfirmationText(topicText);
        setMachingText(filterData.billNumber);
        handleOpenPopup();
        console.log("Test Is match: " + isMatched);
        // if (isMatched) {
        //   deleteSaleBillById(id)
        // }
        // disableProduct(id);
        break;
      default:
        return "foo";
    }
  };

  // filter values
  const [filter, setFilter] = useState({
    _billNumber: "",
    _productName: "",
    _barcode: "",
    _addedBy: "",
    _customer: "",
    _paidStatus: "",
  });

  //reset filters
  const resetFilters = () => {
    setFilter({
      _billNumber: "",
      _productName: "",
      _barcode: "",
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

  const handleOpenProductTable = () => {
    setOpenProductSelection(!openProductSelection);
    if (!openProductSelection) {
      console.log("Closed product selection");
    }
  };

  const handleOpenSalesmanSelection = () => {
    setOpenSalesPersonSelection(!openSalesPersonSelection);
    if (openSalesPersonSelection) {
      console.log("Closed product salesman selection");
    }
  };

  return (
    <>
      <Paper className={classes.container} elevation={8}>
        {/* import list or import from */}
        {openForm ? (
          <RetailAddBill setOpenForm={setOpenForm} />
        ) : (
          <Grid container spacing={5}>
            <Grid item xs={12} sm={10} sx={12}>
              <Typography mt={1} variant="h6">
                {" "}
                Retail Bills{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} sx={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Add Bill
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} sx={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2} sx={12}>
                  <InputField
                    name="_billNumber"
                    value={filter._barcode}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Bill Number"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <Button onClick={handleOpenProductTable} variant="outlined">
                    Select Product
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <Button onClick={handleOpenSalesmanSelection} variant="outlined">
                    Select Salesman
                  </Button>
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
                    name="_barcode"
                    value={filter._billNumber}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Barcode"
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
                        closeAlert();
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        fetchData(filter, page);
                        closeAlert();
                      }}
                    >
                      Filter
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} sx={12}>
              {displayAlert ? (
                <FormAlert type={alertData.type} message={alertData.message} />
              ) : null}
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
            <Grid>
              {openPopup ? (
                <ConfirmationPopup
                  setOpenPopup={setOpenPopup}
                  openPopup={openPopup}
                  handleOpenPopup={handleOpenPopup}
                  matchingText={matchingText}
                  message={confirmationText}
                  isMatched={isMatched}
                  setIsMatched={setIsMatched}
                />
              ) : null}
              {openSalesPersonSelection ? (
                <SalesmanSelectingPopup
                  setOpenSalesmanTable={setOpenSalesPersonSelection}
                  openSalesmanTable={openSalesPersonSelection}
                  handleCloseSalesmanTable={handleOpenSalesmanSelection}
                  setSelectedSalesman={setSelectedSalesman}
                  selectedSalesman={selectedSalesman}
                  isOneChoise={true}
                />
              ) : null}
              {openProductSelection ? (
                        <Ex_ProductSelectingPopup
                          setOpenProductTable={setOpenProductSelection}
                          openProductTable={openProductSelection}
                          handleCloseProductTable={handleOpenProductTable}
                          setSelectedProduct={setSelectedProduct}
                          selectedProduct={selectedProduct}
                          isOneChoise={false}
                        />
                      ) : null}
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
}

export default SaleBills;
