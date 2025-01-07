import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

//get import data with pagination
const getSaleProductData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/saleproduct/all/" + offset + "/" + pageSize,
        {
          productName: filter._productName ? filter._productName.trim() : null,
          barcode: filter._barcode ? filter._barcode.trim() : null,
          billNumber: filter._billNumber ? filter._billNumber.trim() : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          customer: filter._customer ? filter._customer.trim() : null,
          paidStatus: filter._paidStatus ? filter._paidStatus.trim() : null,
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

//add sale product
const addSaleProduct = async (values, productionList) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/saleproduct/add",
        {
          customer: values._customer,
          paidStatus: values._paidStatus,
          sellingQty: values._sellingQty,
          sellingPricePerUnit: values._sellingPricePerUnit,
          costPerProduct: values._costPerProduct,
          totalPrice: 0.0,
          addedBy: user.username,
          billNumber: values._billNumber,
          note: "",
          productId: values._product.product_id,
          saleProductionItems: productionList,
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
        console.log("get sale products " + error);
        return false;
      });
  }
};

//get sale product according to the given Id
const getSaleProductById = async (saleId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/saleproduct/" + saleId, {
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
        console.log("get Sale product " + error);
        return "Something went wrong...";
      });
  }
};

//update sale product
const updateSaleProduct = async (saleId, values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .put(
        "/api/saleproduct/update/" + saleId,
        {
          customer: values._customer,
          paidStatus: values._paidStatus,
          sellingQty: values._sellingQty,
          sellingPricePerUnit: values._sellingPricePerUnit,
          costPerProduct: values._costPerProduct,
          totalPrice: 0.0,
          addedBy: user.username,
          billNumber: values._billNumber,
          note: "",
          productId: values._product.product_id,
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
        console.log("get sale products " + error);
        return false;
      });
  }
};

export {
  getSaleProductData,
  addSaleProduct,
  getSaleProductById,
  updateSaleProduct,
};
