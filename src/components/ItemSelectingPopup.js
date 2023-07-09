import { Button, Grid, Modal, Pagination, Paper, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../FormComponents/InputField";
import SelectingTable from "../FormComponents/SelectingTable";
import { getImportData } from "../services/Import";

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

export default function ItemSelectingPopup({
  setOpenTable,
  openTable,
  handleCloseTable,
  setSelectedItems,
  selectedItems,
  rows,
  setRows,
}) {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  
  /// filter area /////////////////////////////////

  // filter values
  const [filter, setFilter] = useState({
    _productCode: "",
    _itemName: "",
    _brand: "",
    _category: "",
    _unitType: "",
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
      _productCode: "",
      _itemName: "",
      _brand: "",
      _category: "",
      _unitType: "",
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
    setOpenTable(true);
    //get import items data when page loading...
    let result = await getImportData(page, 3, filter);

    let importSet = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);

    const newSet = [];

    for (let x = 0; x < importSet.length; x++) {
      let category_list = importSet[x].im_category;
      console.log(category_list);
      //set data in new set list to display in the table
      newSet.push(
        createData(
          importSet[x].itemName,
          importSet[x].brand,
          category_list.category,
          importSet[x].qty,
          importSet[x].importId
        )
      );
    }
    // console.log("ImportSet",newSet);
    // set rows to table
    setRows(newSet);
  };

  const columns = [
    {
      id: "item",
      numeric: false,
      disablePadding: true,
      label: "Item",
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: true,
      label: "Brand",
    },
    {
      id: "category_m",
      numeric: false,
      disablePadding: true,
      label: "Main Category",
    },
    {
      id: "qty",
      numeric: true,
      disablePadding: true,
      label: "Qty",
    },
  ];

  function createData(item, brand, category_m, qty, im_id) {
    return { item, brand, category_m, qty, im_id };
  }

  return (
    <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2 }}>
      <Modal
        keepMounted
        open={openTable}
        onClose={handleCloseTable}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={style}>
          <Grid container>
            <Grid item xs={12} sm={12} sx={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} sx={12}>
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
                    name="_brand"
                    value={filter._brand}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Brand"
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                  <InputField
                    name="_category"
                    value={filter._category}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Category"
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={12}>
                  <InputField
                    name="_unitType"
                    value={filter._unitType}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Unit Type"
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
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                title="Import Items"
                columns={columns}
                rows={rows}
                setSelected={setSelectedItems}
                selected={selectedItems}
                _key="im_id"
                setOpenTable={setOpenTable}
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
