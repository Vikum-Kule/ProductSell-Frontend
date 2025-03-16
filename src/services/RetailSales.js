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
          productName: filter._barcode ? filter._barcode.trim() : null,
          customer: filter._billNumber ? filter._billNumber.trim() : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          barcode: filter._customer ? filter._customer.trim() : null,
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

export { getRetailSaleBillData };
