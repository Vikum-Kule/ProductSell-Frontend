import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

const getExportProducts = async (offset, pageSize, search) => {
  let token = getToken();
  return axios
    .post(
      "/api/Export/product/all/" + offset + "/" + pageSize,
      {
        search: search.trim(),
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
      //  console.log(error);
      // if (error.response.statuscode == 403) {
      //     console.log(error);
      // } else {
      //   console.log("something else");
      // }
    });
};

//////////////////export products /////////////////////////

//get imports by category
const getExportProductsByCategory = async (cat_id) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/Export/product/find/category/" + cat_id, {
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
const getExportCategoryData = async (offset, pageSize, search) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/export/category/all/" + offset + "/" + pageSize,
        {
          search: search.trim(),
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

///////////////////////////////////////////////////////////

export {
  getExportCategoryData,
  getExportProductsByCategory,
  getExportProducts,
  addNewCategory,
  getAllCategories,
  checkCategory,
  getExCategoryById,
};
