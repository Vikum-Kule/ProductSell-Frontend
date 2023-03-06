import { Button, Divider, Grid, IconButton, InputBase, Modal, Pagination, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { getAllBills, getImportItemById, addImportBill } from '../services/Import';
import AutoCompleteFeild from '../FormComponents/AutoCompleteFeild';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from '@mui/system';
import InputField from '../FormComponents/InputField'
import SelectingTable from '../FormComponents/SelectingTable';
import {getImportData} from '../services/Import';
import {getUser} from "../Utils/Common"
import WritableTable from './WritableTable';
import FormAlert from './FormAlert';


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

function Im_addBill({setOpenForm}) {

    //load shop names
    const getShopNames=async()=>{
        let bill_list = await getAllBills();
        setBills(bill_list);
    }

    /// filter area /////////////////////////////////
  
       // filter values
       const[filter, setFilter]= useState({
        _productCode:'',
        _itemName:'',
        _brand:'',
        _category:'',
        _unitType:''
  
    });
  
    //reset filters
    const resetFilters =()=>{
      setFilter({
        _productCode:'',
        _itemName:'',
        _brand:'',
        _category:'',
        _unitType:''
    });
  
    fetchData();
    }
  
     //to handle changing filters
     const handleFilterChange =(name, val)=>{
      setFilter({
          ...filter,
          [name]: val,
      });
    }
    /////////////////////////////////////////////////

     //for input feild values
     const[values, setValues]= useState({
        _billNo:'',
        _shop:'',
        _discount:0.00,
        _total:0.00,
        _billNote:''
    });

    //Reset values
    const resetValues=()=>{
        closeAlert();
        setSelectedItems([]);
        setValues({
            _billNo:'',
            _shop:'',
            _discount:0.00,
            _total:0.00,
            _billNote:''
        })
    }


    // Alerts ////////////////////////////////////
    
    //display alert...
    const[displayAlert, setAlert] = useState(false);

    //alert data
    const[alertData, setAlertData] = useState({
        type:'',
        message:''
    });

    const closeAlert = ()=>{
        setAlert(false);
        setAlertData({
            type:'',
            message:''
        })
    }

    //////////////////////////////////////////////

    //dataset for bills
    const[bills, setBills]= useState([]);

    // set open table
    const [openTable, setOpenTable]= useState(false);

    // errors for inputfeild
    const[error, setError] = useState({
        _billNo:'',
        _shop:'',
    });

    const handleChange =(name, val)=>{
        console.log(name, val);
        setValues({
            ...values,
            [name]: val,
        });
        
    }

        const columns = [
        {
            id: 'item',
            numeric: false,
            disablePadding: true,
            label: 'Item',
        },
        {
            id: 'brand',
            numeric: false,
            disablePadding: true,
            label: 'Brand',
        },
        {
            id: 'category_m',
            numeric: false,
            disablePadding: true,
            label: 'Main Category',
        },
        {
            id: 'qty',
            numeric: true,
            disablePadding: true,
            label: 'Qty',
        },
        ];

    
         //columns for selected table
    const selectedColumns = [
        { id: 'item', label: 'Item', minWidth: 100, editable: false },
        { id: 'brand', label: 'Brand', minWidth: 100, editable: false },
        {id: 'category_m', label: 'Main category', minWidth: 100 , editable: false},
        {id: 'qty', label: 'Qty', minWidth: 100, editable: true, type:'number', isDecimal: false},
        {id: 'unitType', label: 'Unit', minWidth: 100, editable: false},
        {id: 'discountPerItem', label: 'Discount', minWidth: 100, editable: true, type:'number', isDecimal: true},
        {id: 'price', label: 'Price', minWidth: 100, editable: true, type:'number', isDecimal: true}
      ];
   

      function createData( item, brand, category_m, qty, im_id) {
        return {  item, brand, category_m, qty, im_id };
      }


      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [rows, setRows]= React.useState([]);
      const [selectedItems, setSelectedItems]= React.useState([]);
      const [selectedRows, setSelectedRows]= React.useState([]);
      const [importMainSet, setMainItems] = React.useState();
      //just hard coded...
      const [writeable_page, set_writeable_Page] = React.useState(0);
      const [writeable_rowsPerPage, set_writeable_RowsPerPage] = React.useState(100);
      const [totalPages, setTotalPages] = React.useState(0);

      //search item to add bill
      const [search, setSearch] = React.useState("");

    const fetchData = async()=>{
        setOpenTable(true);
        //get import items data when page loading...
        let result = await getImportData(page,3, filter);

        let importSet = result.content;
       
        //set total rows and pages
        setTotalPages(result.totalPages);

        setMainItems(importSet);
        const newSet = []
        
        for(let x=0; x< importSet.length; x++){
            let category_list = importSet[x].im_category;
            console.log(category_list);
            //set data in new set list to display in the table
            newSet.push( createData(importSet[x].itemName, importSet[x].brand, category_list.category, importSet[x].qty, importSet[x].importId));
        }
        // console.log("ImportSet",newSet);
        // set rows to table
        setRows(newSet);
    }


    const handleOpenTable=async()=>{
        await fetchData();
    }

    const handleChangepage = async(event, value) => {
        setPage(value-1);
        await fetchData();
      }

    const handleCloseTable= async()=>{
        setOpenTable(false);
        const selectedArray=[];
        console.log("selectedItems", selectedItems);
        for(let x=0; x<selectedItems.length; x++ ){
            let importItem = await getImportItemById(selectedItems[x]);
            console.log("importItem", importItem);
            selectedArray.push(createDataForSelectedTable(importItem.itemName,
            importItem.brand, "category", 0,importItem.unitType, 0.00, 0.00, importItem.importId ));
           
        }
        console.log("selectedArray", selectedArray);
        setSelectedRows(selectedArray);
        console.log("Selected Rows", selectedRows);
    }

    function createDataForSelectedTable( item, brand, category_m, qty,unitType, discountPerItem, price, importId) {
        return {  item, brand, category_m, qty,unitType, discountPerItem, price, importId };
      }

      
      const submitValue= async()=>{
        
        if(rows){
            //set bill items according to the bill body
            const importBillItems =[];
            for(let x=0; x<rows.length; x++ ){
                const item ={
                    "bill_qty":parseInt(rows[x].qty),
                    "discount_perItem":parseFloat(rows[x].discountPerItem),
                    "price":parseFloat(rows[x].price),
                    "importId": rows[x].importId
                }
                importBillItems.push(item);
            }
            
            //create bill body
            
            //get user name 
            let user = getUser();
            
            const billBody = {
                "addedBy":user.username,
                "billNo":values._billNo,
                "shop":values._shop,
                "paymentStatus":"Cash",
                "note":values._billNote,
                "total": 100,
                "discount": values._discount,
                "import_billItems":importBillItems
            }

            console.log(billBody);
            let result = await addImportBill(billBody);

            if(result){
                resetValues();
                setAlertData({
                    type:"success",
                    message:"Item submitted.."
                })
                setAlert(true);
            }else{
                setAlertData({
                    type:"error",
                    message:"Something went wrong..."
                })
                setAlert(true);
            }

        }
      }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={11} sx={12}>
                <Typography mt={1} variant="h6"> Add Import Bill </Typography>
            </Grid>
            <Grid item xs={12} sm={1} sx={12}>
                <Tooltip title="Close"> 
                   <IconButton
                   onClick={()=>{setOpenForm(false)}} 
                   aria-label="close" 
                   size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={12} sm={4} sx={12}>
                    <InputField
                        name="_billNo"
                        errorMsg={error._billNo}
                        value={values._billNo} 
                        onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="text" 
                        label="Bill Number" />
                        
            </Grid>
            <Grid item xs={12} sm={9} sx={12}>
                    <AutoCompleteFeild 
                        _key="shop"
                        name="_shop"
                        value={values._shop} 
                        dataSet={bills}
                        label="Shop"
                        onClick={getShopNames} 
                        errorMsg={error._shop}
                        onchange={(event, newInputValue) => handleChange(event, newInputValue)}  />
            </Grid>
            <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2}} > 
                <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={3} sx={12}>
                <Tooltip title="Add Items"> 
                   <IconButton
                   onClick={handleOpenTable} 
                   aria-label="add" 
                   size="small">
                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={12} sm={12} sx={12} >
                {/* selected table */}
                {selectedItems.length!=0?
                    <WritableTable
                        columns={selectedColumns} 
                        rows={selectedRows}
                        setRows={setRows} 
                        page={writeable_page} 
                        setPage={set_writeable_Page} 
                        rowsPerPage={writeable_rowsPerPage}
                        tablePagin={false} 
                        setRowsPerPage={set_writeable_RowsPerPage}
                        />: null
                }
                
            </Grid>
            <Grid item xs={12} sm={3} sx={12}>
                    <InputField
                        name="_discount"
                        value={values._discount} 
                        onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="text" 
                        label="Discount" />
            </Grid>
            <Grid item xs={12} sm={9} sx={12}></Grid>
            <Grid item xs={12} sm={1} sx={12}>
                <Typography variant="subtitle2" gutterBottom component="div">Total :</Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={12}>
                <InputField
                        name="_total"
                        value={values._total} 
                        onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="text" 
                        label="Total" />

                {/* <Typography variant="subtitle2" gutterBottom component="div">{values._total}</Typography> */}
            </Grid>
            <Grid item xs={12} sm={9} sx={12}>
                    <InputField
                        name="_billNote"
                        value={values._billNote} 
                        // onChange={(event, newInputValue) => handleChange(event, newInputValue)} 
                        type="text" 
                        label="Note"
                        multiline={true}
                         />
                </Grid>
            <Grid item xs={12} sm={12} sx={12}>
                {displayAlert?
                    <FormAlert type={alertData.type} message={alertData.message} />: null
                }
            </Grid>
            <Grid item xs={12} sm={12} sx={12}>
                        <Grid container justifyContent="space-between" >
                        <Grid item xs={12} sm={4} sx={12}>
                            <Button 
                                fullWidth 
                                variant="contained"
                                onClick={submitValue}
                                >
                                Submit</Button>
                        </Grid>
                        <Grid item xs={12} sm={1} sx={12}>
                            <Button 
                             onClick={resetValues}
                             variant="outlined"
                             >Reset</Button>
                        </Grid>
                        </Grid>
                </Grid>
            <Grid item xs={12} sm={9} sx={12} sx={{ mt: 2}}>    
                    <Modal
                        keepMounted
                        open={openTable}
                        onClose={handleCloseTable}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Paper  sx={style} >
                            <Grid container >
                                <Grid item xs={12} sm={12} sx={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4} sx={12}>
                                                <InputField
                                                    name="_productCode"
                                                    value={filter._productCode} 
                                                    onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                                                    type="text" 
                                                    label="Product Code"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} sx={12}>
                                                <InputField
                                                    name="_itemName"
                                                    value={filter._itemName} 
                                                    onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                                                    type="text" 
                                                    label="Item Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} sx={12}>
                                                <InputField
                                                    name="_brand"
                                                    value={filter._brand} 
                                                    onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                                                    type="text" 
                                                    label="Brand"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3} sx={12}>
                                                <InputField
                                                    name="_category"
                                                    value={filter._category} 
                                                    onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                                                    type="text" 
                                                    label="Category"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3} sx={12}>
                                                <InputField
                                                    name="_unitType"
                                                    value={filter._unitType} 
                                                    onChange={(event, newInputValue) => handleFilterChange(event, newInputValue)} 
                                                    type="text" 
                                                    label="Unit Type"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} sx={12}>
                                                <Stack direction="row" spacing={2}>
                                                    <Button 
                                                    variant="contained" 
                                                    onClick={()=>{resetFilters()}}
                                                    >
                                                    Reset
                                                    </Button>
                                                    <Button 
                                                    variant="contained" 
                                                    onClick={()=>{fetchData()}}
                                                    >
                                                    Filter
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                </Grid>
                                <Grid item  xs={12} sm={12} sx={12}>
                                    <SelectingTable
                                        page={page} 
                                        setPage={setPage} 
                                        rowsPerPage={rowsPerPage}
                                        setRowsPerPage={setRowsPerPage}
                                        title="Bill Items"
                                        columns={columns} 
                                        rows={rows} 
                                        setSelected={setSelectedItems}
                                        selected={selectedItems}
                                        _key="im_id"
                                        setOpenTable={setOpenTable}
                                    />
                                </Grid>
                                
                                <Stack spacing={3}>
                                <Pagination 
                                    count={totalPages} 
                                    variant="outlined" 
                                    shape="rounded"  
                                    size="small"
                                    onChange={handleChangepage}
                                    />
                                </Stack>
                                </Grid>
                        </Paper>
                    </Modal>
            </Grid>
            
            
        </Grid>
    )
}

export default Im_addBill
