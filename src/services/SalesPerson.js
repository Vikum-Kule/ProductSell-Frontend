import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

//get sales person by paging
const getSalesPersonByPaging = async (offset, pageSize, filter) => {
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/salesman/all/" + offset + "/" + pageSize,
        {
          name: filter._name ? filter._name.trim() : null,
          email: filter._email ? filter._email.trim() : null,
          phone: filter._phone ? filter._phone.trim() : null,
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

//get Sales Person by Id
const getSalesPersonById = async (salesPersonId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/salesman/" + salesPersonId, {
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
        console.log("get Sales Person " + error);
        return "Something went wrong...";
      });
  }
};

export { getSalesPersonByPaging, getSalesPersonById };