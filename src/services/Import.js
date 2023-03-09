import axios from "axios";
import jwtDecode from "jwt-decode";
import {getToken, getUser} from "../Utils/Common"
import {RefreshToken} from "./Auth" 
import tocken_valid from "./TokenValid";


//get import data with pagination
const getImportData = async (offset, pageSize, filter)=>{
    
    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){
        let token = getToken();

        return axios.post("/api/import/all/"+ offset +"/"+pageSize,{
            "productCode":filter._productCode?filter._productCode.trim():null,
            "itemName":filter._itemName?filter._itemName.trim():null,
            "brand":filter._brand?filter._brand.trim():null,
            "addedBy":filter._addedBy?filter._addedBy.trim():null,
            "unitType":filter._unitType?filter._unitType.trim():null,
            "category":filter._category?filter._category.trim():null
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response --",response.data.content);
            return response.data;
        }).catch(async error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
    }
    
    
}

//get all import data
const getAllImportData = async ()=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){
            let token = getToken();
        return axios.get("/api/import/all",
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response all--",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
    }
}

//find import item by id
const getImportItemById = async (itemId)=>{

    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){

        let token = getToken();
        return axios.get("/api/import/"+itemId,
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response all--",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
     }
}

//get all categories
const getAllCategories = async ()=>{
     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){
        let token = getToken();
        return axios.get("/api/import/category/all",
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response all--",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
     }
}

//get imports by category
const getImportsByCategory = async (cat_id)=>{

    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){
    
        let token = getToken();
        return axios.get("/api/import/find/category/"+cat_id,
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response all--",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
    }
}


//get categories by category id
const getCategoryById = async (cat_id)=>{

    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){
    
        let token = getToken();
        return axios.get("/api/import/category/"+cat_id,
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response all--",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
    }
}

// search import items
 const searchImportItem= async(val)=>{

 }

// const submitNewImportItem= async(values)=>{
//     let checkedCategory= await checkCategory(values);
// }

//check category availability
const checkCategory= async(values)=>{

    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){
            
        console.log("values",values);

        let token = getToken();
        return axios.post("/api/import/category/check",{
            "category": values._importMCategory.trim(),
            "subCat_1": values._subCat_1.trim(),
            "subCat_2": values._subCat_2.trim(),
            "subCat_3": values._subCat_3.trim(),
            "subCat_4": values._subCat_4.trim(),
            "subCat_5": values._subCat_5.trim()
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then( async response=>{
            console.log("Category",response.data);
            return response.data; 
        
            
        })
        .catch(error =>{
        // return "Something went wrong...";
        console.log("get imports "+ error);
        return "Something went wrong..."
        

        });
    }
}


//add new category
const addNewCategory = async(values)=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){
            
        let token = getToken();
        return axios.post("/api/import/category/add",{
            "category": values._importMCategory.trim(),
            "subCat_1": values._subCat_1.trim(),
            "subCat_2": values._subCat_2.trim(),
            "subCat_3": values._subCat_3.trim(),
            "subCat_4": values._subCat_4.trim(),
            "subCat_5": values._subCat_5.trim()
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then( async response=>{
            console.log("Response",response.data);
            return response.data; 
        })
        .catch(error =>{
        // return "Something went wrong...";
        console.log("get imports "+ error);
        return "Something went wrong..."
        
        });
     }
}


//check the item availability
const checkItem= async(values, catId)=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){

        let token = getToken();
        return axios.post("/api/import/check",{
            
                "itemName":values._importName,
                "brand":values._importBrand,
                "catId": catId
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then( async response=>{
            console.log(response);
            return response.data;
            // setUserSession(response.data.token, response.data.user)
            
        })
        .catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
     }
}

//create import item
const addIm_Item = async(values, catId)=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){
        let token = getToken();

        //get user name 
        let user = getUser();
        console.log("User"+user.username);
        
        return axios.post("/api/import/add/category/"+catId,{

            "product_code":values._productCode ?values._productCode :"-" ,
            "itemName":values._importName,
            "unitType":values._importUnitType,
            "qty":values._importQty,
            "refillRate":values._minRate,
            "brand":values._importBrand,
            "note":values._importNote,
            "addedBy":user.username
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then( async response=>{
            console.log(response);
            // setUserSession(response.data.token, response.data.user)
            return true;
            
        })
        .catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return false;
            
        });
     }
}

