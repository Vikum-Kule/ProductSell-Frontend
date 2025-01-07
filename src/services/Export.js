import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

///////////// production /////////////////////////////////

//get production data by paging
const getExportProductionDataByPaging = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/export/production/all/" + offset + "/" + pageSize,
        {
          barcode: filter._barcode ? filter._barcode.trim() : null,
          productName: filter._productName ? filter._productName.trim() : null,
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
        console.log("Get export production " + error);
        return "Something went wrong...";
      });
  }
};

//add production
const addProduction = async (values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/export/production",
        {
          productId: values._productId,
          productionQty: values._productionQty,
          electricityCost: values._electricityCost,
          labourCost: values._labourCost,
          transportCost: values._transportCost,
          otherCost: values._otherCost,
          addedBy: user.username,
          items: values._productionItems,
          note: "",
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

//get recent production record according to the product Id
const getLatestProductionByProductId = async (productId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/production/get_last_production/" + productId, {
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
        console.log("get production " + error);
        return "Something went wrong...";
      });
  }
};

//get recent production record according to the product Id
const getProductionsForSales = async (productId, requiredQty) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/production/sale/" + productId + "/" + requiredQty, {
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
        console.log("get production for sale" + error);
        return "Something went wrong...";
      });
  }
};

//get recent production record according to the product Id
const getProductionById = async (productionId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/production/" + productionId, {
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
        console.log("get production " + error);
        return "Something went wrong...";
      });
  }
};

//get recent production record according to the product Id
const getProductionsByProductId = async (productId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/production/findlastfive/" + productId, {
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
        console.log("get production " + error);
        return "Something went wrong...";
      });
  }
};

//////////////////////////////////////////////////////////

const getExportProducts = async (offset, pageSize, filter) => {
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/export/product/all/" + offset + "/" + pageSize,
        {
          barcode: filter._barcode ? filter._barcode.trim() : null,
          productName: filter._product ? filter._product.trim() : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          categories:
            filter._categories.length !== 0 ? filter._categories : null,
          items: filter._items.length !== 0 ? filter._items : null,
          status: filter._status ? filter._status.trim() : null,
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
        return "Something went wrong...";
      });
  }
};

//////////////////export products /////////////////////////
//check barcode
const checkBarcode = async (barcode) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/product/check/barcode/" + barcode, {
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

//add export product
const addExportProduct = async (values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post("/api/export/product/add", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
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

//add export product
const updateExportProduct = async (values, productId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .put("/api/export/product/" + productId, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
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

//find export Product by id
const getExportProductById = async (productId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/product/" + productId, {
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
const getExportProductsByCategory = async (cat_id) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/product/find/category/" + cat_id, {
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

///////////////////////////////////////////////////////////

/////////////////////////// category //////////////////////
//get import category data with pagination
const getExportCategoryData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/export/category/search/" + offset + "/" + pageSize,
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
        console.log("Response --", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get Export Category: " + error);
        return "Something went wrong...";
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
      .get("/api/export/category/all", {
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

//check category availability
const checkCategory = async (values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    console.log("values", values);

    let token = getToken();
    return axios
      .post(
        "/api/export/category/check",
        {
          category: values._exportMCategory.trim(),
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
        console.log("check cayegory error: " + error);
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
        "/api/export/category/add",
        {
          category: values._exportMCategory.trim(),
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

//get categories by category id
const getExCategoryById = async (cat_id) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/export/category/" + cat_id, {
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

//get Export Category data with pagination by filetring
const getExCategoryDataByFilter = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/export/category/search/" + offset + "/" + pageSize,
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
        console.log("get ex Categories " + error);
        return "Something went wrong...";
      });
  }
};

///////////////////////////////////////////////////////////

export {
  addProduction,
  addExportProduct,
  checkBarcode,
  getExportCategoryData,
  getExportProductById,
  getExportProductsByCategory,
  getExportProducts,
  addNewCategory,
  getAllCategories,
  checkCategory,
  getExCategoryById,
  getExCategoryDataByFilter,
  updateExportProduct,
  getProductionsByProductId,
  getLatestProductionByProductId,
  getExportProductionDataByPaging,
  getProductionById,
  getProductionsForSales,
};
