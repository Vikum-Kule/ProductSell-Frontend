import { Button, Chip, Grid, Modal, Pagination, Paper, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../FormComponents/InputField";
import SelectingTable from "../FormComponents/SelectingTable";
import {
  getExCategoryDataByFilter,
  getExportProducts,
} from "../services/Export";
import { getCustomers } from "../services/Customer";

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

export default function CustomerSelectingPopup({
  setOpenCustomerTable,
  openCustomerTable,
  handleCloseCustomerTable,
  setSelectedCustomer,
  selectedCustomer,
  isOneChoise,
}) {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [customerRows, setCustomerRows] = React.useState([]);

  /// filter area /////////////////////////////////

  // filter values
  const [filter, setFilter] = useState({
    _name: "",
    _phone: "",
    _address: "",
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
        _address: "",
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
    setOpenCustomerTable(true);
    //get import items data when page loading...
    let result = await getCustomers(page, rowsPerPage, filter);
    let customerSet = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);

    const newSet = [];
    if (customerSet) {
      for (let x = 0; x < customerSet.length; x++) {
        //set data in new set list to display in the table
        newSet.push(
          createData(
            customerSet[x].customerName,
            customerSet[x].email,
            customerSet[x].phone,
            customerSet[x].address,
            customerSet[x].status,
            customerSet[x].customerId
          )
        );
      }
    }
    // console.log("ImportSet",newSet);
    // set rows to table
    setCustomerRows(newSet);
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

  function createData(
    _name,
    _email,
    _phone,
    _address,
    _status,
    _cutomer_id
  ) {
    return {
        _name,
        _email,
        _phone,
        _address,
        _status,
        _cutomer_id
    };
  }

  return (
    <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2 }}>
      <Modal
        keepMounted
        open={openCustomerTable}
        onClose={handleCloseCustomerTable}
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
                <Grid item xs={12} sm={3} sx={12}>
                  <InputField
                    name="_address"
                    value={filter._address}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Address"
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
                title="Customers"
                columns={columns}
                rows={customerRows}
                setSelected={setSelectedCustomer}
                selected={selectedCustomer}
                _key="_cutomer_id"
                setOpenTable={setOpenCustomerTable}
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
