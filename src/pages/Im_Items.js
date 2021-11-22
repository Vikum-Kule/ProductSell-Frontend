import { Divider, Grid, IconButton, InputBase, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import TableItem from '../components/TableItem';
import React, {useEffect} from 'react'
import {getImportData} from '../services/Import';


const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  
  });

function Im_Items() {
    const classes = useStyles();
    useEffect(() => {
        getImportData(0,10);
    }, [])

    const columns = [
        { id: 'item', label: 'Item', minWidth: 100 },
        { id: 'brand', label: 'Brand', minWidth: 100 },
        {
          id: 'category_m',
          label: 'Main Category',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'size',
          label: 'Qty',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'density',
          label: 'Density',
          minWidth: 170,
          format: (value) => value.toFixed(2),
        },
      ];
      
      function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
      }
      
      const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
      ];

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    return (
        
            <Paper className={classes.container} elevation={8}>
                <Grid container spacing={5}>
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
                    <Grid item xs={12} sm={12} sx={12}>
                        <TableItem columns={columns} rows={rows} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
                    </Grid>

                </Grid>
            </Paper>
    )
}

export default Im_Items;
