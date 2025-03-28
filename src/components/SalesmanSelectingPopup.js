import {
  Button,
  Chip,
  Grid,
  Modal,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../FormComponents/InputField";
import SelectingTable from "../FormComponents/SelectingTable";
import {
  getExCategoryDataByFilter,
  getExportProducts,
} from "../services/Export";
import { getCustomers } from "../services/Customer";
import { getSalesPersonByPaging } from "../services/SalesPerson";

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

export default function SalesmanSelectingPopup({
  setOpenSalesmanTable,
  openSalesmanTable,
  handleCloseSalesmanTable,
  setSelectedSalesman,
  selectedSalesman,
  isOneChoise,
}) {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [salesmanRows, setSalesmanRows] = React.useState([]);

  /// filter area /////////////////////////////////

  // filter values
  const [filter, setFilter] = useState({
    _name: "",
    _phone: "",
    _email: "",
    _status: "",
  });

  //to handle changing filters
  const handleFilterChange = (name, val) => {
    setFilter({
      ...filter,
      [name]: val,
    });
  };

  //reset filters
  const resetFilters = () => {
    setFilter({
      _name: "",
      _phone: "",
      _email: "",
      _status: "",
    });
  };

  /////////////////////////////////////////////////

  const handleChangepage = async (event, value) => {
    setPage(value - 1);
  };

  useEffect(async () => {
    await fetchData();
  }, [page, filter]);

  const fetchData = async () => {
    setOpenSalesmanTable(true);
    //get import items data when page loading...
    let result = await getSalesPersonByPaging(page, rowsPerPage, filter);
    let salesmanSet = result.content;
    console.log("SalesmanSet", salesmanSet);

    //set total rows and pages
    setTotalPages(result.totalPages);

    const newSet = [];
    if (salesmanSet) {
      for (let x = 0; x < salesmanSet.length; x++) {
        //set data in new set list to display in the table
        newSet.push(
          createData(
            salesmanSet[x].firstName + " " + salesmanSet[x].lastName,
            salesmanSet[x].email,
            salesmanSet[x].phoneNumber,
            salesmanSet[x].status,
            salesmanSet[x].salespersonId
          )
        );
      }
    }
    // console.log("ImportSet",newSet);
    // set rows to table
    setSalesmanRows(newSet);
  };

  const columns = [
    {
      id: "_name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "_email",
      numeric: false,
      disablePadding: true,
      label: "email",
    },
    {
      id: "_phone",
      numeric: false,
      disablePadding: true,
      label: "Phone",
    },
    {
      id: "_address",
      numeric: false,
      disablePadding: true,
      label: "Address",
    },
    {
      id: "_status",
      numeric: true,
      disablePadding: true,
      label: "Status",
    },
  ];

  function createData(_name, _email, _phone, _status, _salesman_id) {
    return {
      _name,
      _email,
      _phone,
      _status,
      _salesman_id,
    };
  }

  return (
    <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2 }}>
      <Modal
        keepMounted
        open={openSalesmanTable}
        onClose={handleCloseSalesmanTable}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={style}>
          <Grid container>
            <Grid item xs={12} sm={12} sx={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2} sx={12}>
                  <InputField
                    name="_name"
                    value={filter._name}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                  <InputField
                    name="_email"
                    value={filter._email}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_phone"
                    value={filter._phone}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Phone Number"
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
              <SelectingTable
                isOneChoise={isOneChoise}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                title="Sales Person"
                columns={columns}
                rows={salesmanRows}
                setSelected={setSelectedSalesman}
                selected={selectedSalesman}
                _key="_salesman_id"
                setOpenTable={setOpenSalesmanTable}
              />
            </Grid>

            <Stack spacing={3}>
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                size="small"
                onChange={handleChangepage}
              />
            </Stack>
          </Grid>
        </Paper>
      </Modal>
    </Grid>
  );
}
