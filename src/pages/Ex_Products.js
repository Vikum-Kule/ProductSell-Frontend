import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  });

function Ex_Products() {
    const classes = useStyles();
    return (
        <Paper className={classes.container} elevation={8}>
            <Grid container spacing={5}>
                    <Grid item xs={12} sm={11} sx={12}>
                      <Typography mt={1} variant="h6"> Export Products </Typography>
                    </Grid>
            </Grid>

        </Paper>
    );
}

export default Ex_Products