//get import category data with pagination
const getImportCategoryData = async (offset, pageSize, search)=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){
        let token = getToken();
        return axios.post("/api/import/category/all/"+ offset +"/"+pageSize,{
            "search":search.trim()
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response --",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
     }
}

//get import bill data with pagination
const getImportBillData = async (offset, pageSize, search)=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){

        let token = getToken();
        return axios.post("/api/import/bill/all/"+ offset +"/"+pageSize,{
            "search":search.trim()
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response --",response.data.content);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
     }
}

const getImportBillById = async (bill_id)=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){

        let token = getToken();
        return axios.get("/api/import/bill/find/"+ bill_id,
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response --",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
            
        });
     }
}

const getAllBills = async ()=>{

     //check access tocken expiry function
     let tocken_valid_result = await tocken_valid();
     if(tocken_valid_result){
        let token = getToken();
        return axios.get("/api/import/bill/all",
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response --",response.data);
            return response.data;
        }).catch(error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
     }
}

//create import item
const addImportBill = async(billBody)=>{

    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){
       let token = getToken();

       return axios.post("/api/import/bill/add",billBody,
       {
           headers: { 
               "Content-Type": "application/json",
               "Authorization": "Bearer "+token
       }}
       ).then( async response=>{
           console.log(response);
           return true;
           
       })
       .catch(error =>{
           // return "Something went wrong...";
           console.log("Bill Error "+ error);
           return false;
           
       });
    }
}

///////////////////////////////////////////////// stock update


//get import data with pagination
const getStockUpdateData = async (offset, pageSize, filter)=>{
    
    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){
        let token = getToken();

        return axios.post("/api/stockintake/all/"+ offset +"/"+pageSize,{
                "ProductCode":filter._productCode?filter._productCode.trim():null,
                "itemName":filter._itemName?filter._itemName.trim():null,
                "brand":filter._brand?filter._brand.trim():null,
                "addedBy":filter._addedBy?filter._addedBy.trim():null,
                "billNo":filter._billNo?filter._billNo.trim():null
            
        },
        {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
        }}
        ).then(response=>{
            console.log(response);
            console.log("Response --",response.data.content);
            return response.data;
        }).catch(async error =>{
            // return "Something went wrong...";
            console.log("get imports "+ error);
            return "Something went wrong..."
            
        });
    }
    
    
}

//get import stock update by id
const getImportStockUpdateById = async (intakeId)=>{

    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){

       let token = getToken();
       return axios.get("/api/stockintake/"+ intakeId,
       {
           headers: { 
               "Content-Type": "application/json",
               "Authorization": "Bearer "+token
       }}
       ).then(response=>{
           console.log(response);
           console.log("Response --",response.data);
           return response.data;
       }).catch(error =>{
           // return "Something went wrong...";
           console.log("get imports "+ error);
           return "Something went wrong..."
           
           
       });
    }
}


//get import stock update by id
const getImportStockUpdateByImportId = async (importId)=>{

    //check access tocken expiry function
    let tocken_valid_result = await tocken_valid();
    if(tocken_valid_result){

       let token = getToken();
       return axios.get("/api/stockintake/import/"+ importId,
       {
           headers: { 
               "Content-Type": "application/json",
               "Authorization": "Bearer "+token
       }}
       ).then(response=>{
           console.log(response);
           console.log("Response --",response.data);
           return response.data;
       }).catch(error =>{
           // return "Something went wrong...";
           console.log("get imports "+ error);
           return "Something went wrong..."
           
           
       });
    }
}





// /////////////////////////////////////////////////////

export {getImportData, 
    getAllImportData, 
    getAllCategories, 
    checkCategory, 
    getImportCategoryData,
    getAllBills,
    getImportItemById, 
    getImportBillData,
    addImportBill,
    addIm_Item, 
    getImportBillById,
    getStockUpdateData,
    getImportStockUpdateById,
    getImportStockUpdateByImportId,
    getCategoryById,
    getImportsByCategory, addNewCategory, searchImportItem};