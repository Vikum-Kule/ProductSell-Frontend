import React from 'react';
import {Typography, Button, Container, Grid, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  btn:{
      fontSize: 60,
      backgroundColor:'black',
  }  
})

function Note() {

    const classes = useStyles()

    return (
        <Grid container>
            <Grid item xs={12} sm={6} md={3}>
                <Paper>1</Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper>2</Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper>3</Paper>
            </Grid>
            <Typography 
            variant="h5"
            >
                Note
            </Typography>
            <Button 
            className={classes.btn}
            variant="contained"
            >
                Contained
            </Button>
            
        </Grid> 
    )
}

export default Note
