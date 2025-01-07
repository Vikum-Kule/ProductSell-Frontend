import { Button, Grid, Modal, Pagination, Paper, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../FormComponents/InputField";
import SelectingTable from "../FormComponents/SelectingTable";
import {
  getExCategoryDataByFilter,
  getExportProducts,
} from "../services/Export";

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

export default function Ex_ProductSelectingPopup({
  setOpenProductTable,
  openProductTable,
  handleCloseProductTable,
  setSelectedProduct,
  selectedProduct,
}) {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productRows, setProductRows] = React.useState([]);

  /// filter area /////////////////////////////////

  // filter values
  const [filter, setFilter] = useState({
    _barcode: "",
    _product: "",
    _addedBy: "",
    _categories: [],
    _items: [],
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
      _barcode: "",
      _product: "",
      _addedBy: "",
      _categories: [],
      _items: [],
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
    setOpenProductTable(true);
    //get import items data when page loading...
    let result = await getExportProducts(page, rowsPerPage, filter);
    console.log(result);

    let productList = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);

    const newSet = [];

    for (let x = 0; x < productList?.length; x++) {
      //set data in new set list to display in the table
      newSet.push(
        createData(
          productList[x].product_id,
          productList[x].name,
          productList[x].barcode,
          productList[x].addedBy,
          productList[x].existingQty
        )
      );
    }
    // console.log("ImportSet",newSet);
    // set rows to table
    setProductRows(newSet);
  };

  const columns = [
    {
      id: "_productName",
      numeric: false,
      disablePadding: true,
      label: "Product",
    },
    {
      id: "_barcode",
      numeric: false,
      disablePadding: true,
      label: "Subcategory 1",
    },
    {
      id: "_addedBy",
      numeric: false,
      disablePadding: true,
      label: "Added By",
    },
    {
      id: "_existingQty",
      numeric: true,
      disablePadding: true,
      label: "Existing Stock",
    },
  ];

  function createData(
    _productId,
    _productName,
    _barcode,
    _addedBy,
    _existingQty
  ) {
    return {
      _productId,
      _productName,
      _barcode,
      _addedBy,
      _existingQty,
    };
  }

  return (
    <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2 }}>
      <Modal
        keepMounted
        open={openProductTable}
        onClose={handleCloseProductTable}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={style}>
          <Grid container>
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
                isOneChoise={true}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                title="Export Products"
                columns={columns}
                rows={productRows}
                setSelected={setSelectedProduct}
                selected={selectedProduct}
                _key="_productId"
                setOpenTable={setOpenProductTable}
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
