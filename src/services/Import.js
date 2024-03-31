import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

//get import data with pagination
const getImportData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/import/all/" + offset + "/" + pageSize,
        {
          productCode: filter._productCode ? filter._productCode.trim() : null,
          itemName: filter._itemName ? filter._itemName.trim() : null,
          brand: filter._brand ? filter._brand.trim() : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          unitType: filter._unitType ? filter._unitType.trim() : null,
          categories:
            filter._category?.length === 0 || filter._category === null
              ? null
              : filter._category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data.content);
        return response.data;
      })
      .catch(async (error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//get all import data
const getAllImportData = async () => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/import/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//find import item by id
const getImportItemById = async (itemId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/import/" + itemId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//Diactivate import item by id
const DiactivateItemById = async (itemId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .put(
        "/api/import/diactive/" + itemId,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return "Done";
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Error: " + error;
      });
  }
};

//get all categories
const getAllCategories = async () => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/import/category/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//get imports by category
const getImportsByCategory = async (cat_id) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/import/find/items?category=" + cat_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//get categories by category id
const getCategoryById = async (cat_id) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/import/category/" + cat_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

// search import items
const searchImportItem = async (val) => {};

// const submitNewImportItem= async(values)=>{
//     let checkedCategory= await checkCategory(values);
// }

//check category availability
const checkCategory = async (values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    console.log("values", values);

    let token = getToken();
    return axios
      .post(
        "/api/import/category/check",
        {
          category: values._importMCategory.trim(),
          subCat_1: values._subCat_1.trim(),
          subCat_2: values._subCat_2.trim(),
          subCat_3: values._subCat_3.trim(),
          subCat_4: values._subCat_4.trim(),
          subCat_5: values._subCat_5.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log("Category", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//add new category
const addNewCategory = async (values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/import/category/add",
        {
          category: values._importMCategory.trim(),
          subCat_1: values._subCat_1.trim(),
          subCat_2: values._subCat_2.trim(),
          subCat_3: values._subCat_3.trim(),
          subCat_4: values._subCat_4.trim(),
          subCat_5: values._subCat_5.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log("Response", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//check the item availability
const checkItem = async (values, catId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/import/check",
        {
          itemName: values._importName,
          brand: values._importBrand,
          catId: catId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        return response.data;
        // setUserSession(response.data.token, response.data.user)
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//create import item
const addIm_Item = async (values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/import/add/item",
        {
          product_code: values._productCode ? values._productCode : "-",
          itemName: values._importName,
          unitType: values._importUnitType,
          categories: values._categories,
          refillRate: parseInt(values._refillRate),
          brand: values._importBrand,
          note: values._importNote,
          addedBy: user.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        // setUserSession(response.data.token, response.data.user)
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return false;
      });
  }
};

//get Export Category data with pagination by filetring
const getImCategoryDataByFilter = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    console.log(token);

    return axios
      .post(
        "/api/import/category/search/" + offset + "/" + pageSize,
        {
          category: filter._category ? filter._category.trim() : null,
          subCat_1: filter._subCat_1 ? filter._subCat_1.trim() : null,
          subCat_2: filter._subCat_2 ? filter._subCat_2.trim() : null,
          subCat_3: filter._subCat_3 ? filter._subCat_3.trim() : null,
          subCat_4: filter._subCat_4 ? filter._subCat_4.trim() : null,
          subCat_5: filter._subCat_5 ? filter._subCat_5.trim() : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data.content);
        return response.data;
      })
      .catch(async (error) => {
        // return "Something went wrong...";
        console.log("get im Categories " + error);
        return "Something went wrong...";
      });
  }
};

//get import bill data with pagination
const getImportBillData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/import/bill/all/" + offset + "/" + pageSize,
        {
          ProductCode: filter._productCode ? filter._productCode.trim() : null,
          itemName: filter._itemName ? filter._itemName.trim() : null,
          shop: filter._shop ? filter._shop.trim() : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          billNo: filter._billNo ? filter._billNo.trim() : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data.content);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

const getImportBillById = async (bill_id) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/import/bill/find/" + bill_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

const getAllBills = async () => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/import/bill/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//create import item
const addImportBill = async (billBody) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post("/api/import/bill/add", billBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(async (response) => {
        console.log(response);
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("Bill Error " + error);
        return false;
      });
  }
};

///////////////////////////////////////////////// stock update

//get import data with pagination
const getStockUpdateData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/stockintake/all/" + offset + "/" + pageSize,
        {
          ProductCode: filter._productCode ? filter._productCode.trim() : null,
          itemName: filter._itemName ? filter._itemName.trim() : null,
          brand: filter._brand ? filter._brand.trim() : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          billNo: filter._billNo ? filter._billNo.trim() : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data.content);
        return response.data;
      })
      .catch(async (error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//get import stock update by id
const getImportStockUpdateById = async (intakeId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/stockintake/" + intakeId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//get import stock update by id
const getImportStockUpdateByImportId = async (importId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/stockintake/import/" + importId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//get import stock update by id
const getImportUpdateDurationByImportId = async (importId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/product/lastupdate/" + importId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

// /////////////////////////////////////////////////////

export {
  addIm_Item,
  addImportBill,
  addNewCategory,
  checkCategory,
  DiactivateItemById,
  getAllBills,
  getAllCategories,
  getAllImportData,
  getCategoryById,
  getImportBillById,
  getImportBillData,
  getImCategoryDataByFilter,
  getImportData,
  getImportItemById,
  getImportsByCategory,
  getImportStockUpdateById,
  getImportStockUpdateByImportId,
  getStockUpdateData,
  searchImportItem,
  getImportUpdateDurationByImportId
};
