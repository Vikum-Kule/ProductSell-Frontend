import React from "react";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles({
  container: {
    padding: "10px",
  },
});

function Ex_Items() {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={11} sx={12}>
          <Typography mt={1} variant="h6">
            Export Categories
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Ex_Items;
