import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getExCategoryById } from "../../../services/Export";
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});

function Ex_CategoryView({ history }) {
  const classes = useStyles();
  const { cat_id } = useParams();
  const [category, setCategory] = React.useState([]);

  const fetchData = async () => {
    let result = await getExCategoryById(cat_id);
    if (result) {
      setCategory(result);
    } else {
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  return (
    <Paper className={classes.container} elevation={8}>
      {category.cat_id ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Import Category View</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Category Name
            </Typography>
            <Typography>{category.category}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Sub Category 1
            </Typography>
            <Typography>
              {category.subCat_1 ? category.subCat_1 : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Sub Category 2
            </Typography>
            <Typography>
              {category.subCat_2 ? category.subCat_2 : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Sub Category 3
            </Typography>
            <Typography>
              {category.subCat_3 ? category.subCat_3 : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Sub Category 4
            </Typography>
            <Typography>
              {category.subCat_4 ? category.subCat_4 : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" fontWeight="700">
              Sub Category 5
            </Typography>
            <Typography>
              {category.subCat_5 ? category.subCat_5 : "-"}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid>{category}</Grid>
      )}
    </Paper>
  );
}

Ex_CategoryView.propTypes = {
  cat_id: PropTypes.any,
};

export default Ex_CategoryView;
