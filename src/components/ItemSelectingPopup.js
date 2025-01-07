import {
  Button,
  Grid,
  Modal,
  Pagination,
  Paper,
  Stack,
  Chip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../FormComponents/InputField";
import SelectingTable from "../FormComponents/SelectingTable";
import { getImportData } from "../services/Import";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
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
  isOneChoise,
}) {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = useState({
    _productCode: "",
    _itemName: "",
    _brand: "",
    _category: "",
    _unitType: "",
  });

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterChange = (name, val) => {
    setFilter({
      ...filter,
      [name]: val,
    });
  };

  const resetFilters = () => {
    setFilter({
      _productCode: "",
      _itemName: "",
      _brand: "",
      _category: "",
      _unitType: "",
    });
  };

  const handleChangepage = async (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    fetchData();
  }, [page, filter]);

  const fetchData = async () => {
    setOpenTable(true);
    let result = await getImportData(page, 10, filter);
    let importSet = result.content;
    setTotalPages(result.totalPages);

    const newSet = importSet.map((item) =>
      createData(
        item.product_code,
        item.itemName,
        item.im_categories, // Pass the array of categories directly
        item.brand,
        item.qty,
        item.importId
      )
    );
    setRows(newSet);
  };

  const columns = [
    {
      id: "itemCode",
      numeric: false,
      disablePadding: true,
      label: "Item Code",
    },
    {
      id: "item",
      numeric: false,
      disablePadding: true,
      label: "Item",
    },
    {
      id: "categorySummary",
      numeric: false,
      disablePadding: true,
      label: "Category",
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: true,
      label: "Brand",
    },
    {
      id: "qty",
      numeric: true,
      disablePadding: true,
      label: "Qty",
    },
  ];

  const createData = (itemCode, item, categories, brand, qty, im_id) => {
    const categorySummary = (
      <Grid container spacing={1}>
        {categories.map((cat, index) => (
          <Grid item key={index}>
            <Chip
              size="small" // Reduces the chip size
              style={{ padding: "2px 4px", height: "20px" }} // Custom chip size
              label={
                <Typography>
                  <span style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                    {Object.entries(cat)
                      .filter(([key]) => key !== "cat_id") // Exclude `cat_id`
                      .map(([, value]) => value) // Extract only the values
                      .filter(Boolean) // Remove null or undefined values
                      .join(" : ")}{" "}
                  </span>
                </Typography>
              }
            />
          </Grid>
        ))}
      </Grid>
    );
    return { itemCode, item, categorySummary, categories, brand, qty, im_id };
  };

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
                isOneChoise={isOneChoise}
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
