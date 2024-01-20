import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import TableItem from "../../../components/TableItem";
import {
  getExportCategoryData,
  getExportProductsByCategory,
} from "../../../services/Export";
import Ex_CategoryForm from "./Ex_CategoryFrom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useHistory } from "react-router";
import InputField from "../../../FormComponents/InputField";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});

function Ex_Categories() {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openForm, setOpenForm] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [search, setSearch] = React.useState("");

  useEffect(async () => {
    await fetchData(filter, page);
  }, []);

  //creating data for rows according to Id
  function createData(
    category,
    subCat_1,
    subCat_2,
    subCat_3,
    subCat_4,
    subCat_5,
    count,
    action,
    cat_id
  ) {
    return {
      category,
      subCat_1,
      subCat_2,
      subCat_3,
      subCat_4,
      subCat_5,
      count,
      action,
      cat_id,
    };
  }

  //category filter values
  const [filter, setFilter] = useState({
    _category: "",
    _subCat_1: "",
    _subCat_2: "",
    _subCat_3: "",
    _subCat_4: "",
    _subCat_5: "",
  });

  //to handle category changing filters
  const handleFilterChange = (name, val) => {
    setFilter({
      ...filter,
      [name]: val,
    });
  };

  //reset category filters
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

  //columns for table
  const columns = [
    { id: "category", label: "Category", minWidth: 100 },
    { id: "subCat_1", label: "Tag 1", minWidth: 100 },
    {
      id: "subCat_1",
      label: "Tag 2",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "subCat_2",
      label: "Tag 2",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "subCat_3",
      label: "Tag 3",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "subCat_4",
      label: "Tag 4",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "subCat_5",
      label: "Tag 5",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "count",
      label: "Item Count",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "action", label: "Actions", minWidth: 100 },
  ];

  const handleChange = async (event, value) => {
    setPage(value - 1);
    console.log("Page", page);
    await fetchData(search, value - 1);
  };

  const fetchData = async (categoryFilter, pageNo) => {
    // set loading
    setLoading(true);
    //get import Categories data when page loading...
    let result = await getExportCategoryData(pageNo, 10, categoryFilter);

    let categorySet = result.content;

    //set total rows and pages
    setTotalPages(result.totalPages);

    const newSet = [];
    console.log(categorySet);
    if (categorySet) {
      for (let x = 0; x < categorySet.length; x++) {
        let exportProductList = await getExportProductsByCategory(categorySet[x].cat_id);
        console.log("Exports ", exportProductList);
        //set data in new set list to display in the table
        newSet.push(
          createData(
            categorySet[x].category,
            categorySet[x].subCat_1,
            categorySet[x].subCat_2,
            categorySet[x].subCat_3,
            categorySet[x].subCat_4,
            categorySet[x].subCat_5,
            exportProductList.length,
            categorySet[x].cat_id
          )
        );
      }
    }

    // console.log("ImportSet",newSet);
    // set rows to table
    setRows(newSet);
    setLoading(false);
  };

  const handleAction = (event, id) => {
    console.log(event);

    switch (event) {
      case "view":
        console.log("/template/ex_category_view/" + id)
        history.push("/template/ex_category_view/" + id);
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
        <Ex_CategoryForm setOpenForm={setOpenForm} />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={9} sx={12}>
            <Typography mt={1} variant="h6">
              {" "}
              Export Categories{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <Button
              variant="contained"
              onClick={() => {
                setOpenForm(true);
              }}
            >
              Add Category
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} sx={12}>
            <Grid container spacing={2}>
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
                  name="_subCat_1"
                  value={filter._subCat_1}
                  onChange={(event, newInputValue) =>
                    handleFilterChange(event, newInputValue)
                  }
                  type="text"
                  label="Subcategory 1"
                />
              </Grid>
              <Grid item xs={12} sm={3} sx={12}>
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
              <Grid item xs={12} sm={3} sx={12}>
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
              <Grid item xs={12} sm={3} sx={12}>
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
              <Grid item xs={12} sm={3} sx={12}>
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
              <Grid item xs={12} sm={3} sx={12}>
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
                handleAction={handleAction}
                rows={rows}
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

export default Ex_Categories;
