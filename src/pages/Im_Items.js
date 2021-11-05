import { Divider, Grid, IconButton, InputBase, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import TableItem from '../components/TableItem';
import React from 'react'


const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  
  });

function Im_Items() {
    const classes = useStyles();

    return (
        
            <Paper className={classes.container} elevation={8}>
                <Grid container>
                    <Grid item>
                          <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search items"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <TableItem/>
                    </Grid>

                </Grid>
            </Paper>
    )
}

export default Im_Items
