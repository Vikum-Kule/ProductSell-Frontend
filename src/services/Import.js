import axios from "axios";
import {getToken} from "../Utils/Common"


//get import data with pagination
const getImportData = async (offset, pageSize, search)=>{
    
    let token = getToken();
    return axios.post("/api/import/all/"+ offset +"/"+pageSize,{
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
        return "Something went wrong...";
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

//get all import data
const getAllImportData = async ()=>{
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
        return "Something went wrong...";
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

//find import item by id
const getImportItemById = async (itemId)=>{
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
        return "Something went wrong...";
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

//get all categories
const getAllCategories = async ()=>{
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
        return "Something went wrong...";
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

//get imports by category
const getImportsByCategory = async (cat_id)=>{
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
        return "Something went wrong...";
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

// search import items
 const searchImportItem= async(val)=>{

 }

// const submitNewImportItem= async(values)=>{
//     let checkedCategory= await checkCategory(values);
// }

//check category availability
const checkCategory= async(values)=>{
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
        return response.data.ifExist; 
        // if(response.data.ifExist){
        //    let isExistItem =  await checkItem(values, response.data.category.cat_id);
        //    if(!isExistItem){
        //     //    console.log("isExistItem", isExistItem);
        //        let responseSubmit= await addIm_Item(values, response.data.category.cat_id);
        //        if(responseSubmit === "Something went wrong..."){
        //            return "Something went wrong...";
        //        }
        //        else{
        //            return responseSubmit;
        //        } 
        //    }
        //    else{
        //        return "Item already exist"
        //    }
        // }else{

        // }
        
    })
    .catch(error =>{
        // return error.response.data.message.toString;
         console.log(error.response.status );
         return "Something went wrong...";
    });
}


//add new category
const addNewCategory = async(values)=>{
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
        // return error.response.data.message.toString;
         console.log(error.response.status );
         return "Something went wrong...";
    });
}


//check the item availability
const checkItem= async(values, catId)=>{
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
        // return error.response.data.message.toString;
         console.log(error.response.status );
         return "Something went wrong...";
    });
}

//create import item
const addIm_Item = async(values, catId)=>{
    let token = getToken();
    return axios.post("/api/import/add/category/"+catId,{
        
        "itemName":values._importName,
        "unitType":values._importUnitType,
        "qty":values._importQty,
        "refillRate":values._minRate,
        "brand":values._importBrand,
        "note":values._importNote
    },
    {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
      }}
    ).then( async response=>{
        console.log(response);
        // setUserSession(response.data.token, response.data.user)
        
    })
    .catch(error =>{
        // return error.response.data.message.toString;
         console.log(error.response.status );
         return "Something went wrong...";
    });
}

//get import category data with pagination
const getImportCategoryData = async (offset, pageSize, search)=>{
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
        return "Something went wrong...";
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

//get import bill data with pagination
const getImportBillData = async (offset, pageSize, search)=>{
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
        return "Something went wrong...";
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

const getImportBillById = async (bill_id)=>{
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
        return "Something went wrong...";
        
    });
}

const getAllBills = async ()=>{
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
        return "Something went wrong...";
        
    });
}

export {getImportData, 
    getAllImportData, 
    getAllCategories, 
    checkCategory, 
    getImportCategoryData,
    getAllBills,
    getImportItemById, 
    getImportBillData, 
    getImportBillById, getImportsByCategory, addNewCategory, searchImportItem};