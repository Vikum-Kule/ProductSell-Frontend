import { Button, Grid, IconButton, InputBase, Modal, Pagination, Paper, Stack, Typography } from '@mui/material'
import { typography } from '@mui/system'
import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import TableItem from '../components/TableItem';
import { getImportBillData, getImportBillById, searchImportItem } from '../services/Import';
import SearchIcon from '@mui/icons-material/Search';
import Im_CategoryForm from '../components/Im_CategoryForm';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Im_addBill from '../components/Im_addBill';
const useStyles = makeStyles({
    container:{
        padding:"10px"
    }
  
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // height: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Im_Bill() {
    const classes = useStyles();

    const [rows, setRows]= React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openForm, setOpenForm]= React.useState(false);
    const [billLoading, set_billLoading]= React.useState(false);
    const [itemLoading, set_itemLoading]= React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [search, setSearch] = React.useState("");

    useEffect(async () => {
        await fetchData(search, page);
      }, [])


      //get bill data
      const fetchData = async(keyword, pageNo)=>{
          //get import Categories data when page loading...
        set_billLoading(true);
        let result = await getImportBillData(pageNo, rowsPerPage, keyword);

        let billSet = result.content;
       
        //set total rows and pages
        setTotalPages(result.totalPages);

          const newSet = []
        console.log(billSet.length);
        if(billSet.length == 0){
          for(let x=0; x< billSet.length; x++){
            
            let splitDate = billSet[x].createdDate.split("T");

            newSet.push( createDataForBills(
              billSet[x].billNo, 
              billSet[x].addedBy, 
              splitDate[0], 
              billSet[x].shop,
              billSet[x].bill_id
                ));
          }
        }
        set_billLoading(false);
          
          // console.log("ImportSet",newSet);
          // set rows to table
          setRows(newSet);
      }


      //search item
      const[searchVal, setSearchVal]= React.useState('');

      const searchBar = async(val)=>{
          let searchResults = await searchImportItem(val);
      }

      //creating data for rows according to Id
      function createDataForBills( bill_num, added_by, date, shop, billId) {        
        return {  bill_num, added_by, date, shop, billId};
      }

      //creating data for selected bill items
      function createDataForBillItems( item, MCategory, tag_1, tag_2, tag_3, tag_4, tag_5, qty, discount, price) {        
        return {  item, MCategory, tag_1, tag_2, tag_3, tag_4, tag_5, qty, discount, price};
      }

    //columns for table
    const columns_bill = [
        { id: 'bill_num', label: 'Bill No.', minWidth: 100 },
        { id: 'added_by', label: 'Added By', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 100 },
        { id: 'shop', label: 'Shop', minWidth: 100 },
        
      ];
    const columns_bill_view = [
        { id: 'item', label: 'Item', minWidth: 200 },
        { id: 'MCategory', label: 'Category', minWidth: 50 },
        { id: 'tag_1', label: 'Tag 1', minWidth: 50 },
        { id: 'tag_2', label: 'Tag 2', minWidth: 50 },
        { id: 'tag_3', label: 'Tag 3', minWidth: 50 },
        { id: 'tag_4', label: 'Tag 4', minWidth: 50 },
        { id: 'tag_5', label: 'Tag 5', minWidth: 50 },
        { id: 'qty', label: 'qty', minWidth: 30 },
        { id: 'discount', label: 'discount', minWidth: 30 },
        { id: 'price', label: 'price', minWidth: 30 },

        
      ];

      //Drop down list for table
    const popUpList = [
        { id: 1, label: 'View Items' },
        { id: 2, label: 'Edit' },
        { id: 3, label: 'Delete' },
        

      ];

    //when select a bill table row
    const getSelectedRow = async(Row)=>{
        set_itemLoading(true);
        console.log("Selected Row", Row);
        let bill_data = await getImportBillById(Row.billId);
        let billItemSet = bill_data.import_billItems;
        
        
        setBill(bill_data);
        const newSet = []
        if(billItemSet){
          for(let x=0; x< billItemSet.length; x++){
            // let splitDate = billSet[x].createdDate.split("T");
            let categorySet = billItemSet[x].imports.im_category;
            console.log("categorySet", billItemSet[x].imports.im_category);
            newSet.push( createDataForBillItems(
              billItemSet[x].itemName+" : "+ billItemSet[x].brand,
              categorySet.category, 
              categorySet.subCat_1,
              categorySet.subCat_2, 
              categorySet.subCat_3, 
              categorySet.subCat_4, 
              categorySet.subCat_5,
              billItemSet[x].bill_qty+" "+billItemSet[x].unitType,
              billItemSet[x].discount_perItem,
              billItemSet[x].price
                ));
          }
          setBillItems(newSet);

        }
                set_itemLoading(false);
        
    }

    // set selected bill data
    const[slectedBill, setBill]= React.useState(null);

    const[selectedBillItems, setBillItems ] = React.useState(null);

    const handleCloseTable=()=>{
      setBill(null);
  }

  const handleChange = async(event, value) => {
    setPage(value-1);
    console.log("Page", page);
    await fetchData(search, value-1);
  }

  const searchItem= async(event, value)=>{
    setPage(0);
    setSearch(event.target.value);
    console.log(event.target.value);
    await fetchData(event.target.value,0);
    
}


    return (
        <Paper className={classes.container}>
            {openForm? <Im_addBill setOpenForm={setOpenForm}/> :
                <Grid container spacing={4}>
                <Grid item xs={12} sm={11} sx={12}>
                    <Typography mt={1} variant="h6"> Import Bills </Typography>
                </Grid>
                <Grid item xs={12} sm={9} sx={12}>
                          <Paper
                            variant="outlined" 
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Bills"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={search}
                                onChange={searchItem}
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
                        Add New Bill
                      </Button>
                    </Grid>
                <Grid item xs={12} sm={12} sx={12}>
                  {billLoading?
                    <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                      <CircularProgress />
                    </Box>:
                      <TableItem
                      setRow={null}
                      dropDown={false}
                      columns={columns_bill} 
                      rows={rows} 
                      getRow={getSelectedRow}/>
                  }
                    
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
                <Modal
                        keepMounted
                        open={slectedBill}
                        onClose={handleCloseTable}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Paper  sx={style} >
                        {slectedBill?
                      <Grid>
                      {itemLoading?
                        <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                          <CircularProgress />
                        </Box>:
                        <Grid container> 
                          <Grid item xs={12} sm={2} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Bill No :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={10} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.billNo}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Shop :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={10} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.shop}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Date :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={10} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.createdDate}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Added By :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={10} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.addedBy}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Payment Status</Typography>
                          </Grid>
                          <Grid item xs={12} sm={10} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">discount:</Typography>
                          </Grid>
                          <Grid item xs={12} sm={10} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.discount}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Total: </Typography>
                          </Grid>
                          <Grid item xs={12} sm={10} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.total}</Typography>
                          </Grid>
                            <Grid item xs={12} sm={12} sx={12}>
                              {selectedBillItems?
                                <TableItem
                                dropDown={false}
                                columns={columns_bill_view} 
                                rows={selectedBillItems} 
                                page={page} 
                                tablePagin={false}
                                setPage={setPage} 
                                rowsPerPage={rowsPerPage} 
                                setRowsPerPage={setRowsPerPage}/>: null
                              }
                              
                              </Grid>
                            </Grid>
                      }
                      
                      </Grid>:<Typography > Not selected bill</Typography>
                    }
                        </Paper>
                    </Modal>
            </Grid>
            }
            
        </Paper>
    )
}

export default Im_Bill
