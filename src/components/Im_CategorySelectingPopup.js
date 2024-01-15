import { Button, Grid, Modal, Pagination, Paper, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../FormComponents/InputField";
import SelectingTable from "../FormComponents/SelectingTable";
import { getImCategoryDataByFilter } from "../services/Import";

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

export default function Im_CategorySelectingPopup({
  setOpenCatgoryTable,
  openCatgoryTable,
  handleCloseCatgoryTable,
  setSelectedCatgory,
  selectedCatgory,
  catgoryRows,
  setCatgoryRows,
}) {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  /// filter area /////////////////////////////////

  // filter values
  const [filter, setFilter] = useState({
    _category: "",
    _subCat_1: "",
    _subCat_2: "",
    _subCat_3: "",
    _subCat_4: "",
    _subCat_5: "",
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
      _category: "",
      _subCat_1: "",
      _subCat_2: "",
      _subCat_3: "",
      _subCat_4: "",
      _subCat_5: "",
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
    setOpenCatgoryTable(true);
    //get import items data when page loading...
    let result = await getImCategoryDataByFilter(page, 10, filter);
    console.log(result);

    let categorySet = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);

    const newSet = [];

    for (let x = 0; x < categorySet?.length; x++) {
      //set data in new set list to display in the table
      newSet.push(
        createData(
          categorySet[x].cat_id,
          categorySet[x].category,
          categorySet[x].subCat_1,
          categorySet[x].subCat_2,
          categorySet[x].subCat_3,
          categorySet[x].subCat_4,
          categorySet[x].subCat_5
        )
      );
    }
    // console.log("ImportSet",newSet);
    // set rows to table
    setCatgoryRows(newSet);
  };

  const columns = [
    {
      id: "category",
      numeric: false,
      disablePadding: true,
      label: "Category",
    },
    {
      id: "subcategory_1",
      numeric: false,
      disablePadding: true,
      label: "Subcategory 1",
    },
    {
      id: "subcategory_2",
      numeric: false,
      disablePadding: true,
      label: "Subcategory 2",
    },
    {
      id: "subcategory_3",
      numeric: false,
      disablePadding: true,
      label: "Subcategory 3",
    },
    {
      id: "subcategory_4",
      numeric: false,
      disablePadding: true,
      label: "Subcategory 4",
    },
    {
      id: "subcategory_5",
      numeric: false,
      disablePadding: true,
      label: "Subcategory 5",
    },
  ];

  function createData(
    cat_id,
    category,
    subcategory_1,
    subcategory_2,
    subcategory_3,
    subcategory_4,
    subcategory_5
  ) {
    return {
      cat_id,
      category,
      subcategory_1,
      subcategory_2,
      subcategory_3,
      subcategory_4,
      subcategory_5,
    };
  }

  return (
    <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2 }}>
      <Modal
        keepMounted
        open={openCatgoryTable}
        onClose={handleCloseCatgoryTable}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={style}>
          <Grid container>
            <Grid item xs={12} sm={12} sx={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} sx={12}>
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
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_subCat_1"
                    value={filter._subCat_1}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Subcategory 1"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_subCat_2"
                    value={filter._subCat_2}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Subcategory 2"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_subCat_3"
                    value={filter._subCat_3}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Subcategory 3"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_subCat_4"
                    value={filter._subCat_4}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Subcategory 4"
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={12}>
                  <InputField
                    name="_subCat_5"
                    value={filter._subCat_5}
                    onChange={(event, newInputValue) =>
                      handleFilterChange(event, newInputValue)
                    }
                    type="text"
                    label="Subcategory 5"
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
                title="Export Categories"
                columns={columns}
                rows={catgoryRows}
                setSelected={setSelectedCatgory}
                selected={selectedCatgory}
                _key="cat_id"
                setOpenTable={setOpenCatgoryTable}
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
