import {
  Button,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableItem from "../../components/TableItem";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import InputField from "../../FormComponents/InputField";
import Alart from "../../components/Alart";
import { getCustomers } from "../../services/Customer";
import AddCustomer from "./AddCustomer";

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
  categoryContainer: {
    padding: "10px",
  },
});

// import items all functionalties..
function Customers() {
  const classes = useStyles();
  const history = useHistory();

  ///////////////////// Alart for errors ///////////////

  //////////////////////////////////////////////////////

  ///////////////////// Alart for disable items ///////////////
  const [openDisableWarning, setOpenDisableWarning] = React.useState(false);
  const [msgDisableWarning, setMsgDisableWarning] = React.useState({
    title: "Warning",
    content: "Confirm You Need To Disable This Cusotmer",
  });
  const [disableItemId, setDisableItemId] = useState(null);

  function DisableWarningActionButtons() {
    return (
      <>
        <Button
          onClick={async () => {
            // await DiactivateItemById(disableItemId);
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
    await fetchData(filter, page);
  }, []);

  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  //columns for table
  const columns = [
    { id: "name", label: "Name", minWidth: 80 },
    { id: "phone", label: "Phone", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  function createData(name, phone, email, status, action, customer_id) {
    return { name, phone, email, status, action, customer_id };
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);


  const handleChange = async (event, value) => {
    setPage(value - 1);
    await fetchData(filter, value - 1);
  };

  //fetch data for pagination actions
  const fetchData = async (customerFilter, pageNo) => {
    setLoading(true);
    //get import items data when page loading...
    console.log(page);
    let result = await getCustomers(pageNo, rowsPerPage, customerFilter);
    let customerSet = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);
    setTotalRows(result.totalElements);

    const newSet = [];
    if (customerSet) {
      for (let x = 0; x < customerSet.length; x++) {
        //set data in new set list to display in the table
        newSet.push(
          createData(
            customerSet[x].customerName,
            customerSet[x].phone,
            customerSet[x].email,
            customerSet[x].status,
            customerSet[x].customerId
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
        history.push("/template/im_item_view/" + id);
        break;
      case "edit":
        history.push("/template/im_item_edit/" + id);
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
    _name: "",
    _email: "",
    _status: "",
    _address: ""
  });

  //reset filters
  const resetFilters = () => {
    setFilter({
      _name: "",
      _email: "",
      _status: "",
      _address: "",
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
          <AddCustomer setOpenForm={setOpenForm} />
        ) : (
          <Grid container spacing={5}>
            <Grid item xs={12} sm={10} sx={12}>
              <Typography mt={1} variant="h6">
                {" "}
                Customers{" "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} sx={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Add Customer
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} sx={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2} sx={12}>
                  <InputField
                    name="_name"
                    value={filter._productCode}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Customer Name"
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                  <InputField
                    name="_email"
                    value={filter._itemName}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Email"
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

export default Customers;
