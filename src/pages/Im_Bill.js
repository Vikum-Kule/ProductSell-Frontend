import { Button, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material'
import { typography } from '@mui/system'
import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import TableItem from '../components/TableItem';
import { getImportBillData, getImportBillById } from '../services/Import';
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

function Im_Bill() {
    const classes = useStyles();

    const [rows, setRows]= React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openForm, setOpenForm]= React.useState(false);
    const [billLoading, set_billLoading]= React.useState(false);
    const [itemLoading, set_itemLoading]= React.useState(false);

    useEffect(async () => {
        //get import Categories data when page loading...
        set_billLoading(true);
        let billSet = await getImportBillData(0,10);
          const newSet = []
        console.log(billSet);
          for(let x=0; x< billSet.length; x++){
            set_billLoading(false);
            let splitDate = billSet[x].createdDate.split("T");

            newSet.push( createDataForBills(
              billSet[x].billNo, 
              billSet[x].addedBy, 
              splitDate[0], 
              billSet[x].shop,
              billSet[x].bill_id
                ));
          }
          // console.log("ImportSet",newSet);
          // set rows to table
          setRows(newSet);
      }, [])

      //creating data for rows according to Id
      function createDataForBills( bill_num, added_by, date, shop, billId) {        
        return {  bill_num, added_by, date, shop, billId};
      }

      //creating data for selected bill items
      function createDataForBillItems( item, qty, discount, price) {        
        return {  item, qty, discount, price};
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
        for(let x=0; x< billItemSet.length; x++){
            // let splitDate = billSet[x].createdDate.split("T");

            newSet.push( createDataForBillItems(
              billItemSet[x].itemName+" : "+ billItemSet[x].brand,
              billItemSet[x].bill_qty+" "+billItemSet[x].unitType,
              billItemSet[x].discount_perItem,
              billItemSet[x].price
                ));
          }
        setBillItems(newSet);
        set_itemLoading(false);
        
    }

    // set selected bill data
    const[slectedBill, setBill]= React.useState(null);

    const[selectedBillItems, setBillItems ] = React.useState(null);


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
                <Grid item xs={12} sm={6} sx={12}>
                  {billLoading?
                    <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                      <CircularProgress />
                    </Box>:
                      <TableItem
                      setRow={null}
                      dropDown={false}
                      columns={columns_bill} 
                      rows={rows} 
                      page={page} 
                      getRow={getSelectedRow}
                      setPage={setPage} 
                      tablePagin={true}
                      rowsPerPage={rowsPerPage} 
                      setRowsPerPage={setRowsPerPage}/>
                  }
                    
                </Grid>
                <Grid item xs={12} sm={6} sx={12}>
                  <Paper variant="outlined" className={classes.container}>
                    {slectedBill?
                      <Grid>
                      {itemLoading?
                        <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                          <CircularProgress />
                        </Box>:
                        <Grid container> 
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Bill No :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.billNo}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Shop :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.shop}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Date :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.createdDate}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Added By :</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.addedBy}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Payment Status</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">discount:</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">{slectedBill.discount}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">Total: </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={12}>
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
                    {/* <Grid container>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div">Bill No :</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div">Shop :</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div">Date :</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div">Added By :</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div">Payment Status</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div">discount:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div">Total: </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={12}>
                      <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                    </Grid>
                      <Grid item xs={12} sm={12} sx={12}>
                        <TableItem
                            dropDown={false}
                            columns={columns_bill_view} 
                            rows={rows} 
                            page={page} 
                            tablePagin={false}
                            setPage={setPage} 
                            rowsPerPage={rowsPerPage} 
                            setRowsPerPage={setRowsPerPage}/>
                      </Grid>
                    </Grid>     */}
                  </Paper>
                </Grid>
            </Grid>
            }
            
        </Paper>
    )
}

export default Im_Bill
