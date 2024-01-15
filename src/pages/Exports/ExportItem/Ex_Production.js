import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getExportProductById } from "../../../services/Export";
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TableItem from "../../../components/TableItem";
import InputField from "../../../FormComponents/InputField";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});
function Ex_Production({ history }) {
  const classes = useStyles();
  const { productId } = useParams();
  const [exportProduct, setExportProduct] = React.useState([]);
  const [itemCost, setItemCost] = useState(0.0);

  const fetchData = async () => {
    setLoading(true);
    let result = await getExportProductById(productId);
    console.log(result);
    if (result) {
      setExportProduct(result);
      let productCategory = result.ex_category;
      let importItems = result.items;

      const newSet = [];
      let totalItemCost = 0.0;
      for (let x = 0; x < importItems.length; x++) {
        // calculate Item Cost
        let costPerItem = parseFloat(
          importItems[x].usingQty * importItems[x].imports.qty
        ).toFixed(1);

        console.log(itemCost);
        totalItemCost = parseFloat(costPerItem) + parseFloat(totalItemCost);
        setItemCost(parseFloat(totalItemCost).toFixed(1));

        //set data in new set list to display in the table
        newSet.push(
          createData(
            importItems[x].imports.itemName,
            importItems[x].imports.brand,
            importItems[x].imports.im_category.category,
            importItems[x].usingQty,
            importItems[x].imports.qty,
            costPerItem
          )
        );
      }

      // set rows to table
      setRows(newSet);
      setLoading(false);
    } else {
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  //columns for table
  const columns = [
    { id: "item", label: "Item", minWidth: 100 },
    { id: "brand", label: "Brand", minWidth: 100 },
    { id: "category", label: "Main Category", minWidth: 100 },
    {
      id: "usingQty",
      label: "Use Qty",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "qty",
      label: "Exist Qty",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "itemCost",
      label: "Item Cost",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(item, brand, category, usingQty, qty, itemCost) {
    return { item, brand, category, usingQty, qty, itemCost };
  }
  const [page, setPage] = React.useState(0);

  return (
    <Paper className={classes.container} elevation={8}>
      {exportProduct.product_id ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Export Production</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Product Name
            </Typography>
            <Typography>{exportProduct.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Barcode
            </Typography>
            <Typography>{exportProduct.barcode}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h7" fontWeight="700">
              Category
            </Typography>
            <Typography>{exportProduct.ex_category.category}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h7" fontWeight="700">
              Sub Categories
            </Typography>
            <Typography>
              {exportProduct.ex_category.subCat_1}{" "}
              {exportProduct.ex_category.subCat_2}{" "}
              {exportProduct.ex_category.subCat_3}{" "}
              {exportProduct.ex_category.subCat_4}{" "}
              {exportProduct.ex_category.subCat_5}
            </Typography>
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
                getData={fetchData}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              name="itemCost"
              value={itemCost}
              type="text"
              label="itemCost"
              isdisabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={12}>
            <InputField
              name="itemCost"
              value={itemCost}
              type="text"
              label="itemCost"
              isdisabled={true}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Typography>No Product for Production</Typography>
        </Grid>
      )}
    </Paper>
  );
}

Ex_Production.propTypes = {
  exportId: PropTypes.any,
};

export default Ex_Production;
