import { Button, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material'
import { typography } from '@mui/system'
import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import TableItem from '../components/TableItem';
import { getImportCategoryData } from '../services/Import';
import SearchIcon from '@mui/icons-material/Search';
import Im_CategoryForm from '../components/Im_CategoryForm';
const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  
  });

function Im_Categories() {
    const classes = useStyles();

    const [rows, setRows]= React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openForm, setOpenForm]= React.useState(false);

    useEffect(async () => {
        //get import Categories data when page loading...
        let categorySet = await getImportCategoryData(0,10);
          const newSet = []
        console.log(categorySet);
          for(let x=0; x< categorySet.length; x++){
            let import_list = categorySet[x].imports;
            console.log("Imports ",import_list);
            //set data in new set list to display in the table
            newSet.push( createData(
                categorySet[x].category, 
                categorySet[x].subCat_1, 
                categorySet[x].subCat_2, 
                categorySet[x].subCat_3,
                categorySet[x].subCat_4,
                categorySet[x].subCat_5,
                import_list.length,
                categorySet[x].cat_id
                ));
          }
          // console.log("ImportSet",newSet);
          // set rows to table
          setRows(newSet);
      }, [])

      //creating data for rows according to Id
      function createData( category, subCat_1, subCat_2, subCat_3, subCat_4, subCat_5,count, cat_id) {
        return {  category, subCat_1, subCat_2, subCat_3, subCat_4, subCat_5, count, cat_id};
      }

    //columns for table
    const columns = [
        { id: 'category', label: 'Category', minWidth: 100 },
        { id: 'subCat_1', label: 'Tag 1', minWidth: 100 },
        {
          id: 'subCat_1',
          label: 'Tag 2',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'subCat_2',
          label: 'Tag 2',
          minWidth: 100,
          format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'subCat_3',
            label: 'Tag 3',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'subCat_4',
            label: 'Tag 4',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'subCat_5',
            label: 'Tag 5',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'count',
            label: 'Item Count',
            minWidth: 100,
            format: (value) => value.toLocaleString('en-US'),
          },

      ];

      //Drop down list for table
    const popUpList = [
        { id: 1, label: 'View Items' },
        { id: 2, label: 'Edit' },
        { id: 3, label: 'Delete' },
        

      ];


    return (
        <Paper className={classes.container}>
            {openForm? <Im_CategoryForm setOpenForm={setOpenForm}/> :
                <Grid container spacing={4}>
                <Grid item xs={12} sm={11} sx={12}>
                    <Typography mt={1} variant="h6"> Categories </Typography>
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                          <Paper
                            variant="outlined" 
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
                <Grid item xs={12} sm={3} sx={12}>
                      <Button 
                        variant="contained" 
                        onClick={()=>{setOpenForm(true)}}
                      >
                        Add Category
                      </Button>
                    </Grid>
                <Grid item xs={12} sm={12} sx={12}>
                    <TableItem
                        popUpList={popUpList} 
                        dropDown={false}
                        columns={columns} 
                        rows={rows} 
                        page={page} 
                        tablePagin={true}
                        setPage={setPage} 
                        rowsPerPage={rowsPerPage} 
                        setRowsPerPage={setRowsPerPage}/>
                </Grid>
            </Grid>
            }
            
        </Paper>
    )
}

export default Im_Categories
