import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

const getCustomers = async (offset, pageSize, filter) => {
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .post(
        "/api/customer/all/" + offset + "/" + pageSize,
        {
          name: filter._name ? filter._name.trim() : null,
          email: filter._email ? filter._product.trim() : null,
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

export { getCustomers };