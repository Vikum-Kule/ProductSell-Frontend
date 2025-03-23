import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

//Retail Sale bills
const getRetailSaleBillData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/retail_bill/all/" + offset + "/" + pageSize,
        {
          billNumber: filter._productName ? filter._productName.trim() : null,
          productIds: filter._products.length != 0 ? filter._products : null,
          salesmanIds: filter._salesman.length != 0 ? filter._salesman : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
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
      .catch(async (error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//add Retail sale bill...
const addRetailSaleBill = async (values, productList) => {
  console.log(values);
  // check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/retail_bill/add",
        {
          salesPersonId: values._salesman,
          payments: values._payments,
          totalPrice: values._totalPrice,
          discount_percentage: values._discount_percentage,
          discount_amount: values._discount_value,
          addedBy: user.username,
          billNumber: values._billNumber,
          totalProfit: values._totalProfit,
          note: "",
          billItems: productList,
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
        console.log("add sale bill " + error);
        return false;
      });
  }
};

export { getRetailSaleBillData, addRetailSaleBill };
