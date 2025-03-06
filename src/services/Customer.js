import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

//get customers by paging
const getCustomers = async (offset, pageSize, filter) => {
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/customer/all/" + offset + "/" + pageSize,
        {
          name: filter._name ? filter._name.trim() : null,
          email: filter._email ? filter._email.trim() : null,
          phone: filter._phone ? filter._phone.trim() : null,
          status: filter._status ? filter._status.trim() : null,
          address: filter._address ? filter._address.trim() : null,
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

//add Customer
const addCustomer = async (values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/customer/add",
        {
          customerName: values._name,
          phone: values._phone,
          address: values._address,
          email: values._email,
          status: "ACTIVE",
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
        console.log("add customer error " + error);
        return false;
      });
  }
};

//get Customer by Id
const getCustomerById = async (customerId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/customer/" + customerId, {
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
        console.log("get Customer " + error);
        return "Something went wrong...";
      });
  }
};

export { getCustomers, addCustomer, getCustomerById };