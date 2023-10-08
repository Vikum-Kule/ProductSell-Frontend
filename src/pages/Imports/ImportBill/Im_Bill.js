import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { typography } from "@mui/system";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import TableItem from "../../../components/TableItem";
import {
  getImportBillData,
  getImportBillById,
  searchImportItem,
} from "../../../services/Import";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Im_addBill from "./Im_addBill";
import { useHistory } from "react-router";
import InputField from "../../../FormComponents/InputField";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});

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

function Im_Bill() {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);
  const [billLoading, set_billLoading] = React.useState(false);
  const [itemLoading, set_itemLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [search, setSearch] = React.useState("");

  useEffect(async () => {
    await fetchData();
  }, []);

  //get bill data
  const fetchData = async () => {
    //get import Categories data when page loading...
    set_billLoading(true);
    let result = await getImportBillData(page, rowsPerPage, filter);
    console.log(result);
    let billSet = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);

    const newSet = [];
    if (billSet?.length != 0) {
      for (let x = 0; x < billSet?.length; x++) {
        let splitDate = billSet[x].createdDate.split("T");

        newSet.push(
          createDataForBills(
            billSet[x].billNo,
            billSet[x].addedBy,
            splitDate[0],
            billSet[x].shop,
            billSet[x].bill_id
          )
        );
      }
    }
    set_billLoading(false);

    // set rows to table
    setRows(newSet);
  };

  //creating data for rows according to Id
  function createDataForBills(bill_num, added_by, date, shop, action, billId) {
    return { bill_num, added_by, date, shop, action, billId };
  }

  //columns for table
  const columns_bill = [
    { id: "bill_num", label: "Bill No.", minWidth: 100 },
    { id: "added_by", label: "Added By", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
    { id: "shop", label: "Shop", minWidth: 100 },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  //Drop down list for table
  const popUpList = [
    { id: 1, label: "View Items" },
    { id: 2, label: "Edit" },
    { id: 3, label: "Delete" },
  ];

  const handleChange = async (event, value) => {
    setPage(value - 1);
    console.log("Page", page);
    await fetchData();
  };

  // filter values
  const [filter, setFilter] = useState({
    _productCode: "",
    _itemName: "",
    _shop: "",
    _addedBy: "",
    _billNo: "",
  });

  //reset filters
  const resetFilters = () => {
    setFilter({
      _productCode: "",
      _itemName: "",
      _shop: "",
      _addedBy: "",
      _billNo: "",
    });

    fetchData(page);
  };

  //to handle changing filters
  const handleFilterChange = (name, val) => {
    setFilter({
      ...filter,
      [name]: val,
    });
  };

  const handleAction = (event, id) => {
    console.log(event);
    switch (event) {
      case "view":
        history.push("/template/im_bill_view/" + id);
        break;
      case "edit":
        return "bar";
      case "delete":
        return "bar";
      default:
        return "foo";
    }
  };

  return (
    <Paper className={classes.container}>
      {openForm ? (
        <Im_addBill setOpenForm={setOpenForm} />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={9} sx={12}>
            <Typography mt={1} variant="h6">
              {" "}
              Import Bills{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <Button
              variant="contained"
              onClick={() => {
                setOpenForm(true);
              }}
            >
              Add New Bill
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} sx={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3} sx={12}>
                <InputField
                  name="_productCode"
                  value={filter._productCode}
                  onChange={(event, newInputValue) =>
                    handleFilterChange(event, newInputValue)
                  }
                  type="text"
                  label="Product Code"
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={12}>
                <InputField
                  name="_itemName"
                  value={filter._itemName}
                  onChange={(event, newInputValue) =>
                    handleFilterChange(event, newInputValue)
                  }
                  type="text"
                  label="Item Name"
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={12}>
                <InputField
                  name="_shop"
                  value={filter._shop}
                  onChange={(event, newInputValue) =>
                    handleFilterChange(event, newInputValue)
                  }
                  type="text"
                  label="Shop"
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
              <Grid item xs={12} sm={4} sx={12}>
                <InputField
                  name="_billNo"
                  value={filter._billNo}
                  onChange={(event, newInputValue) =>
                    handleFilterChange(event, newInputValue)
                  }
                  type="text"
                  label="Bill Number"
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
            {billLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableItem
                setRow={null}
                dropDown={false}
                columns={columns_bill}
                rows={rows}
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
        </Grid>
      )}
    </Paper>
  );
}

export default Im_Bill;
